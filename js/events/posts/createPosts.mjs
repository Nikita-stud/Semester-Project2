import { createPostsArticles } from "./createPostsArticles.mjs";

export function createPosts(posts) {
  const postsLoadingContainer = document.getElementById(
    "postsLoadingContainer"
  );
  if (postsLoadingContainer) {
    postsLoadingContainer.classList.add("hidden");
  }

  posts.sort((a, b) => new Date(b.created) - new Date(a.created));

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
  postsContainer.innerHTML = "";

  let currentLimit = 10;
  let plusTen = 10;
  createPostsArticles(posts.slice(0, currentLimit));

  if (posts.length > currentLimit) {
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
      const addedPosts = posts.slice(0, currentLimit);

      postsContainer.innerHTML = "";
      createPostsArticles(addedPosts);
      if (currentLimit >= posts.length) {
        loadMore.remove();
      } else {
        postsContainer.append(loadMore);
      }
    });
    postsContainer.append(loadMore);
  }
}
