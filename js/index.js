import { createPosts } from "./api/posts/createPosts.mjs";
import { getPosts } from "./api/posts/getPosts.mjs";
import { formHandler } from "./events/auth/formHandler.mjs";
import { fetchSinglePost } from "./ui/auth/fetchSinglePost.mjs";
import { handleScroll } from "./ui/auth/helpers/handleScroll.mjs";
import { sendToHeaderUponReloading } from "./ui/auth/helpers/sendToHeaderUponReloading.mjs";
import { toggleNav } from "./ui/auth/helpers/toggleNav.mjs";

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
      toggleNav();
      window.addEventListener("load", sendToHeaderUponReloading);
      window.addEventListener("scroll", handleScroll);
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
    case "/post/":
      fetchSinglePost();
      break;
  }
}
pathEvents();
