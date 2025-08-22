import { generateUniqueId } from "../../events/helpers/generateUniqueID.mjs";

export function createProfileListings(container, profile) {
  console.log("This is the profile in createProfileListings", profile);
  const existingContainer = container.querySelector(".listings");
  if (existingContainer) {
    existingContainer.remove();
    return;
  }
  const bidsContainer = document.createElement("div");
  const uniqueId = generateUniqueId();
  container.insertAdjacentElement("beforeend", bidsContainer);
  bidsContainer.setAttribute("id", uniqueId);
  bidsContainer.classList.add("listings", "bg-green", "w-full", "h-[200px]");
  return bidsContainer;
}
