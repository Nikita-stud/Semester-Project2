import { API_PROFILE } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
// import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function fetchProfile() {
  let jsonValue = {};
  try {
    const fetchProfile = createAllowedRequest("GET");
    const response = await fetch(API_PROFILE, fetchProfile);
    const json = await response.json();
    jsonValue = json;
    console.log(jsonValue.data);

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    }
    return json;
  } catch (error) {
    console.log(error);
    // catchAndDisplay(`${containerId}`, jsonValue, false);
  }
}
