import { createPosts } from "./api/posts/createPosts.mjs";
import { fetchPosts } from "./api/posts/fetchPosts.mjs";
import { formHandler } from "./events/auth/formHandler.mjs";
import { fetchSinglePost } from "./api/posts/fetchSinglePost.mjs";
import { fetchProfile } from "./api/posts/fetchProfile.mjs";
import { checkIfLoggedIn } from "./ui/auth/checkIfLoggedIn.mjs";
import { checkToPostOwnList } from "./ui/auth/checkToPostOwnList.mjs";
import { displayFilterData } from "./ui/helpers/displayFilterData.mjs";
import { displayProfilePage } from "./ui/auth/displayProfilePage.mjs";
import { setupCommonPageEvents } from "./ui/helpers/setupCommonPageEvents.mjs";
import { displayEditProfilePage } from "./ui/auth/displayEditProfielPage.mjs";
import { renderPostOwnPost } from "./ui/auth/renderPostOwnPost.mjs";
import { filterPosts } from "./events/posts/filterPosts.mjs";
import { displayErrorOnAuth } from "./ui/auth/displayErrorOnAuth.mjs";
import { displayNavLoggedProfile } from "./ui/auth/displayNavLoggedProfile.mjs";
import { createPost } from "./api/posts/createPost.mjs";

function pathEvents() {
  const pathName = window.location.pathname;

  switch (pathName) {
    case "/auth/login.html":
    case "/auth/login":
      displayErrorOnAuth("loginButton");
      formHandler("#loginForm", pathName, "#loginButton");
      break;
    case "/auth/register.html":
    case "/auth/register":
      displayErrorOnAuth("registerButton");
      formHandler("#registerForm", pathName, "#registerButton");
      break;
    case "/index.html":
    case "/":
      setupCommonPageEvents();
      displayFilterData();

      const fetchListings = async () => {
        try {
          const listingsObject = await fetchPosts();
          const listingDataObjects = listingsObject.data;
          createPosts(listingDataObjects);
          filterPosts(listingDataObjects);

          if (checkIfLoggedIn()) {
            formHandler("#postOwnForm", pathName, "#postOwnCTA");
            const profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
            console.log("I am logged in");
            renderPostOwnPost();
            setupCommonPageEvents("wait");
          } else {
            checkToPostOwnList("postOwnBidButton", "post");
          }
        } catch (error) {
          console.log("error in index", error);
        }
      };
      fetchListings();
      break;
    case "/post/":
      setupCommonPageEvents();

      const fetchSingle = async () => {
        try {
          if (checkIfLoggedIn()) {
            const profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
            const json = await fetchSinglePost();
            createPost(json.data, profileJSON.data);

            setupCommonPageEvents("wait");
          }
        } catch (error) {
          console.log("error in single posts", error);
        }
      };
      fetchSingle();
      break;
    case "/profile/index.html":
      setupCommonPageEvents();

      const fetchProfileData = async () => {
        try {
          if (checkIfLoggedIn()) {
            const profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
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
      setupCommonPageEvents();

      const getProfileData = async () => {
        try {
          if (checkIfLoggedIn()) {
            const profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
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
    case "/about/index.html":
      setupCommonPageEvents();

      const getAboutProfileData = async () => {
        try {
          const profileJSON = await fetchProfile();
          displayNavLoggedProfile(profileJSON.data);
        } catch (error) {
          console.log(error);
        }
      };
      getAboutProfileData();
      break;
  }
}
pathEvents();
