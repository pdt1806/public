import type { Request, Response } from "express";
import express from "express";
import { fileTypeFromBuffer, FileTypeResult } from "file-type";
import fs, { Stats } from "fs";
import html from "html";
import path from "path";
import { fileURLToPath } from "url";
import { mimeTypes, systemFiles } from "./utils/misc.js";

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
  return (
    files
      .filter((file) => !file.startsWith(".") && !systemFiles.includes(file.toLowerCase())) // hide hidden and system files

      // sort alphabetically, with directories first
      .sort((a, b) => {
        // hasDot means it is a file, not a folder
        const aHasDot = a.includes(".");
        const bHasDot = b.includes(".");
        if (aHasDot && !bHasDot) return 1;
        if (!aHasDot && bHasDot) return -1;
        return a.localeCompare(b, undefined, { numeric: false, sensitivity: "base" });
      })
  );
};

const return404 = (res: Response) => {
  const htmlContent = fs.readFileSync(path.join(__dirname, "404.html"), "utf8");
  res.status(404).send(htmlContent);
};

// ----------------------------------------------------------

app.set("trust proxy", true);

app.use(async (req: Request, res: Response, next): Promise<any> => {
  // if (req.path.includes("/.")) return res.status(403).send({ error: "naughty naughty" });

  if (systemFiles.some((file) => req.path.toLowerCase().includes(file.toLowerCase())))
    return res.status(403).send({ error: "naughty naughty" });

  if (req.path === "/r.mp4") {
    const videoPath = path.join(__dirname, "utils", "r.mp4");
    const referrer = req.get("Referrer") || "";
    if (!referrer.includes("/r.mp4")) console.log(`[${new Date().toLocaleString()}] IP ${req.ip} was rick rolled`);
    return res.sendFile(videoPath);
  }

  if (["/thumbnail.png", "/icon.png"].includes(req.path))
    return res.sendFile(path.join(__dirname, "utils", "images", "web", req.path.replace("/", "")));

  if (req.path.startsWith("/scripts/")) {
    const scriptPath = path.join(__dirname, req.path);
    if (fs.existsSync(scriptPath)) return res.sendFile(scriptPath);
    return return404(res);
  }

  if (req.path.startsWith("/styles/")) {
    const stylePath = path.join(__dirname, req.path);
    if (fs.existsSync(stylePath)) return res.sendFile(stylePath);
    return return404(res);
  }

  next();
});

app.get("/*", (req: Request, res: Response) => {
  try {
    const directoryPath = path.join(__dirname, "public", req.params[0] || "");
    fs.stat(directoryPath, (err, stats) => {
      if (err) return return404(res);

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
