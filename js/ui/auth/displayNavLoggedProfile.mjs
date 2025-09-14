export function displayNavLoggedProfile(profileObject) {
  const logButton = document.getElementById("ifLoggedIn");
  const profileContainer = document.getElementById("navLoggedProfile");
  const headerLine = document.getElementById("headerLine");

  profileContainer.classList.add(
    "flex",
    "flex-col",
    "text-mobileText",
    "px-[20px]",
    "pt-[20px]",
  );
  profileContainer.innerHTML = "";

  headerLine.classList.remove("mt-[87px]");
  headerLine.classList.add("mt-[20px]");

  const img = document.createElement("img");
  img.classList.add(
    "rounded-full",
    "w-[80px]",
    "h-[80px]",
    "object-cover",
    "overflow-hidden",
  );
  const imgContent = profileObject?.avatar?.url
    ? profileObject.avatar.url
    : "../../images/no-img.png";
  img.src = imgContent;
  img.alt = profileObject?.avatar?.alt || "Profile image not described";

  img.onerror = () => {
    img.src = "../../images/img-on-error.png";
    img.alt = "The image is not visible because of an error";
  };

  const name = document.createElement("p");
  name.classList.add("truncate");
  name.innerText = profileObject?.name;

  const email = document.createElement("p");
  email.classList.add("text-grey", "truncate");
  email.innerText = profileObject?.email;

  profileContainer.append(img);
  profileContainer.append(name);
  profileContainer.append(email);

  logButton.innerHTML = `<a class="font-nunito">
                              <i id="loginNavIcon" class="fa-solid fa-door-open  text-mobileText text-green"></i>
                              <span class="ml-[35px] font-nunito">Logout
                              </span>
                            </a>`;
  logButton.addEventListener("click", () => {
    localStorage.removeItem("UserName");
    window.location.href = "/auth/login.html";
  });
}
