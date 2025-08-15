export function createOwnPost() {
  const postButton = document.getElementById("postOwnBidButton");
  const landingContainer = document.getElementById("landingContainer");

  // let textId = "";
  // let productAmount = 0;

  // landingContainer.addEventListener("input", (e) => {
  //   textId = e.target;
  //   if (textId === product) {
  //     productAmount = textId.value.length;
  //   }
  //   console.log(productAmount);
  // });

  postButton.addEventListener("click", () => {
    landingContainer.classList.remove("bg-mobileSheep", "w-full", "h-[477px]");
    landingContainer.classList.add("mx-[20px]", "bg-green", "rounded-[20px]");
    landingContainer.innerHTML = `  <div>
                                      <h1 class="text-mobileMainHeader font-garamond font-bold text-white p-[20px]">
                                        Fill in the basic information about your item
                                      </h1>
                                      <div class="mt-[20px]"
                                        <form id="postForm">
                                          <fieldset id="fieldset" class="flex flex-col gap-[20px]">
                                            <div class="flex flex-col font-nunito px-[20px]">
                                                <label for="product" class="-ml-[8px] pb-[5px] font-bold font-nunito px-2 xs:text-white">
                                                Product name 
                                                  <i
                                                    class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                  ></i>
                                                  </label>
                                                <input
                                                  type="product"
                                                  id="product"
                                                  name="product"
                                                  placeholder="Salat"
                                                  pattern="[A-Za-z0-9_]+"
                                                  maxlength="10"
                                                  class="pl-[20px] h-[47px] rounded-full font-nunito focus:outline-none focus:border-none md:text-desktopText"
                                                />
                                                <p id="textCount"  class="text-mobileText text-yellow">/20</p>
                                            </div>
                                            <div class="flex flex-col font-nunito px-[20px]">
                                                <label for="price" class="-ml-[8px] pb-[5px] font-bold font-nunito px-2 xs:text-white">
                                                Starting price
                                                  <i
                                                    class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                  ></i></label>
                                                <input
                                                  type="price"
                                                  id="price"
                                                  name="price"
                                                  placeholder="CR"
                                                  class="pl-[20px] h-[47px] rounded-full font-nunito focus:outline-none focus:border-none md:text-desktopText"/>
                                            </div>
                                            <div class="flex flex-col font-nunito px-[20px]">
                                                <label for="time" class="-ml-[8px] pb-[5px] font-bold font-nunito px-2 xs:text-white">
                                                  Time allowed to bid                    
                                                  <i
                                                    class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                  ></i></label>
                                                <input
                                                  type="time"
                                                  id="time"
                                                  name="time"
                                                  placeholder="Days"
                                                  class="pl-[20px] h-[47px] rounded-full font-nunito focus:outline-none focus:border-none md:text-desktopText"/>
                                            </div>
                                            <div class="flex flex-col font-nunito px-[20px]">
                                                <label for="description" class="-ml-[8px] pb-[5px] font-bold font-nunito px-2 xs:text-white">
                                                Short description
                                                  <i
                                                    class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                  ></i>
                                                </label>
                                                <input
                                                  type="description"
                                                  id="description"
                                                  name="description"
                                                  placeholder="Salat"
                                                  maxlength="80"
                                                  class="pl-[20px] h-[47px] rounded-full font-nunito focus:outline-none focus:border-none md:text-desktopText"/>
                                            </div>
                                            <div class="flex flex-col font-nunito px-[20px]">
                                                <label for="image" class="-ml-[8px] pb-[5px] font-bold font-nunito px-2 xs:text-white">
                                                Images
                                                  <i
                                                    class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                  ></i>
                                                </label>
                                                <input
                                                  type="image"
                                                  id="image"
                                                  name="image"
                                                  placeholder="images.jpg"
                                                  maxlength="5"
                                                  class="pl-[20px] h-[47px] rounded-full font-nunito focus:outline-none focus:border-none md:text-desktopText"/>
                                            </div>
                                            <div class="flex flex-col font-nunito px-[20px]">
                                                <label for="description" class="-ml-[8px] pb-[5px] font-bold font-nunito px-2 xs:text-white">
                                                Detailed description
                                                  <i
                                                    class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                  ></i>
                                                </label>
                                                <input
                                                  type="detailed"
                                                  id="detailed"
                                                  name="detailed"
                                                  placeholder="Eating healthy"
                                                  maxlength="200"
                                                  class="pl-[20px] h-[47px] rounded-full font-nunito focus:outline-none focus:border-none md:text-desktopText"/>
                                            </div>
                                            <div class="flex flex-col align-middle justify-center m-auto">
                                              <button
                                                type="submit"
                                                id="postButton"
                                                class="font-nunito w-[240px] h-[60px] font-bold rounded-full text-darkerYellow bg-yellow text-mobileButton xs:w-[280px] md:mt-4 md:w-[530px] md:h-[74px] md:text-desktopButton hover:border hover:text-opacity-90"
                                              >
                                                Post
                                              </button>
                                              <button
                                                id="cancelButton"
                                                class="font-nunito my-[20px] w-[240px] h-[60px] font-bold rounded-full text-darkerYellow bg-yellow text-mobileButton xs:w-[280px] md:mt-4 md:w-[530px] md:h-[74px] md:text-desktopButton hover:border hover:text-opacity-90"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </fieldset>
                                        </form>
                                      </div>
                                    <div>`;
  });
}
