const turnDark = () => {
  document.body.style.backgroundColor = "#292929";
  document.body.style.color = "white";
  themeButton.textContent = "🔆";
  themeButton.title = "Switch to Light mode";
  localStorage.setItem("theme", "dark");
};

const turnLight = () => {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  themeButton.textContent = "🌒";
  themeButton.title = "Switch to Dark mode";
  localStorage.setItem("theme", "light");
};

const toggleTheme = () => {
  document.body.style.backgroundColor === "white" || document.body.style.backgroundColor === ""
    ? turnDark()
    : turnLight();
};

const themeButton = document.createElement("button");
themeButton.type = "button";
themeButton.textContent = "🌒";
themeButton.title = "Switch to Dark mode";
themeButton.onclick = toggleTheme;
themeButton.id = "theme-button";
document.body.prepend(themeButton);

if (localStorage.getItem("theme") === "dark") turnDark();
