import { transformTime } from "../helpers/transformTime.mjs";

export function renderPostOwnPost() {
  const mainLandingContainer = document.getElementById("mainLandingContainer");
  const postOwnPostContainer = document.getElementById("postOwnPostContainer");
  const postButton = document.getElementById("postOwnBidButton");
  const landingContainer = document.getElementById("landingContainer");
  const cancelOwnCTA = document.getElementById("cancelOwnCTA");
  const addImgCta = document.getElementById("addImgCta");
  const inputContainer = document.getElementById("postOwnInputContainer");

  let productCount = "";
  const productInput = document.getElementById("product");
  const productTextCount = document.getElementById("textCount");

  productInput.addEventListener("input", () => {
    productCount = productInput.value.length;
    productTextCount.innerHTML = `${productCount}/10`;
  });

  let descriptionCount = "";
  const descriptionInput = document.getElementById("description");
  const descriptionDefaultCount = document.getElementById("descriptionCount");

  descriptionInput.addEventListener("input", () => {
    descriptionCount = descriptionInput.value.length;
    descriptionDefaultCount.innerHTML = `${descriptionCount}/200`;
  });

  const today = new Date();
  const time = transformTime(today);
  const { day, month, year, hours, min } = time;

  const timeInput = document.getElementById("time");
  timeInput.min = `${year}-${month}-${day}T${hours}:${min}`;

  let count = 1;
  const addedImgDivs = [];
  addImgCta.addEventListener("click", () => {
    count++;
    if (count > 5) {
      return;
    }
    const newImgDiv = document.createElement("div");
    newImgDiv.classList.add(
      "flex",
      "flex-col",
      "font-nunito",
      "px-[20px]",
      "mt-[5px]"
    );
    newImgDiv.innerHTML = ` <label
                              for="image-${count}"
                              class="-ml-[8px] pb-[5px] font-bold font-nunito px-2 xs:text-white"
                            >
                              Image ${count}
                            </label>
                            <input
                              type="url"
                              id="image"
                              name="image"
                              placeholder="Image URL"
                              class="pl-[20px] h-[47px] rounded-full font-nunito focus:outline-none focus:border-none md:text-desktopText"
                            />
                              <p id="imageCount" class="text-mobileText text-yellow">
                                Image ${count} of 5
                              </p>
                            </div>`;
    inputContainer.insertAdjacentElement("beforeend", newImgDiv);
    addedImgDivs.push(newImgDiv);
  });

  postButton.addEventListener("click", () => {
    mainLandingContainer.classList.toggle("hidden");
    postOwnPostContainer.classList.toggle("hidden");
    landingContainer.classList.remove("bg-mobileSheep", "w-full", "h-[477px]");
    landingContainer.classList.add("mx-[20px]", "bg-green", "rounded-[20px]");
  });
  cancelOwnCTA.addEventListener("click", () => {
    count = 1;
    addedImgDivs.forEach((div) => {
      div.remove();
    });
    addedImgDivs.length = 0;
    mainLandingContainer.classList.toggle("hidden");
    postOwnPostContainer.classList.toggle("hidden");
    landingContainer.classList.add("bg-mobileSheep", "w-full", "h-[477px]");
    landingContainer.classList.remove(
      "mx-[20px]",
      "bg-green",
      "rounded-[20px]"
    );
  });
}
