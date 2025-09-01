import { cleanApiTitle } from "../../ui/helpers/cleanApiTitle.mjs";
import { transformTime } from "../../ui/helpers/transformTime.mjs";

export function createPost(post) {
  const articleContainer = document.getElementById("articleContainer");
  console.log("THIS IS A SINGLE POST", post);

  const headerAndIconContainer = document.createElement("div");
  headerAndIconContainer.classList.add("flex", "justify-between");

  const h1 = document.createElement("h1");
  const cleanTitle = cleanApiTitle(post.title);
  h1.innerText = cleanTitle.toUpperCase();
  h1.classList.add(
    "flex",
    "items-center",
    "w-[200px]",
    "line-clamp-1",
    "text-ellipsis",
    "text-mobileMainHeader",
    "font-garamond"
  );

  const icon = document.createElement("i");
  icon.classList.add(
    "fa-regular",
    "fa-heart",
    "cursor-pointer",
    "p-[20px]",
    "bg-formWhite",
    "border",
    "rounded-md"
  );
  icon.addEventListener("click", () => {
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("text-redTime");
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
    "items-center"
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
    "items-center"
  );
  bids.innerHTML = `<i class="fa-solid fa-chevron-left text-mobileText"></i>${post.bids.length} bids<i class="fa-solid fa-chevron-right text-mobileText"></i>`;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("grid", "grid-cols-2", "gap-[20px]", "w-full");

  const mainImg = document.createElement("img");
  mainImg.classList.add(
    "mt-[20px]",
    "rounded-md",
    "w-full",
    "h-[276px]",
    "object-cover",
    "overflow-hidden",
    "col-span-2"
  );
  const mainImgContent =
    post.media[0] && post.media[0].url
      ? post.media[0].url
      : "../../images/no-img.png";
  mainImg.src = mainImgContent;
  mainImg.alt = post.media[0].alt || "Post image which is not described";
  imgContainer.append(mainImg);

  for (let i = 1; i < post.media.length; i++) {
    const img = document.createElement("img");

    img.classList.add(
      "rounded-md",
      "w-full",
      "h-[132px]",
      "object-cover",
      "overflow-hidden"
    );

    const imgContent =
      post.media[i] && post.media[i].url
        ? post.media[i].url
        : "../../images/no-img.png";
    img.src = imgContent;
    img.alt = post.media[i].alt || "Post image which is not described";

    img.onerror = () => {
      img.src = "../../images/no-img.png";
      img.alt = "The image is not visible";
    };
    imgContainer.append(img);
  }
  const descriptionContainer = document.createElement("div");
  descriptionContainer.innerHTML = `<p class="font-bold text-mobileButton">Description: <span class="font-light text-mobileText">${post.description}</span></p>
                                    <p class="font-bold text-mobileButton">Tags: <span class="font-light text-mobileText">${post.tags}</span></p>`;
  descriptionContainer.classList.add("mt-[20px]", "text-dark", "font-nunito");

  const sellerContainer = document.createElement("div");
  sellerContainer.classList.add(
    "my-[20px]",
    "p-[10px]",
    "flex",
    "flex-col",
    "rounded-[20px]",
    "border",
    "border-grey",
    "bg-yellow",
    "w-full",
    "h-full"
  );
  const sellerProfileContainer = document.createElement("div");
  sellerProfileContainer.classList.add("flex", "gap-[10px]");

  const sellerProfileTextContainer = document.createElement("div");
  sellerProfileTextContainer.classList.add("flex", "flex-col", "mt-[12px]");

  const profileImg = document.createElement("img");
  profileImg.classList.add(
    "rounded-full",
    "w-[80px]",
    "h-[80px]",
    "object-cover",
    "overflow-hidden"
  );
  const profileDispImg = post.seller.avatar.url
    ? post.seller.avatar.url
    : "../../images/no-img.png";
  profileImg.src = profileDispImg;
  profileImg.alt = post.seller.avatar.alt || "Profile image not described";

  const name = document.createElement("p");
  name.innerText = post.seller.name;

  const email = document.createElement("p");
  email.classList.add("text-grey");
  email.innerText = post.seller.email;

  sellerContainer.append(sellerProfileContainer);
  sellerProfileContainer.append(profileImg);
  sellerProfileContainer.append(sellerProfileTextContainer);
  sellerProfileTextContainer.append(name);
  sellerProfileTextContainer.append(email);

  articleContainer.append(headerAndIconContainer);
  headerAndIconContainer.append(h1);
  headerAndIconContainer.append(icon);
  articleContainer.append(time);
  articleContainer.append(priceAndBidsContainer);
  priceAndBidsContainer.append(price);
  priceAndBidsContainer.append(bids);
  articleContainer.append(imgContainer);
  articleContainer.append(descriptionContainer);
  articleContainer.append(sellerContainer);
}
