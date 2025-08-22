const avatarImg = document.getElementById("profilePageImage");
const bannerImg = document.getElementById("profilePageBackground");
const name = document.getElementById("name");
const email = document.getElementById("email");
const cancelCta = document.getElementById("cancel");
const bio = document.getElementById("bio");

export function displayEditProfilePage(profile) {
  avatarImg.style.backgroundImage = `url(${profile.banner.url})`;
  bannerImg.style.backgroundImage = `url(${profile.avatar.url})`;

  profileCredits.innerHTML = `Your Credits: CR <span class="underline text-underline">${profile.credits}</span>`;
  name.placeholder = `${profile.name}`;
  email.placeholder = `${profile.email}`;
  const bioText = profile.bio || "Write something about yourself";
  bio.placeholder = `${bioText}`;

  cancelCta.addEventListener("click", () => {
    window.location.replace(`/profile/index.html`);
  });
}
