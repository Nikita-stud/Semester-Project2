const avatarImg = document.getElementById("profilePageImage");
const bannerImg = document.getElementById("profilePageBackground");
const bannerPreview = document.getElementById("profileBannerPreview");
const bannerInput = document.getElementById("banner");
const avatarPreview = document.getElementById("avatarPreview");
const avatarInput = document.getElementById("avatar");
const uploadAvatarIcon = document.getElementById("uploadAvatarIcon");
const uploadBannerIcon = document.getElementById("uploadBannerIcon");
const name = document.getElementById("name");
const email = document.getElementById("email");

const cancelCta = document.getElementById("cancel");
const bio = document.getElementById("bio");

export function displayEditProfilePage(profile) {
  console.log("This is the profile", profile);
  avatarImg.style.backgroundImage = `url(${profile.banner.url})`;
  bannerImg.style.backgroundImage = `url(${profile.avatar.url})`;

  profileCredits.innerHTML = `Your Credits: CR <span class="underline text-underline">${profile.credits}</span>`;
  name.placeholder = `${profile.name}`;
  email.placeholder = `${profile.email}`;

  bannerInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgData = event.target.result.toString().trim();
      bannerImg.style.backgroundImage = `url('${imgData}')`;

      bannerPreview.classList.toggle("bg-dark");
      uploadBannerIcon.classList.toggle("hidden");
    };
    reader.readAsDataURL(file);
  });
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
      const imgData = event.target.result.toString().trim();
      avatarImg.style.backgroundImage = `url('${imgData}')`;

      avatarPreview.classList.toggle("bg-dark");
      uploadAvatarIcon.classList.toggle("hidden");
    };
    reader.readAsDataURL(file);
  });

  cancelCta.addEventListener("click", () => {
    window.location.replace(`/profile/index.html`);
  });
}
