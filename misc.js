const title = "benny's public library";
const description = "i serve files here";
const favicon = "https://the-other.bennynguyen.dev/images/web/icon.png";

export const headers = `
<!DOCTYPE html>
<html lang="en">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />

<title>${title}</title>
<link rel="icon" href="${favicon}" />
<style>
  * {
    box-sizing: border-box;
    font-family: Consolas, monospace;
    font-size: 1.15rem;
  }

  .file {
    color: inherit;
    text-decoration: none;
    display: block;
    width: max-content;
    padding: 0.5rem;

    &:hover {
      background-color: #00000025;
    }
  }

  .dir-nav {
    padding: 0.5rem;
  }

  .dir-nav a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
`;

export const watermark =
  '<div id="watermark" style="position: fixed; bottom: 0; right: 0; padding: 0.5rem; font-size: 0.75rem; border-radius: 8px 0 0 0; background-color: #00000025; user-select: none"></div>';

export const mimeTypes = {
  directory: "📁",
  file: "📄",
  image: "🖼️",
  audio: "🔊",
  video: "🎥",
  pdf: "📄",
  zip: "📦",
  text: "📄",
  code: "💻",
  unknown: "📄",
  excel: "📊",
  word: "📃",
  powerpoint: "📈",
  html: "🌐",
  css: "🎨",
  js: "📝",
  python: "🐍",
  java: "☕",
  cpp: "🔧",
  json: "📜",
  xml: "🗂️",
  markdown: "✍️",
  csv: "📋",
  archive: "🗜️",
  gif: "🎞️",
  presentation: "🖥️",
  spreadsheet: "📊",
  font: "🔠",
  binary: "💾",
  ebook: "📚",
  script: "📜",
  exe: "🖥️",
};

export const systemFiles = [
  "desktop.ini",
  "thumbs.db",
  "iconcache.db",
  "pagefile.sys",
  "hiberfil.sys",
  "swapfile.sys",
  ".bashrc",
  ".profile",
  ".bash_profile",
  ".bash_logout",
  ".gitconfig",
  ".vimrc",
  ".xinitrc",
  ".zshrc",
  ".config",
  ".DS_Store",
  "._*",
  ".localized",
  ".Spotlight-V100",
  ".Trash",
  ".fseventsd",
  ".VolumeIcon.icns",
];
