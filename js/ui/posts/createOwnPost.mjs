export function createOwnPost() {
  const mainLandingContainer = document.getElementById("mainLandingContainer");
  const postOwnPostContainer = document.getElementById("postOwnPostContainer");
  const postButton = document.getElementById("postOwnBidButton");
  const landingContainer = document.getElementById("landingContainer");
  const cancelOwnCTA = document.getElementById("cancelOwnCTA");

  postButton.addEventListener("click", () => {
    mainLandingContainer.classList.toggle("hidden");
    postOwnPostContainer.classList.toggle("hidden");
    landingContainer.classList.remove("bg-mobileSheep", "w-full", "h-[477px]");
    landingContainer.classList.add("mx-[20px]", "bg-green", "rounded-[20px]");
  });
  cancelOwnCTA.addEventListener("click", () => {
    mainLandingContainer.classList.toggle("hidden");
    postOwnPostContainer.classList.toggle("hidden");
    landingContainer.classList.add("bg-mobileSheep", "w-full", "h-[477px]");
    landingContainer.classList.remove(
      "mx-[20px]",
      "bg-green",
      "rounded-[20px]"
    );
  });

  // let textId = "";
  // let productAmount = 0;

  // landingContainer.addEventListener("input", (e) => {
  //   textId = e.target;
  //   if (textId === product) {
  //     productAmount = textId.value.length;
  //   }
  //   console.log(productAmount);
  // });
}
