export const headers = `
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>benny's public library</title>
<link rel="icon" href="https://the-other.bennynguyen.dev/images/web/icon.png" />
<style>
  a {
    color: inherit;
    text-decoration: none;
    font-size: 1.25rem;
    display: block;
    font-family: Consolas, monospace;
    width: max-content;
    padding: 0.5rem;
  }

  a:hover {
    background-color: #00000025;
  }
</style>
`;

export const script = `
<script>
  const turnDark = () => {
    document.body.style.backgroundColor = "#292929";
    document.body.style.color = "white";
    themeButton.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }

  const turnLight = () => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    themeButton.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }

  const toggleTheme = () => document.body.style.backgroundColor === "white" || document.body.style.backgroundColor === "" ? turnDark() : turnLight()

  const themeButton = document.createElement("button");
  themeButton.textContent = "🌙";
  themeButton.onclick = toggleTheme;
  themeButton.style = "position: fixed; top: 1rem; right: 1rem; font-size: 1.5rem; background-color: transparent; border: none; cursor: pointer; padding: 0.5rem; border-radius: 12px; background-color: #00000025;";
  document.body.prepend(themeButton);

  if (localStorage.getItem("theme") === "dark") turnDark();
</script>
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
