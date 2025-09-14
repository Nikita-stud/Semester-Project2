import { API_AUCTION } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

/**
 *  Fetches your desired single Post by sending the id
 * from URL to server and fetching the single Post
 *  @returns {Object} -JSON with a single Post
 */

export async function fetchPosts() {
  const loadingContainer = document.getElementById("postsLoadingContainer");
  const hottestLoadingContainer = document.getElementById(
    "hottestLoadingContainer"
  );
  let jsonValue = {};
  try {
    const fetchPosts = createAllowedRequest("GET");
    const response = await fetch(API_AUCTION, fetchPosts);
    const json = await response.json();
    jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    }
    return json;
  } catch (error) {
    loadingContainer.innerHTML = "";
    hottestLoadingContainer.style.display = "none";
    catchAndDisplay("errorFetchingPosts", jsonValue, false);
    catchAndDisplay("errorFetchingHottestPosts", jsonValue, false);
  }
}
