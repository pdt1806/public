export const style = `
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  a {
    color: inherit;
    text-decoration: none;
    font-size: 1.25rem;
    display: block;
    font-family: Consolas;
    width: max-content;
    padding: 0.5rem;
  }

  a:hover {
    background-color: #f0f0f0;
  }
</style>
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
