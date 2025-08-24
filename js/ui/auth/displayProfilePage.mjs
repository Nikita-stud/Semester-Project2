import { fetchProfileListings } from "../../api/posts/fetchProfileListings.mjs";
import { createProfileListings } from "../posts/createProfileListings.mjs";

const profilePageName = document.getElementById("profilePageName");
const profilePageImage = document.getElementById("profilePageImage");
const profilePageBackground = document.getElementById("profilePageBackground");
const profilePageEmail = document.getElementById("profilePageEmail");
const profileCredits = document.getElementById("profileCredits");
const toggleContainer = document.getElementById("toggleContainer");

export async function displayProfilePage(profile) {
  const listingsBids = await fetchProfileListings(profile.listings);
  console.log("myBIDSSSSS:", listingsBids);

  console.log("This is the profile", profile);
  profilePageName.innerText = profile.name;
  profilePageBackground.style.backgroundImage = `url(${profile.banner.url})`;
  profilePageImage.style.backgroundImage = `url(${profile.avatar.url})`;
  profilePageEmail.innerText = profile.email;
  profileCredits.innerText = `Available Credits: CR ${profile.credits}`;

  const toggleItems = toggleContainer.children;

  for (let i = 0; i < toggleItems.length; i++) {
    const item = toggleItems[i];
    item.addEventListener("click", () => {
      const itemID = item.id;
      switch (itemID) {
        case "editProfileContainer":
          document.location.href = "edit/index.html";
          break;
        case "myListingContainer":
          const listingContainer = createProfileListings(item, profile);
          break;
        case "activeBidsContainer":
          const activeContainer = createProfileListings(item, profile);
          break;
        case "winningsContainer":
          const winningsContainer = createProfileListings(item, profile);
          break;
        case "expiredBidsContainer":
          const expiredContainer = createProfileListings(item, profile);

          break;
      }
    });
  }
}
