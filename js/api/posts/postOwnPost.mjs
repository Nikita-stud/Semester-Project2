const postButton = document.getElementById("postOwnBidButton");
const landingContainer = document.getElementById("landingContainer");

export function postOwnPost() {
  postButton.addEventListener("click", () => {
    landingContainer.classList.remove("bg-mobileSheep", "w-full", "h-[477px]");
    landingContainer.classList.add("px-[20px]", "bg-green", "rounded-[20px]");
    landingContainer.innerHTML = `  <h1 class="text-mobileMainHeader font-garamond font-bold text-white p-[20px]">
                                       Fill in the basic information about your item
                                    </h1>
                                    <div class="mt-[20px]"
                                      <form id="registerForm">
                                        <fieldset id="fieldset" class="flex flex-col gap-[20px]">
                                          <div class="flex flex-col font-nunito">
                                              <label for="product" class="ml-8 font-bold px-2 xs:text-white md:text-desktopText md:ml-14 md:px-4">
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
                                                class="ml-10 focus:outline-none focus:border-none md:text-desktopText md:ml-[72px]"
                                              />
                                          </div>
                                          <div class="flex flex-col font-nunito">
                                              <label for="price" class="ml-8 font-bold px-2 xs:text-white md:text-desktopText md:ml-14 md:px-4">
                                              Starting price
                                                <i
                                                  class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                ></i></label>
                                              <input
                                                type="price"
                                                id="price"
                                                name="price"
                                                placeholder="CR"
                                                class="ml-10 focus:outline-none focus:border-none md:text-desktopText md:ml-[72px]"
                                              />
                                          </div>
                                          <div class="flex flex-col font-nunito">
                                              <label for="time" class="ml-8 font-bold px-2 xs:text-white md:text-desktopText md:ml-14 md:px-4">
                                                Time allowed to bid                    
                                                <i
                                                  class="fa-solid fa-asterisk text-[10px] absolute ml-1"
                                                ></i></label>
                                              <input
                                                type="time"
                                                id="time"
                                                name="time"
                                                placeholder="Days"
                                                class="ml-10 focus:outline-none focus:border-none md:text-desktopText md:ml-[72px]"
                                              />
                                          </div>
                                          <div class="flex flex-col font-nunito">
                                              <label for="description" class="ml-8 font-bold px-2 xs:text-white md:text-desktopText md:ml-14 md:px-4">
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
                                                class="ml-10 focus:outline-none focus:border-none md:text-desktopText md:ml-[72px]"
                                              />
                                          </div>
                                         <div class="flex flex-col font-nunito">
                                              <label for="image" class="ml-8 font-bold px-2 xs:text-white md:text-desktopText md:ml-14 md:px-4">
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
                                                class="ml-10 focus:outline-none focus:border-none md:text-desktopText md:ml-[72px]"
                                              />
                                          </div>
                                          <div class="flex flex-col font-nunito">
                                              <label for="detailed" class="ml-8 font-bold px-2 xs:text-white md:text-desktopText md:ml-14 md:px-4">
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
                                                class="ml-10 focus:outline-none focus:border-none md:text-desktopText md:ml-[72px]"
                                              />
                                          </div>
                                          <div class="flex flex-col align-middle justify-center m-auto">
                                            <button
                                              type="submit"
                                              id="postButton"
                                              class="my-2 w-[240px] h-[60px] font-bold rounded-full text-darkerYellow bg-yellow text-mobileButton xs:w-[280px] md:mt-4 md:w-[530px] md:h-[74px] md:text-desktopButton hover:border hover:text-opacity-90"
                                            >
                                              Post
                                            </button>
                                            <button
                                              id="cancelButton"
                                              class="my-2 w-[240px] h-[60px] font-bold rounded-full text-darkerYellow bg-yellow text-mobileButton xs:w-[280px] md:mt-4 md:w-[530px] md:h-[74px] md:text-desktopButton hover:border hover:text-opacity-90"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </fieldset>
                                      </form>
                                    </div>`;
  });
}
