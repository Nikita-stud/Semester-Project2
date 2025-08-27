import { checkIfLoggedIn } from "../auth/checkIfLoggedIn.mjs";
const productsNavLink = document.getElementById("productsNavLink");

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
  // const initialWidth = window.innerWidth;
  // window.addEventListener("resize", () => {
  //   let width = window.innerWidth;
  //   if (initialWidth >= width && initialWidth <= width) {
  //     menu.classList.add("hidden");
  //     darkBackground.classList.add("hidden");
  //     hamburger.classList.add("hidden");
  //   } else if (width < 768) {
  //     menu.classList.remove("hidden");
  //     darkBackground.classList.remove("hidden");
  //     hamburger.classList.remove("hidden");
  //   }
  // });

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
  }
}
