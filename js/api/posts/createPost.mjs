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
  imgContainer.classList.add("grid", "grid-col-3", "gap-[2opx]");

  // for (let i = 0; i < 6; i++) {
  //   const img = document.createElement("img");
  //   img.classList.add(
  //     "rounded-md",
  //     "w-[100px]",
  //     "h-[100px]",
  //     "object-cover",
  //     "overflow-hidden"
  //   );
  //   const imgContent =
  //     post.media[i] > 0 ? post.media[i].url : "../../images/no-img.png";
  //   img.src = imgContent;
  //   img.alt = post.media[i].alt || "Post image which is not described";

  //   // if (post.media[i]) {
  //   //   img.src = post.media[i].url;
  //   //   img.alt = post.media[i].alt;
  //   // } else {
  //   //   img.src = "../../images/no-img.png";
  //   //   img.alt = "No image available";
  //   // }
  //   imgContainer.append(img);
  // }

  articleContainer.append(headerAndIconContainer);
  headerAndIconContainer.append(h1);
  headerAndIconContainer.append(icon);
  articleContainer.append(time);
  articleContainer.append(priceAndBidsContainer);
  priceAndBidsContainer.append(price);
  priceAndBidsContainer.append(bids);
  articleContainer.append(imgContainer);
}
