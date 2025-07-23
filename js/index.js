import { createPosts } from "./api/posts/createPosts.mjs";
import { getPosts } from "./api/posts/getPosts.mjs";
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
      console.log("I am registering in in index.html");
      formHandler("#registerForm", pathName, "#submitRegister");
    case "auth/register":
      break;
    case "/index.html":
    case "/":
      const fetchListings = async () => {
        try {
          const listingsObject = await getPosts();
          const listingDataObjects = listingsObject.data;
          createPosts(listingDataObjects);
        } catch (error) {
          console.log(error);
        }
      };
      fetchListings();
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
