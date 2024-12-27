import express from "express";
import { fileTypeFromFile } from "file-type";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mimeTypes, style } from "./misc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 26124;

app.use(express.static("public"));

app.get("/*", (req, res) => {
  const directoryPath = path.join(__dirname, "public", req.params[0] || "");
  fs.stat(directoryPath, (err, stats) => {
    if (err) {
      return res.status(404).send({ error: "Not found" });
    }
    if (stats.isDirectory()) {
      fs.readdir(directoryPath, async (err, files) => {
        if (err) {
          return res.status(500).send("Unable to scan directory");
        }
        const parentPath = path.join(req.path, "..");

        const processFile = async (file) => {
          const filePath = path.join(req.path, file);
          const absoluteFilePath = path.join(directoryPath, file);

          const fileStats = fs.statSync(absoluteFilePath);

          let fileType;

          try {
            fileType = await fileTypeFromFile(absoluteFilePath);
          } catch (error) {}

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

        const sortedFiles = files.sort((a, b) => {
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
    } else {
      res.sendFile(directoryPath);
    }
  });
});

app.listen(port, () => {
  console.log(`File server running at http://localhost:${port}`);
});
