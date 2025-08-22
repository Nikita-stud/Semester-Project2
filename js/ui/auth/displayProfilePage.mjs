const profilePageName = document.getElementById("profilePageName");
const profilePageImage = document.getElementById("profilePageImage");
const profilePageBackground = document.getElementById("profilePageBackground");
const profilePageEmail = document.getElementById("profilePageEmail");
const profileCredits = document.getElementById("profileCredits");
const toggleContainer = document.getElementById("toggleContainer");

export function displayProfilePage(profile) {
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
          break;
        case "activeBidsContainer":
          break;
        case "winningsContainer":
          break;
        case "expiredBidsContainer":
          break;
      }
    });
  }
}
