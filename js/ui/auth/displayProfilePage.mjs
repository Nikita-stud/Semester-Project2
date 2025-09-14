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

const profileEditName = document.getElementById("profileEditName");
const profileEditListings = document.getElementById("profileEditListings");
const profileEditWins = document.getElementById("profileEditWins");
const profileEditBio = document.getElementById("profileEditBio");

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
  profileCredits.innerHTML = `Available Credits: CR  <span class="underline"> ${profile.credits}</span>`;

  profileEditName.innerHTML = `<i class="fa-solid fa-user text-green md:text-desktopButton"></i> <span class="inline truncate">${profile.name}</span>`;
  profileEditListings.innerHTML = `<i class="fa-solid fa-list text-green md:text-desktopButton"></i> <span class="inline">${profile.listings.length}</span>`;
  profileEditWins.innerHTML = `<i class="fa-solid fa-trophy text-green md:text-desktopButton"></i> <span class="inline">${profile.wins.length}</span>`;
  let bio = "None";
  if (profile.bio) {
    bio = profile.bio;
  }
  profileEditBio.innerHTML = `<i class="fa-solid fa-circle-info text-green md:text-desktopButton"></i> <span class="inline truncate">${bio}</span>`;

  const clickableContainers = [
    document.getElementById("editProfileContainer"),
    document.getElementById("myListingContainer"),
    document.getElementById("expiredListingContainer"),
    document.getElementById("activeBidsContainer"),
    document.getElementById("winningsContainer"),
    document.getElementById("expiredBidsContainer"),
  ];

  clickableContainers.forEach((item) => {
    item.addEventListener("click", () => {
      const itemID = item.id;
      const currentTime = new Date();

      switch (itemID) {
        case "editProfileContainer":
          document.location.href = "edit/index.html";
          break;
        case "myListingContainer":
          {
            const activeListing = listingsBids.filter(
              (listing) => new Date(listing.endsAt) > currentTime,
            );
            createProfileListings(item, activeListing);
          }
          break;
        case "expiredListingContainer":
          {
            const expiredListings = listingsBids.filter(
              (listing) => new Date(listing.endsAt) < currentTime,
            );
            createProfileListings(item, expiredListings);
          }

          break;
        case "activeBidsContainer":
          {
            const activeBids = allBidsMade.filter(
              (bid) => new Date(bid.listing.endsAt) > currentTime,
            );
            createProfileListings(item, activeBids, true);
          }
          break;
        case "winningsContainer":
          createProfileListings(item, winningBids, false);
          break;
        case "expiredBidsContainer":
          {
            const expiredBids = allBidsMade.filter(
              (bid) => new Date(bid.listing.endsAt) < currentTime,
            );
            const winningListingsId = winningBids.map((bid) => bid.id);

            const lostAndExpiredBids = expiredBids.filter((bid) => {
              const expiredListingId = bid.listing?.id;
              return !winningListingsId.includes(expiredListingId);
            });
            createProfileListings(item, lostAndExpiredBids, true);
          }
          break;
      }
    });
  });
}
