const turnDark = () => {
  document.body.style.backgroundColor = "#292929";
  document.body.style.color = "white";
  themeButton.textContent = "🔆";
  localStorage.setItem("theme", "dark");
};

const turnLight = () => {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  themeButton.textContent = "🌒";
  localStorage.setItem("theme", "light");
};

const toggleTheme = () => {
  themeButton.style.transform = "scale(1.05)";
  document.body.style.backgroundColor === "white" || document.body.style.backgroundColor === ""
    ? turnDark()
    : turnLight();
  setTimeout(() => {
    themeButton.style.transform = "scale(1)";
  }, 100);
};

const themeButton = document.createElement("button");
themeButton.type = "button";
themeButton.textContent = "🌒";
themeButton.onclick = toggleTheme;
themeButton.style =
  "position: fixed; top: 8px; right: 8px; background-color: transparent; border: none; cursor: pointer; padding: 0.5rem; border-radius: 12px; background-color: #00000025; transition: transform 0.1s";
document.body.prepend(themeButton);

if (localStorage.getItem("theme") === "dark") turnDark();
