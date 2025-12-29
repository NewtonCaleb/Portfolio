const htmlElement = document.getElementsByTagName("html")[0];
const themeButton = document.querySelector(".theme-btn");
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const modals = {};
document.querySelectorAll(".modal").forEach((el) => {
  modals[el.id] = el;
});

document.querySelectorAll(".project").forEach((el) => {
  el.addEventListener("click", (e) => {
    toggleModal(e.currentTarget.id);
  });
});

const initTheme = localStorage.getItem("theme") || "dark";
if (!menuButton || !nav) {
  console.error("elements are missing");
}

if (initTheme !== "dark") {
  setTheme("light");
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
  console.log(currentTheme);

  if (!theme) {
    theme = !currentTheme || currentTheme === "dark" ? "light" : "dark";
  }

  htmlElement.dataset.theme = theme;
  themeButton.firstElementChild.setAttribute(
    "src",
    theme === "light" ? "./assets/moon-stars.svg" : "./assets/sun.svg"
  );

  console.log(theme);

  localStorage.setItem("theme", theme);
}

let currWidth = window.innerWidth;
window.addEventListener("resize", (_) => {
  currWidth = window.innerWidth;
});

function toggleSideNavigation(setExapnded) {
  if (currWidth > 1200) return;
  if (setExapnded === null || setExapnded === undefined)
    setExapnded = nav.classList.contains("show") ? false : true;
  console.log(setExapnded);

  if (setExapnded) {
    nav.classList.add("show");
    menuButton.firstElementChild.setAttribute("src", "./assets/x.svg");
    setOverlay(true);
  } else {
    nav.classList.remove("show");
    menuButton.firstElementChild.setAttribute("src", "./assets/list.svg");
    setOverlay(false);
  }
}

function setOverlay(show) {
  if (show) {
    overlay.classList.add("show");
  } else {
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

    Object.values(modals).forEach((el) => {
      el.classList.remove("show");
      overlay.classList.remove("show");
    });

    nav.style = "";
    menuButton.style = "";
    document.body.style = "overflow: auto";
  }
});

/**
 *
 * @param {HTMLElement} el
 * @param {*} setShow
 */
function toggleModal(id, setShow = null) {
  let shouldShow = null;
  const el = document.getElementById(`${id}-modal`);
  if (!el) {
    console.error("No id was passed");
    return;
  }

  if (setShow) {
    shouldShow = setShow;
  } else {
    shouldShow = !el.classList.contains("show");
  }

  if (shouldShow) {
    el.classList.add("show");
    setOverlay(true);
    document.body.style = "overflow: hidden";
    nav.style = "z-index: 98;";
    menuButton.style = "z-index: 98;";
  } else {
    el.classList.remove("show");
    setOverlay(false);
    document.body.style = "overflow: auto";
    nav.style = "";
    menuButton.style = "";
  }
}
