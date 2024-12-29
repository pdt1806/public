import express from "express";
import { fileTypeFromFile } from "file-type";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { headers, mimeTypes, script, systemFiles } from "./misc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 26124;

// ----------------------------------------------------------

const processFile = async (req, directoryPath, file) => {
  const filePath = path.join(req.path, file);
  const absoluteFilePath = path.join(directoryPath, file);
  const fileStats = fs.statSync(absoluteFilePath);
  const fileType = await fileTypeFromFile(absoluteFilePath).catch(() => {});
  const mimeCategory = fileType ? fileType.mime : fileStats.isDirectory() ? "directory" : "unknown";
  const mimeTypesKeys = Object.keys(mimeTypes);
  const fileExtension = file.split(".").pop();
  const mimeTypeCategory =
    mimeTypesKeys.find((key) => [fileExtension, fileType?.ext].includes(key)) ||
    mimeTypesKeys.find((key) => mimeCategory.includes(key)) ||
    mimeTypesKeys.find((key) => mimeCategory.startsWith(key)) ||
    "unknown";
  const emoji = mimeTypes[mimeTypeCategory];

  return `<a href="${filePath}" class="file">${emoji} ${file}</a>`;
};

const getDirectoryPath = (req) => {
  return req.path
    .split("/")
    .filter((segment) => segment)
    .map((segment, index, array) => {
      const linkPath = array.slice(0, index + 1).join("/");
      return `<a href="/${linkPath}">${decodeURIComponent(segment)}</a>`;
    })
    .join(" / ");
};

const sortFiles = (files) => {
  return files
    .filter((file) => !file.startsWith(".") && !systemFiles.includes(file.toLowerCase()))
    .sort((a, b) => {
      const aHasDot = a.includes(".");
      const bHasDot = b.includes(".");
      if (aHasDot && !bHasDot) return 1;
      if (!aHasDot && bHasDot) return -1;
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    });
};

// ----------------------------------------------------------

app.set("trust proxy", true);

app.use((req, res, next) => {
  if (req.path.startsWith("/.") || req.path.includes("/.")) return res.status(403).send({ error: "naughty naughty" });

  if (systemFiles.some((file) => req.path.toLowerCase().includes(file.toLowerCase())))
    return res.status(403).send({ error: "naughty naughty" });

  if (req.path === "/r.mp4") {
    const video = path.join(__dirname, "rick_roll", "r.mp4");
    console.log(`[${new Date().toLocaleString()}] IP ${req.ip} was rick rolled`);
    return res.sendFile(video);
  }

  next();
});

app.use(express.static("public", { dotfiles: "ignore" }));

app.get("/*", (req, res) => {
  try {
    const directoryPath = path.join(__dirname, "public", req.params[0] || "");
    fs.stat(directoryPath, (err, stats) => {
      if (err) return res.status(404).send({ error: "Not found" });

      if (stats.isDirectory()) {
        fs.readdir(directoryPath, async (err, files) => {
          if (err) return res.status(500).send({ error: "Internal server error" });

          const fileLinks = await Promise.all(
            sortFiles(files).map((file) => processFile(req, directoryPath, file))
          ).then((results) => results.reduce((acc, curr) => acc + curr, ""));

          const backButton =
            req.path !== "/" ? `<a href="${path.join(req.path, "..")}" class="file">⬅️ Back</a><br />` : "";

          const directoryNavigation = `<div class="dir-nav"><a href="/">🏠</a> / ${getDirectoryPath(req)}</div><hr />`;

          res.send(`${headers}${directoryNavigation}${backButton}${fileLinks}${script}`);
        });
      } else res.sendFile(directoryPath);
    });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, console.log(`File server running at http://localhost:${port}`));
