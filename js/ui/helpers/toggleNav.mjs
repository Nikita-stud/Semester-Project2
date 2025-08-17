import { checkIfLoggedIn } from "../auth/checkIfLoggedIn.mjs";
const profileNavLink = document.getElementById("profileNavLink");
const loginNav = document.getElementById("loginNav");
const pathName = window.location.pathname;

export function toggleNav() {
  const hamburger = document.getElementById("hamburger");
  const darkBackground = document.getElementById("overlay");
  const menu = document.getElementById("toggleMenu");

  loginNav.addEventListener("click", () => {
    window.location.replace("auth/login.html");
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
  }
  if (pathName === "/profile/index.html#") {
    profileNavLink.classList.add("font-bold");
  }
}
