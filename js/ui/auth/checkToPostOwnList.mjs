export function checkToPostOwnList(buttonID, buttonText) {
  const postOwnBidCta = document.getElementById(`${buttonID}`);

  postOwnBidCta.innerText = `Login to ${buttonText}`;
  postOwnBidCta.addEventListener("click", () => {
    window.location.replace("/auth/login.html");
  });
}
