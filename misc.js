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

export const script = `
<script>
  const turnDark = () => {
    document.body.style.backgroundColor = "#292929";
    document.body.style.color = "white";
    themeButton.textContent = "🔆";
    localStorage.setItem("theme", "dark");
  }

  const turnLight = () => {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    themeButton.textContent = "🌒";
    localStorage.setItem("theme", "light");
  }

  const toggleTheme = () => document.body.style.backgroundColor === "white" || document.body.style.backgroundColor === "" ? turnDark() : turnLight()

  const themeButton = document.createElement("button");
  themeButton.textContent = "🌒";
  themeButton.onclick = toggleTheme;
  themeButton.style = "position: fixed; top: 0.4rem; right: 0.4rem; background-color: transparent; border: none; cursor: pointer; padding: 0.5rem; border-radius: 12px; background-color: #00000025;";
  document.body.prepend(themeButton);

  if (localStorage.getItem("theme") === "dark") turnDark();
</script>
</html>
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
