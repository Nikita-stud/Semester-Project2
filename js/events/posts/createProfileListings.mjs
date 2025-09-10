import { transformTime } from "../../ui/helpers/transformTime.mjs";

export function createProfileListings(container, profileListings) {
  const existingContainer = container.querySelector(".listings");
  if (existingContainer) {
    existingContainer.remove();
    return;
  }
  const bidsContainer = document.createElement("div");
  container.insertAdjacentElement("beforeend", bidsContainer);
  bidsContainer.classList.add(
    "listings",
    "mt-[20px]",
    "w-full",
    "h-full",
    "flex",
    "flex-col",
    "gap-[20px]"
  );

  if (profileListings.length < 1) {
    const noPostsDiv = document.createElement("div");
    noPostsDiv.classList.add(
      "w-full",
      "h-[200px]",
      "p-[20px]",
      "grid",
      "place-content-center",
      "text-dark",
      "text-mobileButton",
      "font-bold",
      "rounded-[20px]",
      "bg-formWhite",
      "shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
    );
    noPostsDiv.innerText = "No Posts here";
    bidsContainer.append(noPostsDiv);
  }

  profileListings.forEach((bid) => {
    const div = document.createElement("div");
    div.classList.add(
      "pointer-cursor",
      "w-full",
      "h-[341px]",
      "p-[20px]",
      "flex",
      "flex-col",
      "rounded-[20px]",
      "bg-formWhite",
      "shadow-[0_1px_6px_rgba(0,0,0,0.25)]"
    );
    div.addEventListener("click", () => {
      window.location.replace(`/post/?id=${bid.id}`);
    });

    const header = document.createElement("h2");
    header.innerText = bid.title;
    header.classList.add(
      "text-mobileSecondaryHeader",
      "w-[180px]",
      "font-bold",
      "text-dark",
      "line-clamp-1",
      "overflow-hidden",
      "text-ellipsis"
    );

    const time = document.createElement("p");
    time.classList.add(
      "text-mobileText",
      "text-redTime",
      "pt-[5px]",
      "font-bold"
    );
    const apiDate = new Date(bid.endsAt);
    const date = transformTime(apiDate);
    const isExpired = new Date(bid.endsAt) < new Date();
    const { day, month, year, hours, min } = date;
    if (!isExpired) {
      time.innerText = `Ends on: ${day}/${month}/${year}, ${hours}:${min}`;
    } else {
      time.innerText = `Expired on: ${day}/${month}/${year}`;
    }

    const price = document.createElement("p");
    price.classList.add(
      "text-mobileText",
      "line-clamp-2",
      "text-dark",
      "overflow-hidden",
      "text-ellipsis",
      "font-bold",
      "flex",
      "items-center"
    );
    const highestBid =
      bid.bids && bid.bids.length > 0
        ? Math.max(...bid.bids.map((bid) => bid.amount))
        : "None";
    price.innerText = `Current bid CR ${highestBid}`;
    if (!isExpired) {
      price.innerText = `Current bid CR ${highestBid}`;
    } else if (highestBid === "None") {
      price.innerText = `No one placed a bid`;
    } else {
      price.innerText = `Final bid was CR ${highestBid}`;
    }

    const img = document.createElement("img");
    img.classList.add(
      "rounded-t-md",
      "object-content",
      "w-[150px]",
      "h-[150px]",
      "my-[5px]",
      "m-auto",
      "overflow-hidden"
    );
    if (bid.media.url) {
      img.classList.add("object-cover");
      img.classList.remove("object-content");
      img.src = bid.media.url;
      img.alt = bid.media.alt || "Post image which is not described";
    } else {
      img.src = "../../images/no-img.png";
      img.alt = "The is no image available";
    }
    img.onerror = () => {
      img.src = "../../images/img-on-error.png";
      img.alt = "The image is not visible because of an error";
    };

    const cta = document.createElement("button");
    cta.innerText = "See details";
    cta.classList.add(
      "m-auto",
      "w-[208px]",
      "h-[47px]",
      "grid",
      "place-content-center",
      "rounded-[20px]",
      "bg-yellow",
      "text-mobileButton",
      "font-nunito",
      "text-darkerYellow"
    );

    bidsContainer.append(div);
    div.append(header);
    div.append(time);
    div.append(price);
    div.append(img);
    div.append(cta);
  });

  return bidsContainer;
}
