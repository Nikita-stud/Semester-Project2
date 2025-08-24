import { generateUniqueId } from "../../events/helpers/generateUniqueID.mjs";

export function createProfileListings(container, profile) {
  const existingContainer = container.querySelector(".listings");
  if (existingContainer) {
    existingContainer.remove();
    return;
  }
  const bidsContainer = document.createElement("div");
  const uniqueId = generateUniqueId();
  container.insertAdjacentElement("beforeend", bidsContainer);
  bidsContainer.setAttribute("id", uniqueId);
  bidsContainer.classList.add(
    "listings",
    "mt-[20px]",
    "bg-yellow",
    "w-full",
    "h-[200px]"
  );
  const profileListings = profile.listings;
  profileListings.forEach((bid) => {
    const div = document.createElement("div");
    const header = document.createElement("h2");
    header.innerText = bid.title;

    bidsContainer.append(div);
    div.append(header);
  });

  return bidsContainer;
}
