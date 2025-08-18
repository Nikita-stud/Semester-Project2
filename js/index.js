import { createPosts } from "./api/posts/createPosts.mjs";
import { fetchPosts } from "./api/posts/fetchPosts.mjs";
import { formHandler } from "./events/auth/formHandler.mjs";
import { fetchSinglePost } from "./api/posts/fetchSinglePost.mjs";
import { fetchProfile } from "./api/posts/fetchProfile.mjs";
import { displayLoggedProfile } from "./ui/auth/displayLoggedProfile.mjs";
import { checkIfLoggedIn } from "./ui/auth/checkIfLoggedIn.mjs";
import { createOwnPost } from "./ui/posts/createOwnPost.mjs";
import { checkToPostOwnList } from "./ui/auth/checkToPostOwnList.mjs";
import { displayFilterData } from "./ui/helpers/displayFilterData.mjs";
import { displayProfilePage } from "./ui/auth/displayProfilePage.mjs";
import { setupCommonPageEvents } from "./ui/helpers/setupCommonPageEvents.mjs";
import { displayEditProfilePage } from "./ui/auth/displayEditProfielPage.mjs";
import { sendUpdatedProfile } from "./api/helpers/sendUpdatedProfile.mjs";

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
      break;
    case "auth/register":
      break;
    case "/index.html":
    case "/":
      displayFilterData();
      setupCommonPageEvents();
      const fetchListings = async () => {
        try {
          if (checkIfLoggedIn()) {
            createOwnPost();
            formHandler("#postOwnForm", pathName, "#postOwnCTA");
            const profileJSON = await fetchProfile();
            displayLoggedProfile(profileJSON.data);
            displayProfilePage(profileJSON.data);
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
    case "/profile/index.html":
      const fetchProfileData = async () => {
        try {
          if (checkIfLoggedIn()) {
            setupCommonPageEvents();
            const profileJSON = await fetchProfile();
            displayLoggedProfile(profileJSON.data);
            displayProfilePage(profileJSON.data);
          } else {
            window.location.replace(`/auth/login.html`);
          }
          // const listingsObject = await fetchPosts();
          // const listingDataObjects = listingsObject.data;
          // createPosts(listingDataObjects);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfileData();
      break;
    case "/profile/edit/index.html":
      const getProfileData = async () => {
        try {
          if (checkIfLoggedIn()) {
            setupCommonPageEvents();
            const profileJSON = await fetchProfile();
            displayLoggedProfile(profileJSON.data);
            formHandler("#editProfileForm", pathName, "#saveProfile");
            displayEditProfilePage(profileJSON.data);
          } else {
            window.location.replace(`/auth/login.html`);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getProfileData();
      break;
  }
}
pathEvents();
