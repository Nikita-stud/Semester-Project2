import { loadLocalStorage } from "../../events/auth/loadLocalStorage.mjs";
import { saveLocalStorage } from "../../events/auth/saveLocalStorage.mjs";
import { cleanApiTitle } from "../../ui/auth/helpers/cleanApiTitle.mjs";

export function createPost(post) {
  const articleContainer = document.getElementById("articleContainer");
  console.log("THIS IS A SINGLE POST", post);

  const headerAndIconContainer = document.createElement("div");
  headerAndIconContainer.classList.add("flex", "justify-between");

  const h1 = document.createElement("h1");
  const cleanTitle = cleanApiTitle(post.title);
  h1.innerText = cleanTitle;
  h1.classList.add(
    "flex",
    "items-center",
    "text-mobileMainHeader",
    "font-garamond"
  );

  const icon = document.createElement("i");
  icon.classList.add(
    "fa-regular",
    "fa-heart",
    "cursor-pointer",
    "p-[20px]",
    "border",
    "rounded-md"
  );
  icon.addEventListener("click", () => {
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
    if (icon.classList.contains("fa-solid")) {
    }
  });

  articleContainer.append(headerAndIconContainer);
  headerAndIconContainer.append(h1);
  headerAndIconContainer.append(icon);
}
