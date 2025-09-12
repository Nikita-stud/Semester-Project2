import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

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
    console.log(error);
    catchAndDisplay(`noPostsContainer`, jsonValue, false);
  }
}
