import { formHandler } from "./events/auth/formHandler.mjs";

function pathEvents() {
  const pathName = window.location.pathname;
  console.log(pathName);
  switch (pathName) {
    case "/auth/login.html":
    case "/auth/login":
      console.log("I am login in in index.html");
      formHandler("#loginForm", pathName, "#loginButton");
      break;
    case "/auth/register.html":
    case "/auth/register":
      formHandler("#registerForm", pathName, "#submitRegister");
    case "auth/register":
      break;
    case "/index.html":
    case "/":
      break;
    case "/feed/post/":
      break;
  }
}
pathEvents();

// const hamburger = document.getElementById("hamburger");
// const darkBackground = document.getElementById("overlay");
// const menu = document.getElementById("toggleMenu");

// function toggleNav() {
//   hamburger.addEventListener("click", () => {
//     darkBackground.classList.toggle("hidden");
//     menu.classList.toggle("hidden");
//     hamburger.classList.toggle("hidden");
//   });
//   closeNav();
// }
// toggleNav();

// function closeNav() {
//   darkBackground.addEventListener("click", () => {
//     menu.classList.toggle("hidden");
//     darkBackground.classList.toggle("hidden");
//     hamburger.classList.toggle("hidden");
//   });
// }
