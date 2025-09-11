import { createPosts } from "./createPosts.mjs";

export function filterPosts(posts) {
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("input", (e) => {
    const input = e.target.value.toLowerCase().trim();

    if (input === "") {
      createPosts(posts);
      return;
    }
    const filtered = posts.filter((post) => {
      const postTitle = post.title.toLowerCase().trim();
      return postTitle.includes(input);
    });

    createPosts(filtered);
  });
}
