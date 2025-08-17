import { checkIfLoggedIn } from "./checkIfLoggedIn.mjs";

const profilePageName = document.getElementById("profilePageName");
const profilePageImage = document.getElementById("profilePageImage");
const profilePageBackground = document.getElementById("profilePageBackground");
const profilePageEmail = document.getElementById("profilePageEmail");
const profileCredits = document.getElementById("profileCredits");

export function displayProfilePage(profile) {
  console.log("This is the profile", profile);
  if (checkIfLoggedIn()) {
    profilePageName.innerText = profile.name;
    profilePageBackground.style.backgroundImage = `url(${profile.banner.url})`;
    profilePageImage.style.backgroundImage = `url(${profile.avatar.url})`;
    profilePageEmail.innerText = profile.email;
    profileCredits.innerText = `Available Credits: CR ${profile.name}`;
  } else {
    console.log("!!!!");
    window.location.replace(`/auth/login.html`);
  }
}
