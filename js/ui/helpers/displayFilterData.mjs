const filterContainer = document.getElementById("filterContainer");
const filterText = document.getElementById("filterText");

export function displayFilterData() {
  filterText.addEventListener("click", () => {
    filterContainer.classList.toggle("hidden");

    filterContainer.innerHTML = `   
          <div class="relative bg-green flex justify-center h-[47px]">
            <h3 class="text-mobileSecondaryHeader text-white font-nunito">
              Filter
            </h3>
            <i
              id="filterCloseIcon"
              class="fa-solid fa-xmark cursor-pointer absolute top-[8px] right-[2px] text-mobileSecondaryHeader"
            ></i>
          </div>
          <form action="#">
            <div class="flex p-[20px] flex-col gap-[12px]">
              <h3 class="text-mobileSecondaryHeader font-nunito text-dark">
                Categories
              </h3>
              <div class="flex justify-between">
                <label
                  for="vegetables"
                  class="text-mobileText text-grey font-nunito"
                >
                  Vegetables
                </label>
                <input
                  type="checkbox"
                  id="vegetables"
                  name="vegetables"
                  class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                />
              </div>
              <div class="flex justify-between">
                <label
                  for="fruits"
                  class="text-mobileText text-grey font-nunito"
                >
                  Fruits
                </label>
                <input
                  type="checkbox"
                  id="fruits"
                  name="fruits"
                  class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                />
              </div>
              <div class="flex justify-between">
                <label
                  for="livestock"
                  class="text-mobileText text-grey font-nunito"
                >
                  Livestock
                </label>
                <input
                  type="checkbox"
                  id="livestock"
                  name="livestock"
                  class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                />
              </div>
              <div class="flex justify-between">
                <label
                  for="mushrooms"
                  class="text-mobileText text-grey font-nunito"
                >
                  Mushrooms
                </label>
                <input
                  type="checkbox"
                  id="mushrooms"
                  name="mushrooms"
                  class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                />
              </div>
              <div class="flex justify-between">
                <label
                  for="herbs"
                  class="text-mobileText text-grey font-nunito"
                >
                  Herbs
                </label>
                <input
                  type="checkbox"
                  id="herbs"
                  name="herbs"
                  class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                />
              </div>
              <div class="flex justify-between">
                <label
                  for="honey"
                  class="text-mobileText text-grey font-nunito"
                >
                  Honey
                </label>
                <input
                  type="checkbox"
                  id="honey"
                  name="honey"
                  class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                />
              </div>
              <div class="flex justify-between">
                <label
                  for="grains"
                  class="text-mobileText text-grey font-nunito"
                >
                  Grains
                </label>
                <input
                  type="checkbox"
                  id="grains"
                  name="grains"
                  class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                />
              </div>
            </div>

            <div class="mt-[20px] h-[3px] bg-green rounded-md"></div>

            <div class="p-[20px]">
              <h3
                class="mb-[20px] text-mobileSecondaryHeader text-dark font-nunito"
              >
                Sort order
              </h3>
              <div class="flex flex-col gap-[12px]">
                <div class="flex justify-between">
                  <label
                    for="mostPopular"
                    class="text-mobileText text-grey font-nunito"
                  >
                    Most Popular
                  </label>
                  <input
                    type="checkbox"
                    id="mostPopular"
                    name="mostPopular"
                    class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                  />
                </div>
                <div class="flex justify-between">
                  <label
                    for="newest"
                    class="text-mobileText text-grey font-nunito"
                  >
                    Newest
                  </label>
                  <input
                    type="checkbox"
                    id="newest"
                    name="newest"
                    class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                  />
                </div>
                <div class="flex justify-between">
                  <label
                    for="priceHightoLow"
                    class="text-mobileText text-grey font-nunito"
                  >
                    Price Low <i class="fa-solid fa-minus"></i> High
                  </label>
                  <input
                    type="checkbox"
                    id="priceHightoLow"
                    name="priceHightoLow"
                    class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                  />
                </div>
                <div class="flex justify-between">
                  <label
                    for="priceLowtoHigh"
                    class="text-mobileText text-grey font-nunito"
                  >
                    Price High <i class="fa-solid fa-minus"></i> Low
                  </label>
                  <input
                    type="checkbox"
                    id="priceLowtoHigh"
                    name="priceLowtoHigh"
                    class="h-[25px] w-[25px] flex items-center bg-formWhite rounded-full border border-dark"
                  />
                </div>
              </div>
            </div>
            <button
              class="m-[20px] w-[280px] h-[60px] font-nunito font-bold flex items-center justify-center bg-yellow text-darkerYellow text-mobileButton rounded-full"
            >
              Filter search
            </button>
          </form>
      `;
    const filterCloseIcon = document.getElementById("filterCloseIcon");

    filterCloseIcon.addEventListener("click", () => {
      filterContainer.classList.toggle("hidden");
    });
  });

  // const articleContainer = document.getElementById("articleContainer");
  // const overlayContainer = document.createElement("div");
  // overlayContainer.classList.add(
  //   "cursor-pointer",
  //   "fixed",
  //   "inset-0",
  //   "bg-opacity-50",
  //   "w-screen",
  //   "h-screen",
  //   "z-20",
  //   "bg-dark"
  // );
  // overlayContainer.addEventListener("click", (e) => {
  //   if (e.target === overlayContainer) {
  //     articleContainer.removeChild(overlayContainer);
  //   }
  // });

  // const container = document.createElement("div");
  // container.classList.add(
  //   "min-w-[200px]",
  //   "bg-white",
  //   "rounded-[20px]",
  //   "font-nunito",
  //   "p-[20px]",
  //   "h-auto",
  //   "max-w-[280px]",
  //   "xs:min-w-[240px]",
  //   "absolute",
  //   "top-1/2",
  //   "left-1/2",
  //   "transform",
  //   "-translate-x-1/2",
  //   "-translate-y-1/2",
  //   "max-h-[90vh]",
  //   "overflow-y-auto"
  // );
}
