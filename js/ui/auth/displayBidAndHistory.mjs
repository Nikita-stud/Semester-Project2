import { formHandler } from "../../events/auth/formHandler.mjs";
import { loadLocalStorage } from "../../events/auth/loadLocalStorage.mjs";
import { createUnderline } from "../helpers/createUnderline.mjs";
import { transformTime } from "../helpers/transformTime.mjs";

export function displayBidAndHistory(post, profile) {
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
    "bg-dark",
  );
  overlayContainer.addEventListener("click", (e) => {
    if (e.target === overlayContainer) {
      articleContainer.removeChild(overlayContainer);
    }
  });

  const container = document.createElement("div");
  container.classList.add(
    "min-w-[200px]",
    "bg-white",
    "rounded-[20px]",
    "font-nunito",
    "p-[20px]",
    "h-auto",
    "max-w-[280px]",
    "xs:min-w-[240px]",
    "absolute",
    "top-1/2",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "max-h-[90vh]",
    "overflow-y-auto",
    "lg:max-w-[600px]",
    "lg:min-w-[506px]",
  );
  const bidTitle = document.createElement("h3");
  bidTitle.classList.add(
    "text-mobileButton",
    "font-bold",
    "lg:text-desktopButton",
  );
  bidTitle.innerText = "Place bid";

  const icon = document.createElement("i");
  icon.classList.add(
    "cursor-pointer",
    "fa-solid",
    "fa-xmark",
    "right-[15px]",
    "absolute",
    "top-[18px]",
    "xs:right-[20px]",
    "text-desktopSecondaryHeader",
    "text-grey",
  );
  icon.addEventListener("click", () => {
    articleContainer.removeChild(overlayContainer);
  });

  const time = document.createElement("p");
  time.classList.add(
    "text-mobileText",
    "text-redTime",
    "pt-[5px]",
    "font-bold",
    "lg:text-desktopText",
  );
  const apiDate = new Date(post.endsAt);
  const date = transformTime(apiDate);
  const { day, month, year, hours, min } = date;
  time.innerText = `Ends on: ${day}/${month}/${year}, ${hours}:${min}`;

  const creditsAvailable = document.createElement("p");
  creditsAvailable.classList.add(
    "text-mobileText",
    "text-dark",
    "pt-[5px]",
    "lg:text-desktopText",
  );
  creditsAvailable.innerHTML = `Available credits: <span class="font-bold underline underline-offset-1">CR ${profile.credits}</span>`;

  const upperUnderline = createUnderline();
  const middleUnderline = createUnderline();
  const lowerUnderline = createUnderline();

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add(
    "flex",
    "flex-col",
    "justify-center",
    "align-middle",
    "items-center",
    "gap-[20px]",
    "my-[20px]",
    "lg:flex-row",
  );

  const bidAmount = ["100", "500", "1000"];
  bidAmount.forEach((amount) => {
    const button = document.createElement("button");
    button.classList.add(
      "w-[150px]",
      "h-[47px]",
      "font-bold",
      "rounded-full",
      "text-darkerYellow",
      "bg-yellow",
      "text-mobileButton",
      "xs:w-[208px]",
      "md:text-desktopButton",
      "hover:border",
      "hover:text-opacity-90",
    );
    button.innerText = amount;
    button.setAttribute("id", `${amount}`);

    button.addEventListener("click", (e) => {
      e.preventDefault();

      const bidInput = document.getElementById("addBid");
      bidInput.value = `${amount}`;
    });

    buttonDiv.append(button);
  });

  const lowerDiv = document.createElement("div");
  lowerDiv.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "lg:justify-start",
  );

  const howMuchToBid = document.createElement("p");
  howMuchToBid.classList.add(
    "text-mobileText",
    "text-grey",
    "pt-[5px]",
    "lg:text-desktopText",
  );

  const highestBid =
    post.bids.length > 0
      ? Math.max(...post.bids.map((bid) => bid.amount))
      : "1";
  howMuchToBid.innerText = `Bid more than CR ${highestBid}`;

  const form = document.createElement("form");
  form.classList.add("flex", "flex-col", "items-center", "w-full");
  form.setAttribute("id", "placeBidForm");
  form.innerHTML = `
                    <div class="hidden p-[14px] bg-formWhite border mt-[10px] text-redTime border-redTime md:text-mobileButton w-full break-word overflow-wrap-anywhere lg:text-desktopText" >
                      <p id="errorOnBid" class="flex justify-center break-words">
                      </p>
                    </div>
                    <label for="addBid" class="hidden">Hidden</label>
                    <input
                      type="number"
                      id="addBid"
                      name="addBid"
                      placeholder="CR..."
                      class="text-center pr-1 w-full my-[10px] h-[60px] bg-formWhite rounded-full border border-dark font-light text-grey no-clear-button lg:text-desktopText"/>
                    <button
                      type="submit"
                      id="placeBidButton"
                      class="w-[150px] my-2 h-[47px] font-bold rounded-full text-darkerYellow bg-yellow text-mobileButton xs:w-[208px] md:text-desktopButton hover:border hover:text-opacity-90 lg:h-[60px]"
                    >
                      Place bid
                    </button>`;

  const viewBiddingContainer = document.createElement("div");
  viewBiddingContainer.classList.add(
    "text-mobileText",
    "text-dark",
    "pt-[20px]",
  );

  viewBiddingContainer.innerHTML = `<p id="closeBidDiv" class="flex justify-end gap-[20px]">View bidding history
                                        <i
                                          class="fa-solid fa-chevron-down text-mobileSecondaryHeader cursor-pointer text-black"
                                        ></i>
                                    </p>`;

  const allBids = post.bids;
  const sortedBids = allBids.sort((a, b) => b.amount - a.amount);

  const yourUser = loadLocalStorage("UserName");
  const lastBid = sortedBids[0];
  const isLastBidMine = lastBid && lastBid.bidder.name === yourUser;
  const myProfileName = loadLocalStorage("UserName");
  const isItMyPost = post.seller.name === myProfileName;

  if (isLastBidMine || isItMyPost) {
    if (isItMyPost) {
      bidTitle.innerText = "Your listing";
    } else {
      bidTitle.innerText = "Your bid was";
    }
    let bidAmt = "";
    if (sortedBids.length === 0 || !lastBid.amount) {
      bidAmt = "None";
    } else {
      bidAmt = lastBid.amount;
    }
    upperUnderline.style.display = "none";
    creditsAvailable.innerText = "Good luck!";
    buttonDiv.innerHTML = "";
    buttonDiv.classList.remove("my-[20px]");
    howMuchToBid.innerText = "";
    form.innerHTML = `<div class="mt-[20px] py-[20px] text-mobileButton grid grid-flow-rows place-content-center border border-green w-full text-green font-bold lg:text-desktopText"><span class="flex justify-center">CR ${bidAmt}</span></div>`;
  }

  viewBiddingContainer.addEventListener("click", () => {
    const closeBidDiv = document.getElementById("closeBidDiv");

    const isHistoryOpen = viewBiddingContainer.querySelector(".special-item");

    if (isHistoryOpen) {
      closeBidDiv.innerHTML = `<p id="closeBidDiv" class="flex justify-end gap-[20px] lg:text-desktopText">View bidding history
                                        <i
                                          class="fa-solid fa-chevron-down text-mobileSecondaryHeader cursor-pointer text-black"
                                        ></i>
                                    </p>`;
      const bidItem = viewBiddingContainer.querySelectorAll(".special-item");
      bidItem.forEach((item) => item.remove());
    } else {
      if (sortedBids.length === 0) {
        closeBidDiv.innerHTML = `<div class=" text-grey text-mobileText lg:text-desktopText">No bidding history available</div>`;
      } else {
        closeBidDiv.innerHTML = `Close bidding history
                                        <i
                                          class="fa-solid fa-chevron-up text-mobileSecondaryHeader cursor-pointer text-black"
                                        ></i>`;
        sortedBids.forEach((bid) => {
          const mainDiv = document.createElement("div");
          mainDiv.classList.add("special-item");
          const div = document.createElement("div");
          div.classList.add(
            "mt-[10px]",
            "flex",
            "gap-[20px]",
            "align-middle",
            "lg:justify-center",
          );

          const img = document.createElement("img");
          img.classList.add(
            "rounded-full",
            "w-[40px]",
            "h-[40px]",
            "object-cover",
            "overflow-hidden",
            "xs:w-[80px]",
            "xs:h-[80px]",
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
            "items-center",
          );

          const name = document.createElement("p");
          name.classList.add(
            "overflow-hidden",
            "whitespace-nowrap",
            "text-ellipsis",
            "max-w-[100px]",
            "lg:text-desktopText",
            "lg:max-w-[150px]",
          );
          name.innerText = bid.bidder.name;

          const amount = document.createElement("p");
          amount.classList.add(
            "text-grey",
            "truncate",
            "lg:text-desktopText",
            "lg:max-w-[150px]",
          );
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

  if (form) {
    const pathName = window.location.pathname;
    formHandler("#placeBidForm", pathName, "#placeBidButton");
  }
}
