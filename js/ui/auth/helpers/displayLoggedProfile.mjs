import { checkIfLoggedIn } from "../checkIfLoggedIn.mjs";
const logButton = document.getElementById("ifLoggedIn");
const profileContainer = document.getElementById("navLoggedProfile");

export function displayLoggedProfile(profileObject) {
  console.log("This is the profile", profileObject);

  profileContainer.classList.add("flex", "flex-col");

  if (checkIfLoggedIn()) {
    const img = document.createElement("img");
    img.classList.add(
      "rounded-full",
      "w-[80px]",
      "h-[80px]",
      "object-cover",
      "overflow-hidden"
    );
    const imgContent = profileObject.avatar.url
      ? profileObject.avatar.url
      : "../../images/no-img.png";
    img.src = imgContent;
    img.alt = profileObject.avatar.alt || "Profile image not described";

    const name = document.createElement("p");
    name.innerText = profileObject.name;

    const email = document.createElement("p");
    email.innerText = profileObject.email;

    profileContainer.append(img);
    profileContainer.append(name);
    profileContainer.append(email);

    logButton.innerHTML = `<i class="fa-solid fa-door-open text-mobileText text-green">Logout</i>`;
    logButton.addEventListener("click", () => {
      localStorage.removeItem("UserName");
      document.location.href = "/auth/login.html";
    });
  }
}
