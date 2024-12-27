import express from "express";
import { fileTypeFromFile } from "file-type";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mimeTypes, style, systemFiles } from "./misc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 26124;

app.use((req, res, next) => {
  if (req.path.startsWith("/.") || req.path.includes("/.")) return res.status(403).send({ error: "naughty naughty" });
  if (systemFiles.some((file) => req.path.toLowerCase().includes(file.toLowerCase())))
    return res.status(403).send({ error: "naughty naughty" });
  next();
});

app.use(
  express.static("public", {
    dotfiles: "ignore",
  })
);

app.get("/*", (req, res) => {
  try {
    const directoryPath = path.join(__dirname, "public", req.params[0] || "");
    fs.stat(directoryPath, (err, stats) => {
      if (err) return res.status(404).send({ error: "Not found" });

      if (stats.isDirectory()) {
        fs.readdir(directoryPath, async (err, files) => {
          if (err) return res.status(500).send({ error: "Internal server error" });

          const parentPath = path.join(req.path, "..");

          const processFile = async (file) => {
            const filePath = path.join(req.path, file);
            const absoluteFilePath = path.join(directoryPath, file);

            const fileStats = fs.statSync(absoluteFilePath);

            const fileType = await fileTypeFromFile(absoluteFilePath).catch(() => undefined);

            const mimeCategory = fileType ? fileType.mime : fileStats.isDirectory() ? "directory" : "unknown";

            const mimeTypesKeys = Object.keys(mimeTypes);

            const mimeTypeCategory =
              !fileType && !fileStats.isDirectory()
                ? "unknown"
                : mimeTypesKeys.find((key) => {
                    return mimeCategory.includes(key) || (fileType.ext && fileType.ext === key);
                  }) ||
                  mimeTypesKeys.find((key) => mimeCategory.includes(key)) ||
                  mimeTypesKeys.find((key) => mimeCategory.startsWith(key)) ||
                  "unknown";

            const emoji = mimeTypes[mimeTypeCategory];

            return `<a href="${filePath}">${emoji} ${file}</a>`;
          };

          const sortedFiles = files
            .filter((file) => !file.startsWith(".") && !systemFiles.includes(file.toLowerCase()))
            .sort((a, b) => {
              const aHasDot = a.includes(".");
              const bHasDot = b.includes(".");
              if (aHasDot && !bHasDot) return 1;
              if (!aHasDot && bHasDot) return -1;
              return a.localeCompare(b);
            });

          const fileLinks = await Promise.all(sortedFiles.map((file) => processFile(file))).then((results) =>
            results.reduce((acc, curr) => acc + curr, "")
          );

          const backButton = req.path !== "/" ? `<a href="${parentPath}">🔙 Back</a><br />` : "";
          res.send(`${style}${backButton}${fileLinks}`);
        });
      } else res.sendFile(directoryPath);
    });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, console.log(`File server running at http://localhost:${port}`));
