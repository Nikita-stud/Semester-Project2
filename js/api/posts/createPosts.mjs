// import { generateUniqueId } from "../../events/helpers/generateUniqueID.mjs";

export function createPosts(posts) {
  console.log("data", posts);
  const postsContainer = document.getElementById("posts_container");

  for (let i = 0; i < posts.length; i++) {
    const article = document.createElement("article");
    article.classList.add(
      "p-10",
      "w-100",
      "bg-slate-50",
      "shadow-md",
      "rounded-xl"
    );
    article.setAttribute("id", posts[i].id);

    const title = document.createElement("h2");
    title.classList.add("text-mobileSecondaryHeader");
    const capitalTitle = posts[i].title.toUpperCase();
    title.innerText = capitalTitle;

    const img = document.createElement("img");
    if (posts[i].media && posts[i].media.url) {
      img.classList.add(
        "w-full",
        "mb-4",
        "h-100",
        "m-auto",
        "object-cover",
        "bg-no-repeat"
      );
      img.src = posts[i].media.url;
      img.alt = posts[i].media.alt || "Post image which is not described";
    }

    postsContainer.append(article);
    article.append(img);
    article.append(title);
  }
}
