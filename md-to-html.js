import fs from "fs";
import path from "path";
import showdown from "showdown";
import { favicon } from "./misc.js";

const converter = new showdown.Converter();

export const mdToHtml = async (dirname, file) => {
  const inputBase = path.basename(file, ".md");

  const title = inputBase.replace(/-/g, " ");

  const inputText = fs.readFileSync(file, { encoding: "utf8" });
  const generatedHtml = converter.makeHtml(inputText);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - benny's public library</title>
        <link rel="icon" href="${favicon}" />
    </head>
    <link rel="stylesheet" href="/styles/index.css">
    <style>
        * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            line-height: 1.5;
        }
        body {
            max-width: 1280px;
            margin: 20px auto 40px auto;
            padding: 0 8px; 
        }
        a {
            color: inherit;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
    <body>
        <a href="" id="back-button">⬅️ Back</a></br>
        <a href="?download=true">Download markdown file</a>
        ${generatedHtml}
        <script src="/scripts/theme.js"></script>
        <script src="/scripts/watermark.js"></script>
    </body>
    <script>
        const backButton = document.getElementById("back-button");
        backButton.href = document.referrer;
    </script>
    </html>
    `;
};
