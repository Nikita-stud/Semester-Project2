const avatar = document.getElementById("profilePageImage");
const banner = document.getElementById("profilePageBackground");
const name = document.getElementById("name");
const email = document.getElementById("email");
const cancelCta = document.getElementById("cancel");
const bio = document.getElementById("bio");

export function displayEditProfilePage(profile) {
  console.log("This is the profile", profile);
  avatar.style.backgroundImage = `url(${profile.banner.url})`;
  banner.style.backgroundImage = `url(${profile.avatar.url})`;

  profileCredits.innerHTML = `Your Credits: CR <span class="underline text-underline">${profile.credits}</span>`;
  name.placeholder = `${profile.name}`;
  email.placeholder = `${profile.email}`;

  cancelCta.addEventListener("click", () => {
    window.location.replace(`/profile/index.html`);
  });
}
