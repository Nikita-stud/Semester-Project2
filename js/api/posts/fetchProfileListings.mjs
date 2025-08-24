import { API_POST } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
// import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function fetchProfileListings(listings) {
  // for (let i = 0; i < listings.length; i++) {
  //   console.log(listings[i].id);
  // }
  // console.log(listings.id);
  // let jsonValue = {};
  try {
    const listingsProm = listings.map(async (listing) => {
      const fetchProfile = createAllowedRequest("GET");
      const response = await fetch(
        `${API_POST}/${listing.id}?&_bids=true&_seller=true`,
        fetchProfile
      );
      if (!response.ok) {
        throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
      }
      const json = await response.json();
      console.log("jsonData", json.data);
      return json.data;
    });
    const listing = await Promise.all(listingsProm);
    return listing;
    // jsonValue = json;
  } catch (error) {
    console.log(error);
    // catchAndDisplay("#posts_container", jsonValue.errors?.[0]?.message)
  }
}
