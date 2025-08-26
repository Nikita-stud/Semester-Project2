import { API_AUCTION } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
// import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function fetchPosts() {
  // let jsonValue = {};
  try {
    const fetchPosts = createAllowedRequest("GET");
    const response = await fetch(API_AUCTION, fetchPosts);
    const json = await response.json();
    // jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    }
    return json;
  } catch (error) {
    console.log(error);
    // catchAndDisplay("#posts_container", jsonValue.errors?.[0]?.message)
  }
}
