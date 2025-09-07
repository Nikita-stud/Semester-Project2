import { API_PROFILE } from "../../constants/constants.mjs";
import { createAllowedDataRequest } from "../../events/helpers/createAlloweddataRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function sendUpdatedProfile(entries) {
  let jsonValue = {};
  try {
    const { avatar, banner, bio } = entries;
    const bodyData = {};

    if (bio && bio.trim().length > 0) {
      bodyData.bio = bio;
    }
    if (avatar && avatar.trim().length > 0) {
      bodyData.avatar = { url: avatar };
    }
    if (banner && banner.trim().length > 0) {
      bodyData.banner = { url: banner };
    }

    const fetchUpdate = createAllowedDataRequest("PUT", bodyData);
    const response = await fetch(API_PROFILE, fetchUpdate);
    const json = await response.json();
    jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Editing Profile failed");
    } else {
      catchAndDisplay("errorEditProfile", jsonValue, true);
      location.reload();
    }
    return json;
  } catch (error) {
    catchAndDisplay("errorEditProfile", jsonValue, false);
  }
}
