const postOwnBidCta = document.getElementById("postOwnBidButton");

export function checkToPostOwnList() {
  postOwnBidCta.innerText = "Login to post";
  postOwnBidCta.addEventListener("click", () => {
    window.location.href = "/auth/login.html";
  });
}
