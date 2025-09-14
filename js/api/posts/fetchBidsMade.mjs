import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";
/**
 *  Fetches your Bids placed by getting data
 * from the server with the posts
 * @param {Array} api -Array of Objects
 * @returns {Object} JSON response containing Objects of bids made
 */

export async function fetchBidsMade(api) {
  let jsonValue = {};
  try {
    const fetchProfile = createAllowedRequest("GET");
    const response = await fetch(api, fetchProfile);
    const json = await response.json();
    jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    }
    return json.data;
  } catch (error) {
    catchAndDisplay(`noPostsContainer`, jsonValue, false);
  }
}
