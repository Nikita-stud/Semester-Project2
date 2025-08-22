import { API_PROFILE } from "../../constants/constants.mjs";
import { createAllowedDataRequest } from "../../events/helpers/createAlloweddataRequest.mjs";
// import { fileToDataUrl } from "../../events/helpers/fileToDataUrl.mjs";

export async function sendUpdatedProfile(entries) {
  try {
    const avatar = entries.get("avatar");
    const banner = entries.get("banner");
    const bio = entries.get("bio");

    // console.log("avatarImg", avatarFile);
    // console.log("bannerImg", bannerFile);
    console.log("avatarImg", avatar);
    console.log("bannerImg", banner);

    const bodyData = {
      avatar: { url: "" },
      banner: { url: "" },
    };

    if (bio && bio.trim() !== "") {
      bodyData.bio = bio;
    }
    if (avatar && avatar.trim() !== "") {
      bodyData.avatar.url = avatar;
    }
    if (banner && banner.trim() !== "") {
      bodyData.banner.url = banner;
    }
    // if (avatarFile && avatarFile !== 0) {
    //   bodyData.avatar.url = await fileToDataUrl(avatarFile);
    // }
    // if (bannerFile && bannerFile !== 0) {
    //   const bannerImg = await fileToDataUrl(bannerFile);
    //   console.log("banner", bannerImg);
    //   bodyData.avatar.url = bannerImg;
    // }

    const fetchUpdate = createAllowedDataRequest("PUT", bodyData);
    const response = await fetch(API_PROFILE, fetchUpdate);
    const json = await response.json();
    // jsonValue = json;
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    } else {
      location.reload();
    }
    // return json;
  } catch (error) {
    console.log(error);
    // catchAndDisplay("#posts_container", jsonValue.errors?.[0]?.message)
  }
}
