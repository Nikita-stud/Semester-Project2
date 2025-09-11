import { transformTime } from "../../ui/helpers/transformTime.mjs";

export function createPostsArticles(filtered) {
  const postsContainer = document.getElementById("posts_container");

  for (let i = 0; i < filtered.length; i++) {
    const article = document.createElement("article");
    article.classList.add(
      "relative",
      "w-[281px]",
      "h-[402px]",
      "flex",
      "flex-col",
      "border",
      "rounded-[20px]",
      "overflow-hidden",
      "shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
    );
    article.setAttribute("id", filtered[i].id);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("w-full", "h-[291px]", "overflow-hidden");

    const img = document.createElement("img");
    img.classList.add(
      "rounded-t-md",
      "object-content",
      "w-full",
      "h-full",
      "overflow-hidden"
    );
    if (filtered[i].media?.[0]?.url) {
      img.classList.add("object-cover");
      img.classList.remove("object-content");
      img.src = filtered[i].media[0].url;
      img.alt = filtered[i].media[0].alt || "Post image which is not described";
    } else {
      img.src = "../../images/no-img.png";
      img.alt = "The is no image available";
    }
    img.onerror = () => {
      img.src = "../../images/img-on-error.png";
      img.alt = "The image is not visible because of an error";
    };

    const textDiv = document.createElement("div");
    textDiv.classList.add(
      "h-[101px]",
      "px-[10px]",
      "py-[15px]",
      "flex",
      "flex-col"
    );

    const insideTitlePriceDiv = document.createElement("div");
    insideTitlePriceDiv.classList.add("flex", "justify-between");

    const title = document.createElement("h2");
    title.classList.add(
      "text-mobileButton",
      "w-[180px]",
      "font-bold",
      "text-grey",
      "line-clamp-1",
      "overflow-hidden",
      "text-ellipsis"
    );
    const capitalTitle = filtered[i].title.toUpperCase();
    title.innerText = capitalTitle;

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
      filtered[i].bids.length > 0
        ? Math.max(...filtered[i].bids.map((bid) => bid.amount))
        : "None";
    price.innerText = `CR ${highestBid}`;

    const time = document.createElement("p");
    time.classList.add(
      "text-mobileText",
      "text-redTime",
      "pt-[5px]",
      "font-bold"
    );
    const apiDate = new Date(filtered[i].endsAt);
    const date = transformTime(apiDate);

    const { day, month, year, hours, min } = date;
    time.innerText = `${day}/${month}/${year}, ${hours}:${min}`;

    const lowerContent = document.createElement("div");
    lowerContent.classList.add(
      "w-full",
      "pb-[15px]",
      "grid",
      "place-items-center"
    );

    const cta = document.createElement("button");
    cta.innerHTML = "View";
    cta.setAttribute("id", filtered[i].id);
    cta.addEventListener("click", () => {
      window.location.replace(`/post/?id=${article.id}`);
    });
    cta.classList.add(
      "w-[208px]",
      "h-[47px]",
      "bg-yellow",
      "text-darkerYellow",
      "text-mobileButton",
      "rounded-full",
      "hover:border",
      "hover:text-opacity-90"
    );

    postsContainer.append(article);
    article.append(imgContainer);
    imgContainer.append(img);
    article.append(textDiv);
    textDiv.append(insideTitlePriceDiv);
    insideTitlePriceDiv.append(title);
    insideTitlePriceDiv.append(price);
    textDiv.append(time);
    article.append(lowerContent);
    lowerContent.append(cta);
  }
}
