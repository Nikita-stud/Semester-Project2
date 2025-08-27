import { transformTime } from "../../ui/helpers/transformTime.mjs";

export function createPosts(posts) {
  posts.sort((a, b) => new Date(b.created) - new Date(a.created));
  const filteredIfExpired = posts.filter(
    (post) => new Date(post.endsAt) > new Date()
  );

  const postsContainer = document.getElementById("posts_container");
  postsContainer.classList.add(
    "relative",
    "grid",
    "grid-flow-cols",
    "place-items-center",
    "grid-cols-1",
    "sm:grid-cols-2",
    "lg:grid-cols-3",
    "xl:grid-cols-4",
    "gap-[20px]",
    "px-[20px]",
    "pt-[20px]",
    "pb-[90px]"
  );

  let currentLimit = 10;
  let plusTen = 10;
  createPostsArticles(filteredIfExpired.slice(0, currentLimit));

  const loadMore = document.createElement("button");
  loadMore.innerHTML = "Load More";
  loadMore.classList.add(
    "absolute",
    "bottom-0",
    "left-1/2",
    "right-1/2",
    "-translate-x-1/2",
    "right-0",
    "w-[280px]",
    "h-[60px]",
    "m-auto",
    "bg-yellow",
    "text-darkerYellow",
    "text-mobileButton",
    "rounded-full",
    "hover:border",
    "hover:text-opacity-90"
  );

  loadMore.addEventListener("click", () => {
    currentLimit += plusTen;
    const addedPosts = filteredIfExpired.slice(0, currentLimit);

    postsContainer.innerHTML = "";
    createPostsArticles(addedPosts);
    postsContainer.append(loadMore);
  });

  function createPostsArticles(filtered) {
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
        img.alt =
          filtered[i].media[0].alt || "Post image which is not described";
      } else {
        img.src = "../../images/no-img.png";
        img.alt = "The is no image available";
      }
      img.onerror = () => {
        img.src = "../../images/no-img.png";
        img.alt = "The image is not visible";
      };

      const icon = document.createElement("i");
      icon.classList.add(
        "fa-regular",
        "fa-heart",
        "absolute",
        "top-[15px]",
        "right-[15px]",
        "cursor-pointer",
        "p-[10px]",
        "bg-formWhite",
        "text-mobileButton",
        "rounded-md"
      );
      icon.addEventListener("click", () => {
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
        icon.classList.toggle("text-redTime");
      });

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
      imgContainer.append(icon);
      article.append(textDiv);
      textDiv.append(insideTitlePriceDiv);
      insideTitlePriceDiv.append(title);
      insideTitlePriceDiv.append(price);
      textDiv.append(time);
      article.append(lowerContent);
      lowerContent.append(cta);
    }
  }
  postsContainer.append(loadMore);
}
