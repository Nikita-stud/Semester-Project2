import { checkIfLoggedIn } from "../auth/checkIfLoggedIn.mjs";
const productsNavLink = document.getElementById("productsNavLink");
const profileNavLink = document.getElementById("profileNavLink");
const aboutNavLink = document.getElementById("aboutNavLink");

const loginNav = document.getElementById("loginNav");
const pathName = window.location.pathname;

export function toggleNav() {
  const hamburger = document.getElementById("hamburger");
  const darkBackground = document.getElementById("overlay");
  const menu = document.getElementById("toggleMenu");

  loginNav.addEventListener("click", () => {
    window.location.replace("/auth/login.html");
  });

  hamburger.addEventListener("click", () => {
    darkBackground.classList.toggle("hidden");
    menu.classList.toggle("hidden");
    hamburger.classList.toggle("hidden");
  });
  darkBackground.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    darkBackground.classList.toggle("hidden");
    hamburger.classList.toggle("hidden");
  });

  if (!checkIfLoggedIn()) {
    profileNavLink.classList.add("hidden");
  } else {
    profileNavLink.addEventListener("click", () => {
      window.location.replace(`/profile/index.html`);
    });
  }

  switch (pathName) {
    case "/index.html":
    case "/":
      productsNavLink.classList.add("font-bold");
      break;
    case "/profile/index.html":
    case "/profile/edit/index.html":
      profileNavLink.classList.add("font-bold");
      break;
    case "/about/index.html":
      aboutNavLink.classList.add("font-bold");
      break;
  }
}
