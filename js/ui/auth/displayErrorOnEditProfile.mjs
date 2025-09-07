import { checkIfImageValid } from "../../events/helpers/checkIfImageValid.mjs";

export async function displayErrorOnEditProfile(entries) {
  const avatarErrorText = document.getElementById("avatarErrorText");
  const bannerErrorText = document.getElementById("bannerErrorText");

  avatarErrorText.classList.add("hidden");
  bannerErrorText.classList.add("hidden");

  const { avatar, banner } = entries;

  let avatarCheck = true;
  let bannerCheck = true;

  const hasAvatar = avatar && avatar.trim().length > 0;
  const hasBanner = banner && banner.trim().length > 0;

  if (hasAvatar) {
    avatarCheck = await checkIfImageValid(avatar);
    if (!avatarCheck) {
      avatarErrorText.classList.remove("hidden");
      avatarErrorText.innerText = "Profile URL is not valid";
    }
  }

  if (hasBanner) {
    bannerCheck = await checkIfImageValid(banner);
    if (!bannerCheck) {
      bannerErrorText.classList.remove("hidden");
      bannerErrorText.innerText = "Banner URL is not valid";
    }
  }
  return avatarCheck && bannerCheck;
}
