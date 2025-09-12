import { fetchBidsMade } from "../../api/posts/fetchBidsMade.mjs";
import { fetchProfileListings } from "../../api/posts/fetchProfileListings.mjs";
import {
  API_PROFILE_BIDS,
  API_PROFILE_WINS,
} from "../../constants/constants.mjs";
import { createProfileListings } from "../../events/posts/createProfileListings.mjs";

const profilePageName = document.getElementById("profilePageName");
const profilePageImage = document.getElementById("profilePageImage");
const profilePageBackground = document.getElementById("profilePageBackground");
const profilePageEmail = document.getElementById("profilePageEmail");
const profileCredits = document.getElementById("editProfileCredits");
const toggleContainer = document.getElementById("toggleContainer");

export async function displayProfilePage(profile) {
  const listingsBids = await fetchProfileListings(profile.listings);
  const allBidsMade = await fetchBidsMade(API_PROFILE_BIDS);
  const winningBids = await fetchBidsMade(API_PROFILE_WINS);

  profilePageName.innerText = profile.name;

  const newAvatarImg = new Image();
  const newBannerImg = new Image();
  newAvatarImg.src = profile.avatar.url;
  newBannerImg.src = profile.banner.url;

  newAvatarImg.onerror = () => {
    profilePageImage.style.backgroundImage = `url(../../images/img-on-error.png)`;
  };
  newBannerImg.onerror = () => {
    profilePageBackground.style.backgroundImage = `url(../../images/img-on-error.png)`;
  };

  profilePageBackground.style.backgroundImage = `url(${profile.banner.url})`;
  profilePageImage.style.backgroundImage = `url(${profile.avatar.url})`;
  profilePageEmail.innerText = profile.email;
  profileCredits.innerHTML = `Available Credits: CR ${profile.credits}`;

  const toggleItems = toggleContainer.children;

  for (let i = 0; i < toggleItems.length; i++) {
    const item = toggleItems[i];

    item.addEventListener("click", () => {
      const itemID = item.id;
      const currentTime = new Date();

      switch (itemID) {
        case "editProfileContainer":
          document.location.href = "edit/index.html";
          break;
        case "myListingContainer":
          const activeListing = listingsBids.filter(
            (listing) => new Date(listing.endsAt) > currentTime
          );
          createProfileListings(item, activeListing);
          break;
        case "expiredListingContainer":
          const expiredListings = listingsBids.filter(
            (listing) => new Date(listing.endsAt) < currentTime
          );
          createProfileListings(item, expiredListings);
          break;
        case "activeBidsContainer":
          const activeBids = allBidsMade.filter(
            (bid) => new Date(bid.listing.endsAt) > currentTime
          );
          createProfileListings(item, activeBids, true);
          break;
        case "winningsContainer":
          createProfileListings(item, winningBids, false);
          break;
        case "expiredBidsContainer":
          const expiredBids = allBidsMade.filter(
            (bid) => new Date(bid.listing.endsAt) < currentTime
          );
          const winningListingsId = winningBids.map((bid) => bid.id);

          const lostAndExpiredBids = expiredBids.filter((bid) => {
            const expiredListingId = bid.listing?.id;
            return !winningListingsId.includes(expiredListingId);
          });
          createProfileListings(item, lostAndExpiredBids, true);
          break;
      }
    });
  }
}
