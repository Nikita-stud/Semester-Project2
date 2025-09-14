const avatarImg = document.getElementById("profilePageImage");
const bannerImg = document.getElementById("profilePageBackground");
const profileCredits = document.getElementById("profileCredits");

const form = document.getElementById("editProfileForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const saveCta = document.getElementById("saveProfile");
const cancelCta = document.getElementById("cancel");
const bio = document.getElementById("bio");

const nameHidden = document.getElementById("editProfileName");
const emailHidden = document.getElementById("editProfileEmail");

export function displayEditProfilePage(profile) {
  nameHidden.innerText = `${profile.name}`;
  emailHidden.innerText = `${profile.email}`;

  const newAvatarImg = new Image();
  const newBannerImg = new Image();
  newAvatarImg.src = profile.avatar.url;
  newBannerImg.src = profile.banner.url;

  newAvatarImg.onerror = () => {
    avatarImg.style.backgroundImage = `url(../../images/img-on-error.png)`;
  };
  newBannerImg.onerror = () => {
    bannerImg.style.backgroundImage = `url(../../images/img-on-error.png)`;
  };

  avatarImg.style.backgroundImage = `url(${profile.avatar.url})`;
  bannerImg.style.backgroundImage = `url(${profile.banner.url})`;

  profileCredits.innerHTML = `Your Credits: CR <span class="underline text-underline">${profile.credits}</span>`;
  name.placeholder = `${profile.name}`;
  email.placeholder = `${profile.email}`;
  const bioText = profile.bio || "Write something about yourself";
  bio.placeholder = `${bioText}`;

  form.addEventListener("input", () => {
    const data = new FormData(form);
    const values = Object.fromEntries(data);
    const { banner, avatar, bio } = values;
    if (banner || avatar || bio) {
      saveCta.disabled = false;
      saveCta.classList.remove("opacity-50");
    } else {
      saveCta.disabled = true;
      saveCta.classList.add("opacity-50");
    }
  });

  cancelCta.addEventListener("click", () => {
    window.location.replace(`/profile/index.html`);
  });
}
