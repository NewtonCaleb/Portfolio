const htmlElement = document.getElementsByTagName("html")[0];
const themeButton = document.querySelector(".theme-btn");
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const initTheme = localStorage.getItem("theme") || "light";
if (!menuButton || !nav) {
  console.error("elements are missing");
}

if (initTheme !== "light") {
  setTheme("dark");
}

nav.querySelectorAll("a").forEach((navLink) => {
  navLink.addEventListener("click", (_) => {
    toggleSideNavigation(false);
  });
});

themeButton.addEventListener("click", (_) => {
  setTheme();
});

function setTheme(theme = null) {
  const currentTheme = htmlElement.dataset["theme"];
  if (!theme) {
    theme = !currentTheme || currentTheme === "light" ? "dark" : "light";
  }

  htmlElement.dataset.theme = theme;
  themeButton.firstElementChild.setAttribute(
    "src",
    theme === "dark" ? "./assets/sun.svg" : "./assets/moon-stars.svg"
  );
  localStorage.setItem("theme", theme);
}

let currWidth = window.innerWidth;
window.addEventListener("resize", (e) => {
  currWidth = window.innerWidth;
});

function toggleSideNavigation(setExapnded) {
  if (currWidth > 1200) return;
  if (!setExapnded) setExapnded = nav.classList.contains("show") ? false : true;

  if (setExapnded) {
    nav.classList.add("show");
    menuButton.firstElementChild.setAttribute("src", "./assets/x.svg");
    overlay.classList.add("show");
  } else {
    nav.classList.remove("show");
    menuButton.firstElementChild.setAttribute("src", "./assets/list.svg");
    overlay.classList.remove("show");
  }
}

const headings = document.querySelectorAll("section .section-header");
const resetPageButton = document.querySelector(".reset-page");
const navAnchors = {};
nav.querySelectorAll("a").forEach((a) => {
  navAnchors[a.href.slice(a.href.lastIndexOf("#") + 1)] = a;
});

window.addEventListener("scroll", () => {
  let lastHeading = headings[0];

  if (window.scrollY <= window.innerHeight * 0.45) {
    document.querySelector(".scroll-disclosure").classList.remove("hidden");
  } else {
    document.querySelector(".scroll-disclosure").classList.add("hidden");
  }

  if (window.scrollY >= 0 && window.scrollY <= window.innerHeight - 200) {
    resetPageButton.classList.add("hidden");
    Object.values(navAnchors).forEach((a) => a.classList.remove("active"));
    navAnchors[""].classList.add("active");
    return;
  }

  resetPageButton.classList.remove("hidden");
  for (const heading of headings) {
    if (window.scrollY + 16 <= heading.offsetTop) {
      let id = lastHeading.id === "hero" ? "" : lastHeading.id;
      Object.values(navAnchors)
        .filter((a) => a.id !== id)
        .forEach((a) => a.classList.remove("active"));
      navAnchors[id].classList.add("active");
      break;
    }

    lastHeading = heading;
  }
});

menuButton.addEventListener("click", (_) => {
  toggleSideNavigation();
});

overlay.addEventListener("click", (_) => {
  if (overlay.classList.contains("show")) {
    toggleSideNavigation(false);
  }
});
