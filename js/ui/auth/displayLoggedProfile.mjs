import { checkIfLoggedIn } from "./checkIfLoggedIn.mjs";
const logButton = document.getElementById("ifLoggedIn");
const profileContainer = document.getElementById("navLoggedProfile");
const headerLine = document.getElementById("headerLine");

export function displayLoggedProfile(profileObject) {
  profileContainer.classList.add(
    "flex",
    "flex-col",
    "text-mobileText",
    "px-[20px]",
    "pt-[20px]"
  );

  if (checkIfLoggedIn()) {
    headerLine.classList.toggle("mt-[87px]");
    headerLine.classList.toggle("mt-[20px]");

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
    email.classList.add("text-grey");
    email.innerText = profileObject.email;

    profileContainer.append(img);
    profileContainer.append(name);
    profileContainer.append(email);

    logButton.innerHTML = `<a href="auth/login.html" class="font-nunito">
                              <i id="loginNavIcon" class="fa-solid fa-door-open hidden text-mobileText text-green"></i>
                              <span class="ml-[35px] font-nunito">Logout
                              </span>
                            </a>`;
    logButton.addEventListener("click", () => {
      localStorage.removeItem("UserName");
      document.location.href = "/auth/login.html";
    });
  }
}
