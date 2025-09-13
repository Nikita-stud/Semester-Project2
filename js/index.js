import { createPosts } from "./events/posts/createPosts.mjs";
import { fetchPosts } from "./api/posts/fetchPosts.mjs";
import { formHandler } from "./events/auth/formHandler.mjs";
import { fetchSinglePost } from "./api/posts/fetchSinglePost.mjs";
import { fetchProfile } from "./api/posts/fetchProfile.mjs";
import { checkIfLoggedIn } from "./ui/auth/checkIfLoggedIn.mjs";
import { checkToPostOwnList } from "./ui/auth/checkToPostOwnList.mjs";
import { displayProfilePage } from "./ui/auth/displayProfilePage.mjs";
import { setupCommonPageEvents } from "./ui/helpers/setupCommonPageEvents.mjs";
import { displayEditProfilePage } from "./ui/auth/displayEditProfielPage.mjs";
import { renderPostOwnPost } from "./ui/auth/renderPostOwnPost.mjs";
import { filterPosts } from "./events/posts/filterPosts.mjs";
import { displayErrorOnAuth } from "./ui/auth/displayErrorOnAuth.mjs";
import { displayNavLoggedProfile } from "./ui/auth/displayNavLoggedProfile.mjs";
import { createPost } from "./events/posts/createPost.mjs";
import { trackUserOnHotjar } from "./events/helpers/trackUserOnHotjar.mjs";
import { catchAndDisplay } from "./ui/helpers/catchAndDisplay.mjs";

function pathEvents() {
  const pathName = window.location.pathname;
  trackUserOnHotjar();

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

      const fetchListings = async () => {
        try {
          const listingsObject = await fetchPosts();
          const listingDataObjects = listingsObject.data;
          const nonExpiredPosts = listingDataObjects.filter(
            (post) => new Date(post.endsAt) > new Date()
          );
          createPosts(nonExpiredPosts);
          filterPosts(listingDataObjects);

          if (checkIfLoggedIn()) {
            formHandler("#postOwnForm", pathName, "#postOwnCTA");
            const profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
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
      const loadingSinglePost = document.getElementById("loadingSinglePost");
      let jsonValue = {};

      const fetchSingle = async () => {
        try {
          let profileJSON = "";

          if (checkIfLoggedIn()) {
            profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
            setupCommonPageEvents("wait");
          }
          const json = await fetchSinglePost();
          jsonValue = json;
          createPost(json.data, profileJSON.data);
        } catch (error) {
          catchAndDisplay("errorSinglePost", jsonValue, false);
        } finally {
          loadingSinglePost.classList.add("hidden");
        }
      };
      fetchSingle();
      break;
    case "/profile/index.html":
    case "/profile/":
      setupCommonPageEvents();

      const fetchProfileData = async () => {
        try {
          if (checkIfLoggedIn()) {
            const profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
            displayProfilePage(profileJSON.data);
            setupCommonPageEvents("wait");
          } else {
            window.location.replace(`/auth/login.html`);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfileData();
      break;
    case "/profile/edit/index.html":
    case "/profile/edit/":
      setupCommonPageEvents();

      const getProfileData = async () => {
        try {
          if (checkIfLoggedIn()) {
            const profileJSON = await fetchProfile();
            displayNavLoggedProfile(profileJSON.data);
            formHandler("#editProfileForm", pathName, "#saveProfile");

            displayEditProfilePage(profileJSON.data);
            setupCommonPageEvents("wait");
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
    case "/about/":
      setupCommonPageEvents();

      const getAboutProfileData = async () => {
        try {
          const profileJSON = await fetchProfile();
          displayNavLoggedProfile(profileJSON.data);
          setupCommonPageEvents("wait");
        } catch (error) {
          console.log(error);
        }
      };
      getAboutProfileData();
      break;
  }
}
pathEvents();
