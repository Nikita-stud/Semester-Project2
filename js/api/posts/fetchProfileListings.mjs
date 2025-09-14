import { API_POST } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

/**
 *  Fetches your Profile Listings by fetching server
 *  and fetching the Posts
 *  @param {Object} listings - Objects with all your
 *  @returns {Object} -JSON with a all your Listings
 */

export async function fetchProfileListings(listings) {
  let jsonValue = {};
  try {
    const listingsProm = listings.map(async (listing) => {
      const fetchProfile = createAllowedRequest("GET");
      const response = await fetch(
        `${API_POST}/${listing.id}?&_bids=true&_seller=true`,
        fetchProfile
      );
      const json = await response.json();
      jsonValue = json;

      if (!response.ok) {
        throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
      }
      return json.data;
    });
    const listing = await Promise.all(listingsProm);
    return listing;
  } catch (error) {
    catchAndDisplay("noPostsContainer", jsonValue, false);
  }
}
