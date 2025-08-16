import { createPosts } from "./api/posts/createPosts.mjs";
import { fetchPosts } from "./api/posts/fetchPosts.mjs";
import { formHandler } from "./events/auth/formHandler.mjs";
import { fetchSinglePost } from "./api/posts/fetchSinglePost.mjs";
import { handleScroll } from "./ui/helpers/handleScroll.mjs";
import { sendToHeaderUponReloading } from "./ui/helpers/sendToHeaderUponReloading.mjs";
import { toggleNav } from "./ui/helpers/toggleNav.mjs";
import { fetchProfile } from "./api/posts/fetchProfile.mjs";
import { displayLoggedProfile } from "./ui/auth/displayLoggedProfile.mjs";
import { checkIfLoggedIn } from "./ui/auth/checkIfLoggedIn.mjs";
import { createOwnPost } from "./ui/posts/createOwnPost.mjs";
import { checkToPostOwnList } from "./ui/auth/checkToPostOwnList.mjs";
import { displayFilterData } from "./ui/helpers/displayFilterData.mjs";

function pathEvents() {
  const pathName = window.location.pathname;
  console.log(pathName);
  switch (pathName) {
    case "/auth/login.html":
    case "/auth/login":
      formHandler("#loginForm", pathName, "#loginButton");
      break;
    case "/auth/register.html":
    case "/auth/register":
      formHandler("#registerForm", pathName, "#submitRegister");
    case "auth/register":
      break;
    case "/index.html":
    case "/":
      toggleNav();
      displayFilterData();
      window.addEventListener("load", sendToHeaderUponReloading);
      window.addEventListener("scroll", handleScroll);
      const fetchListings = async () => {
        try {
          if (checkIfLoggedIn()) {
            createOwnPost();
            formHandler("#postOwnForm", pathName, "#postOwnCTA");
            const profileJSON = await fetchProfile();
            displayLoggedProfile(profileJSON.data);
          } else {
            checkToPostOwnList();
          }
          const listingsObject = await fetchPosts();
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
