import { createUnderline } from "../helpers/createUnderline.mjs";
import { transformTime } from "../helpers/transformTime.mjs";

export function displayBidAndHistory(post, profile) {
  console.log("post", post);
  console.log("postSeller", profile);

  const articleContainer = document.getElementById("articleContainer");
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add(
    "cursor-pointer",
    "fixed",
    "inset-0",
    "bg-opacity-50",
    "w-screen",
    "h-screen",
    "z-20",
    "bg-dark"
  );
  overlayContainer.addEventListener("click", (e) => {
    if (e.target === overlayContainer) {
      articleContainer.removeChild(overlayContainer);
    }
  });

  const container = document.createElement("div");
  container.classList.add(
    "bg-white",
    "rounded-[20px]",
    "font-nunito",
    "p-[20px]",
    "mx-[20px]",
    "h-auto",
    "w-auto",
    "absolute",
    "top-10",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "max-h-[90vh]",
    "overflow-y-auto"
  );
  const bidTitle = document.createElement("h3");
  bidTitle.classList.add("text-mobileButton", "font-bold");
  bidTitle.innerText = "Place your bid";

  const icon = document.createElement("i");
  icon.classList.add(
    "cursor-pointer",
    "fa-solid",
    "fa-xmark",
    "absolute",
    "top-[20px]",
    "right-[20px]",
    "text-desktopSecondaryHeader",
    "text-grey"
  );
  icon.addEventListener("click", () => {
    articleContainer.removeChild(overlayContainer);
  });

  const time = document.createElement("p");
  time.classList.add(
    "text-mobileText",
    "text-redTime",
    "pt-[5px]",
    "font-bold"
  );
  const apiDate = new Date(post.endsAt);
  const date = transformTime(apiDate);
  const { day, month, year, hours, min } = date;
  time.innerText = `Ends on: ${day}/${month}/${year}, ${hours}:${min}`;

  const creditsAvailable = document.createElement("p");
  creditsAvailable.classList.add("text-mobileText", "text-dark", "pt-[5px]");
  creditsAvailable.innerHTML = `Available credits: <span class="font-bold underline underline-offset-1">CR ${profile.credits}</span>`;

  const upperUnderline = createUnderline();
  const middleUnderline = createUnderline();
  const lowerUnderline = createUnderline();

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("flex", "flex-col", "gap-[20px]", "my-[20px]");

  const bidAmount = ["Bid-100", "Bid-500", "Bid-1000"];
  bidAmount.forEach((amount) => {
    const button = document.createElement("button");
    button.classList.add(
      "w-[208px]",
      "h-[47px]",
      "font-bold",
      "rounded-full",
      "text-darkerYellow",
      "bg-yellow",
      "text-mobileButton",
      "md:text-desktopButton",
      "hover:border",
      "hover:text-opacity-90"
    );
    button.innerText = amount;
    button.setAttribute("id", `${amount}`);

    button.addEventListener("click", (e) => {
      e.preventDefault();

      const onlyNumber = amount.split("-")[1];
      const bidInput = document.getElementById("addBid");
      bidInput.value = `${onlyNumber}`;
    });

    buttonDiv.append(button);
  });

  const lowerDiv = document.createElement("div");
  lowerDiv.classList.add("flex", "flex-col", "items-center", "justify-center");

  const howMuchToBid = document.createElement("p");
  howMuchToBid.classList.add("text-mobileText", "text-grey", "pt-[5px]");

  const highestBid =
    post.bids.length > 0
      ? Math.max(...post.bids.map((bid) => bid.amount))
      : "1";
  howMuchToBid.innerText = `Bid more than CR ${highestBid}`;

  const form = document.createElement("form");
  form.classList.add("flex", "flex-col", "items-center", "w-full");
  form.setAttribute("id", "placeBidForm");
  form.innerHTML = `<label for="addBid" class="hidden">Hidden</label>
                    <input
                      type="text"
                      id="addBid"
                      name="addBid"
                      placeholder="CR..."
                      class="text-center pr-2 w-full my-[10px] h-[47px] bg-formWhite rounded-full border border-dark font-light text-grey no-clear-button"/>
                    <button
                      disabled="true"
                      type="submit"
                      id="placeBidButton"
                      class="my-2 w-[208px] h-[47px] font-bold rounded-full text-darkerYellow bg-yellow text-mobileButton md:text-desktopButton hover:border hover:text-opacity-90"
                    >
                      Place bid
                    </button>`;

  const viewBiddingContainer = document.createElement("div");
  viewBiddingContainer.classList.add(
    "text-mobileText",
    "text-dark",
    "pt-[20px]"
  );

  viewBiddingContainer.innerHTML = `<p id="closeBidDiv" class="flex justify-end gap-[20px]">View bidding history
                                        <i
                                          class="fa-solid fa-chevron-down text-mobileSecondaryHeader cursor-pointer text-black"
                                        ></i>
                                    </p>`;

  viewBiddingContainer.addEventListener("click", () => {
    const allBids = post.bids;
    const closeBidDiv = document.getElementById("closeBidDiv");

    const isHistoryOpen = viewBiddingContainer.querySelector(".special-item");

    if (isHistoryOpen) {
      closeBidDiv.innerHTML = `<p id="closeBidDiv" class="flex justify-end gap-[20px]">View bidding history
                                        <i
                                          class="fa-solid fa-chevron-down text-mobileSecondaryHeader cursor-pointer text-black"
                                        ></i>
                                    </p>`;
      const bidItem = viewBiddingContainer.querySelectorAll(".special-item");
      bidItem.forEach((item) => item.remove());
    } else {
      closeBidDiv.innerHTML = `Close bidding history
                                        <i
                                          class="fa-solid fa-chevron-up text-mobileSecondaryHeader cursor-pointer text-black"
                                        ></i>`;
      allBids.forEach((bid) => {
        const mainDiv = document.createElement("div");
        mainDiv.classList.add("special-item");
        const div = document.createElement("div");
        div.classList.add("mt-[10px]", "flex", "gap-[20px]", "align-middle");

        const img = document.createElement("img");
        img.classList.add(
          "rounded-full",
          "w-[80px]",
          "h-[80px]",
          "object-cover",
          "overflow-hidden"
        );
        const imgContent = bid.bidder.avatar.url
          ? bid.bidder.avatar.url
          : "../../images/no-img.png";
        img.src = imgContent;
        img.alt = bid.bidder.alt || "Profile image not described";

        img.onerror = () => {
          img.src = "../../images/img-on-error.png";
          img.alt = "The image is not visible because of an error";
        };

        const textDiv = document.createElement("div");
        textDiv.classList.add(
          "flex",
          "flex-col",
          "justify-center",
          "items-center"
        );

        const name = document.createElement("p");
        name.classList.add("truncate");
        name.innerText = bid.bidder.name;

        const amount = document.createElement("p");
        amount.classList.add("text-grey", "truncate");
        amount.innerText = `Bid CR ${bid.amount}`;

        const underline = createUnderline();

        mainDiv.append(div);
        div.append(img);
        div.append(textDiv);
        textDiv.append(name);
        textDiv.append(amount);
        mainDiv.append(underline);
        viewBiddingContainer.append(mainDiv);
      });
    }
  });

  articleContainer.append(overlayContainer);
  overlayContainer.append(container);
  container.append(bidTitle);
  container.append(icon);
  container.append(time);
  container.append(creditsAvailable);
  container.append(upperUnderline);
  container.append(buttonDiv);
  container.append(middleUnderline);
  container.append(lowerDiv);
  lowerDiv.append(howMuchToBid);
  lowerDiv.append(form);
  container.append(lowerUnderline);
  container.append(viewBiddingContainer);
}
