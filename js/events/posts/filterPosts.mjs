export function filterPosts(posts) {
  const searchForm = document.getElementById("searchForm");

  searchForm.addEventListener("input", (e) => {
    e.preventDefault();
    const input = e.target.value.toLowerCase().trim();

    const filtered = posts.filter((post) => {
      const postTitle = post.title.toLowerCase().trim();
      return postTitle.startsWith(input);
    });
    console.log(filtered);
  });
}
