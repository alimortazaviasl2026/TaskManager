const $ = document;
const moon = $.querySelector(".fa-moon");
const sun = $.querySelector(".fa-sun");

const handleThemeMoon = () => {
  sun.classList.remove("d-none");
  moon.classList.add("d-none");
  document.documentElement.dataset.bsTheme = "dark";
  setLocal('dark')
};

const handleThemeSun = () => {
  sun.classList.add("d-none");
  moon.classList.remove("d-none");
  document.documentElement.dataset.bsTheme = "light";
  setLocal('light')
};

const setLocal = data => localStorage.setItem("theme", data)


window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme');

    if (theme === 'light') {
        document.documentElement.dataset.bsTheme = 'light';
    } else {
        document.documentElement.dataset.bsTheme = 'dark';
    }
});
  

moon.addEventListener("click", handleThemeMoon);
sun.addEventListener("click", handleThemeSun);
