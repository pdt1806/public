const title = "benny's public library";
const description = "just a normal file server";
export const favicon = "https://the-other.bennynguyen.dev/images/web/icon.png";

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
<link rel="stylesheet" href="/styles/index.css" />
`;

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
