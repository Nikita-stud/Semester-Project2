import { loadLocalStorage } from "../auth/loadLocalStorage.mjs";
import { checkIfLoggedIn } from "../../ui/auth/checkIfLoggedIn.mjs";
import { displayBidAndHistory } from "../../ui/auth/displayBidAndHistory.mjs";
import { cleanApiTitle } from "../../ui/helpers/cleanApiTitle.mjs";
import { transformTime } from "../../ui/helpers/transformTime.mjs";
import { createUnderline } from "../../ui/helpers/createUnderline.mjs";

export function createPost(post, profile) {
  const articleContainer = document.getElementById("articleContainer");
  const upperDesktopContainer = document.createElement("div");
  upperDesktopContainer.classList.add(
    "flex",
    "flex-col-reverse",
    "md:flex-row",
    "md:justify-start",
    "md:gap-[20px]"
  );

  const upperTextContainer = document.createElement("div");
  upperTextContainer.classList.add("flex", "flex-col", "md:flex-1");

  const h1 = document.createElement("h1");
  const cleanTitle = cleanApiTitle(post.title);
  h1.innerText = cleanTitle.toUpperCase();
  h1.classList.add(
    "text-mobileButton",
    "flex",
    "items-center",
    "mr-[20px]",
    "break-words",
    "line-clamp-1",
    "text-ellipsis",
    "xs:text-mobileSecondaryHeader",
    "mob:text-mobileMainHeader",
    "font-garamond",
    "lg:text-desktopMainHeader"
  );

  const time = document.createElement("p");
  time.classList.add(
    "text-mobileText",
    "text-redTime",
    "pt-[5px]",
    "font-bold",
    "lg:text-desktopText"
  );
  const apiDate = new Date(post.endsAt);
  const date = transformTime(apiDate);
  const isExpired = new Date(post.endsAt) < new Date();
  const { day, month, year, hours, min } = date;
  if (!isExpired) {
    time.innerText = `Ends on: ${day}/${month}/${year}, ${hours}:${min}`;
  } else {
    time.innerText = `Expired on: ${day}/${month}/${year}`;
  }

  const priceAndBidsContainer = document.createElement("div");
  priceAndBidsContainer.classList.add("flex", "justify-between", "mt-[18px]");

  const price = document.createElement("p");
  price.classList.add(
    "text-mobileButton",
    "line-clamp-2",
    "text-dark",
    "overflow-hidden",
    "text-ellipsis",
    "font-bold",
    "flex",
    "items-center",
    "lg:text-desktopButton"
  );
  const highestBid =
    post.bids.length > 0
      ? Math.max(...post.bids.map((bid) => bid.amount))
      : "No bids";
  price.innerText = `CR ${highestBid}`;

  const bids = document.createElement("p");
  bids.classList.add(
    "text-mobileButton",
    "line-clamp-2",
    "text-dark",
    "overflow-hidden",
    "text-ellipsis",
    "flex",
    "items-center",
    "lg:text-desktopButton"
  );
  bids.innerHTML = `<i class="fa-solid fa-chevron-left text-mobileText"></i>${post.bids.length} bids<i class="fa-solid fa-chevron-right text-mobileText"></i>`;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add(
    "grid",
    "grid-cols-2",
    "gap-[20px]",
    "w-full",
    "md:w-auto",
    "md:grid-cols-[300px_90px]",
    "md:grid-rows-[auto_auto_auto_auto]",
    "xl:md:grid-cols-[677px_145px]"
  );

  const mainImg = document.createElement("img");
  mainImg.classList.add(
    "mt-[20px]",
    "rounded-md",
    "w-full",
    "h-[276px]",
    "object-center",
    "object-cover",
    "overflow-hidden",
    "col-span-2",
    "md:border",
    "md:mt-[0px]",
    "md:rounded-[16px]",
    "md:h-full",
    "md:max-w-[667px]",
    "md:row-span-4",
    "md:col-span-1",
    "xl:h-[667px]"
  );
  const mainImgContent = post.media[0]?.url
    ? post.media[0].url
    : "../../images/no-img.png";
  mainImg.src = mainImgContent;
  mainImg.alt = post.media[0]?.alt || "Post image which is not described";
  imgContainer.append(mainImg);

  for (let i = 1; i < 5; i++) {
    const img = document.createElement("img");

    img.classList.add(
      "rounded-md",
      "w-full",
      "h-[132px]",
      "border",
      "object-cover",
      "object-center",
      "overflow-hidden",
      "md:rounded-[16px]",
      "md:h-[80px]",
      "md:w-[80px]",
      "xl:h-[140px]",
      "xl:w-[140px]"
    );

    const imgContent =
      post.media[i] && post.media[i]?.url
        ? post.media[i].url
        : "../../images/img-on-error.png";
    img.src = imgContent;
    img.alt = post.media[i]?.alt || "Post image which is not described";

    img.onerror = () => {
      img.src = "../../images/img-on-error.png";
      img.alt = "The image is not visible because of an error";
    };
    imgContainer.append(img);
  }
  const descriptionContainer = document.createElement("div");
  let descriptionOfPost = "None";
  if (post.description) {
    descriptionOfPost = post.description;
  }
  let tags = "None";
  if (post.tags.length > 0) {
    tags = post.tags;
  }
  descriptionContainer.innerHTML = `<p class="font-bold text-mobileButton lg:text-desktopSecondaryHeader">Description: <span class="font-light text-mobileText lg:text-desktopText">${descriptionOfPost}</span></p>
                                    <p class="font-bold text-mobileButton lg:text-desktopSecondaryHeader">Tags: <span class="font-light text-mobileText break-words lg:text-desktopText">${tags}</span></p>`;
  descriptionContainer.classList.add("mt-[20px]", "text-dark", "font-nunito");

  const sellerContainer = document.createElement("div");
  sellerContainer.classList.add(
    "overflow-hidden",
    "my-[20px]",
    "p-[10px]",
    "flex",
    "flex-col",
    "rounded-[20px]",
    "border",
    "border-grey",
    "bg-formWhite",
    "w-full",
    "h-full",
    "lg:p-[20px]"
  );
  const sellerProfileContainer = document.createElement("div");
  sellerProfileContainer.classList.add(
    "flex",
    "flex-col",
    "place-items-center",
    "mob:place-items-start",
    "mob:flex-row",
    "gap-[10px]"
  );

  const sellerProfileTextContainer = document.createElement("div");
  sellerProfileTextContainer.classList.add(
    "grid",
    "grid-cols",
    "place-items-center",
    "mob:place-items-start",
    "mt-[12px]",
    "lg:mt-[20px]"
  );

  const button = document.createElement("button");
  button.setAttribute("id", "bidNowId");
  button.classList.add(
    "h-[60px]",
    "w-[180px]",
    "xs:w-[240px]",
    "mob:w-[260px]",
    "m-auto",
    "my-[20px]",
    "rounded-full",
    "bg-yellow",
    "text-darkerYellow",
    "text-mobileButton",
    "font-bold",
    "grid",
    "place-content-center",
    "md:w-[240px]",
    "md:absolute",
    "md:top-[400px]",
    "lg:top-[400px]",
    "md:right-[50px]",
    "lg:text-desktopButton",
    "lg:right-[250px]",
    "xl:top-[400px]",
    "xl:right-[50px]",
    "2xl:top-[350px]"
  );
  const underline = createUnderline();
  underline.classList.add("hidden", "md:block");

  if (checkIfLoggedIn()) {
    const myProfileName = loadLocalStorage("UserName");
    if (post.seller.name === myProfileName) {
      button.innerText = "Your List";
    } else {
      button.innerText = "Bid Now";
    }
    button.addEventListener("click", () => {
      displayBidAndHistory(post, profile);
    });
  } else {
    button.innerText = "Login to Bid";
    button.addEventListener("click", () => {
      window.location.replace("/auth/login.html");
    });
  }

  const profileImg = document.createElement("img");
  profileImg.classList.add(
    "rounded-full",
    "w-[80px]",
    "h-[80px]",
    "object-cover",
    "overflow-hidden",
    "lg:w-[120px]",
    "lg:h-[120px]"
  );
  const profileDispImg = post.seller.avatar.url
    ? post.seller.avatar.url
    : "../../images/no-img.png";
  profileImg.src = profileDispImg;
  profileImg.alt = post.seller.avatar.alt || "Profile image not described";

  const name = document.createElement("p");
  name.classList.add("lg:text-desktopButton");
  name.innerText = post.seller.name;

  const email = document.createElement("p");
  email.classList.add(
    "text-grey",
    "break-words",
    "break-all",
    "lg:text-desktopText"
  );
  email.innerText = post.seller.email;

  const myDescription = document.createElement("p");
  myDescription.classList.add(
    "mt-[10px]",
    "text-dark",
    "font-nunito",
    "text-mobileText",
    "font-semibold",
    "lg:text-desktopText"
  );

  let description = post.seller.bio;
  if (!description) {
    description = "FarmersBid";
  }
  myDescription.innerHTML = `${post.seller.name} writes: <span class="font-normal lg:text-desktopText">${description}</span>`;

  sellerContainer.append(sellerProfileContainer);
  sellerProfileContainer.append(profileImg);
  sellerProfileContainer.append(sellerProfileTextContainer);
  sellerProfileTextContainer.append(name);
  sellerProfileTextContainer.append(email);
  sellerContainer.append(myDescription);

  articleContainer.append(upperDesktopContainer);
  upperDesktopContainer.append(imgContainer);
  upperDesktopContainer.append(upperTextContainer);
  upperTextContainer.append(h1);
  upperTextContainer.append(time);
  upperTextContainer.append(priceAndBidsContainer);
  priceAndBidsContainer.append(price);
  priceAndBidsContainer.append(bids);
  upperTextContainer.append(underline);
  articleContainer.append(descriptionContainer);
  articleContainer.append(button);
  articleContainer.append(sellerContainer);
}
