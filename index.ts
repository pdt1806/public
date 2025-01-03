import type { Request, Response } from "express";
import express from "express";
import { fileTypeFromBuffer, FileTypeResult } from "file-type";
import fs, { Stats } from "fs";
import html from "html";
import path from "path";
import { fileURLToPath } from "url";
import { mdToHtml } from "./utils/ts/md-to-html.js";
import { mimeTypes, previewTags, systemFiles } from "./utils/ts/misc.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 26124;

const htmlContent = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

const mimeTypesKeys = Object.keys(mimeTypes);

// ----------------------------------------------------------

const findMimeTypeCategory = (
  fileExtension: string,
  fileType: FileTypeResult | undefined,
  mimeCategory: string
): string => {
  const mimeTypeCategory =
    mimeTypesKeys.find((key) => [fileExtension, fileType?.ext].includes(key)) ||
    mimeTypesKeys.find((key) => mimeCategory.includes(key)) ||
    mimeTypesKeys.find((key) => mimeCategory.startsWith(key)) ||
    "unknown";

  return mimeTypeCategory;
};

const processFile = async (req: Request, directoryPath: string, file: string): Promise<string> => {
  const filePath = path.join(req.path, file);
  const absoluteFilePath = path.join(directoryPath, file);
  const fileStats: Stats = fs.statSync(absoluteFilePath);
  if (fileStats.isDirectory()) return `<a href="${filePath}" class="file">📁 ${file}</a>`;

  const fileType: FileTypeResult | undefined = await fileTypeFromBuffer(fs.readFileSync(absoluteFilePath));
  const mimeCategory = fileType ? fileType.mime : fileStats.isDirectory() ? "directory" : "unknown";

  const fileExtension = file.split(".").pop() || "";

  const mimeTypeCategory = findMimeTypeCategory(fileExtension, fileType, mimeCategory);
  const emoji = mimeTypes[mimeTypeCategory];

  return `<a href="${filePath}" class="file">${emoji} ${file}</a>`;
};

const getDirectoryPath = (req: Request) => {
  return req.path
    .split("/")
    .filter((segment) => segment)
    .map((segment, index, array) => {
      const linkPath = array.slice(0, index + 1).join("/");
      return `<a href="/${linkPath}">${decodeURIComponent(segment)}</a>`;
    })
    .join(" / ");
};

const sortFiles = (files: string[]) => {
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

app.use(express.raw({ limit: "50mb", type: "application/octet-stream" }));

app.use(async (req: Request, res: Response, next): Promise<any> => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.path.includes("/.")) return res.status(403).send({ error: "naughty naughty" });

  if (systemFiles.some((file) => req.path.toLowerCase().includes(file.toLowerCase())))
    return res.status(403).send({ error: "naughty naughty" });

  // download file (not view)
  if (url.searchParams.get("d") === "1") {
    const downloadPath = decodeURIComponent(path.join(__dirname, "public", req.path));
    if (fs.existsSync(downloadPath)) return res.download(downloadPath);
    return res.status(404).send({ error: "Not found" });
  }

  if (req.path === "/r.mp4") {
    const video = path.join(__dirname, "rick_roll", "r.mp4");
    console.log(`[${new Date().toLocaleString()}] IP ${req.ip} was rick rolled`);
    return res.sendFile(video);
  }

  if (req.path.startsWith("/scripts/")) {
    const scriptPath = path.join(__dirname, req.path);
    if (fs.existsSync(scriptPath)) return res.sendFile(scriptPath);
    return res.status(404).send({ error: "Not found" });
  }

  if (req.path.startsWith("/styles/")) {
    const stylePath = path.join(__dirname, req.path);
    if (fs.existsSync(stylePath)) return res.sendFile(stylePath);
    return res.status(404).send({ error: "Not found" });
  }

  // --------------------------------------------
  // view files in browser

  if (req.path.toLowerCase().endsWith(".md")) {
    const markdownFile = decodeURIComponent(path.join(__dirname, "public", req.path));
    if (!fs.existsSync(markdownFile)) return res.status(404).send({ error: "Not found" });
    return res.send(html.prettyPrint(await mdToHtml(__dirname, markdownFile)));
  }

  // --------------------------------------------

  next();
});

app.get("/*", (req: Request, res: Response) => {
  try {
    const directoryPath = path.join(__dirname, "public", req.params[0] || "");
    fs.stat(directoryPath, (err, stats) => {
      if (err) return res.status(404).send({ error: "Not found" });

      if (!stats.isDirectory()) return res.sendFile(directoryPath); // send file

      // display dir ui
      fs.readdir(directoryPath, async (err, files) => {
        if (err) return res.status(500).send({ error: "Internal server error" });

        const fileLinks = (
          await Promise.all(sortFiles(files).map((file) => processFile(req, directoryPath, file)))
        ).join("");

        const backButton =
          req.path !== "/" ? `<a href="${path.join(req.path, "..")}" class="file">⬅️ Back</a><br />` : "";

        const prettyHtmlContent = html.prettyPrint(
          htmlContent
            .replace("{{PREVIEW_TAGS}}", previewTags)
            .replace("{{DIR_NAV}}", getDirectoryPath(req))
            .replace("{{BACK_BUTTON}}", backButton)
            .replace("{{FILE_LINKS}}", fileLinks)
        );

        res.send(prettyHtmlContent);
      });
    });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`File server running at http://localhost:${port}`));
