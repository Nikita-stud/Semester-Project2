import { API_PROFILE } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function fetchProfile() {
  const loadingProfile = document.getElementById("loadingProfile");
  const loadingDispAbout = document.getElementById("loadingDispAbout");
  let jsonValue = {};
  try {
    const fetchProfile = createAllowedRequest("GET");
    const response = await fetch(API_PROFILE, fetchProfile);
    const json = await response.json();
    jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    }
    return json;
  } catch (error) {
    catchAndDisplay("errorDispAbout", jsonValue, false);
    catchAndDisplay("errorDispProfile", jsonValue, false);
  } finally {
    loadingProfile.classList.add("hidden");
    loadingDispAbout.classList.remove("md:grid");
    loadingDispAbout.classList.add("hidden");
  }
}
