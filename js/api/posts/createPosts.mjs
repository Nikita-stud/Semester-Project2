import { transformTime } from "../../ui/auth/helpers/transformTime.mjs";

export function createPosts(posts) {
  console.log("data", posts);
  const postsContainer = document.getElementById("posts_container");

  postsContainer.classList.add(
    "grid",
    "grid-flow-cols",
    "place-items-center",
    "grid-cols-1",
    "sm:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-[20px]",
    "p-[20px]"
  );

  for (let i = 0; i < posts.length; i++) {
    const article = document.createElement("article");
    article.classList.add(
      "w-[281px]",
      "h-[402px]",
      "flex",
      "flex-col",
      "border",
      "rounded-[20px]",
      "overflow-hidden",
      "shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
    );
    article.setAttribute("id", posts[i].id);

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("w-full", "h-[281px]", "overflow-hidden");

    const img = document.createElement("img");
    if (posts[i].media?.[0]?.url) {
      img.classList.add(
        "rounded-t-md",
        "w-full",
        "h-full",
        "object-cover",
        "overflow-hidden"
      );
      img.src = posts[i].media[0].url;
      img.alt = posts[i].media[0].alt || "Post image which is not described";
    } else {
      continue;
    }

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
    const capitalTitle = posts[i].title.toUpperCase();
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
      posts[i].bids.length > 0
        ? Math.max(...posts[i].bids.map((bid) => bid.amount))
        : 0;
    price.innerText = `CR ${highestBid}`;

    const time = document.createElement("p");
    time.classList.add(
      "text-mobileText",
      "text-redTime",
      "pt-[5px]",
      "font-bold"
    );
    const apiDate = new Date(posts[i].endsAt);
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
    cta.setAttribute("id", posts[i].id);
    cta.addEventListener("click", () => {
      window.location.href = `/post/?id=${article.id}`;
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
