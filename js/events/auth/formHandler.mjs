import { loginUser } from "../../api/auth/loginUser.mjs";
import { registerUser } from "../../api/auth/registerUser.mjs";
import { sendBidToServer } from "../../api/helpers/sendBidToServer.mjs";
import { sendUpdatedProfile } from "../../api/helpers/sendUpdatedProfile.mjs";
import { postOwnPost } from "../../api/posts/postOwnPost.mjs";
import { displayErrorOnEditProfile } from "../../ui/auth/displayErrorOnEditProfile.mjs";

export function formHandler(formID, pathName, buttonID) {
  const formRegister = document.querySelector(`${formID}`);
  const cta = document.querySelector(`${buttonID}`);

  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formFile = new FormData(formRegister);
    const entries = Object.fromEntries(formFile);

    switch (true) {
      case pathName === "/auth/register.html" || pathName === "/auth/register":
        cta.innerText = "Submitting...";
        registerUser(entries);
        break;
      case pathName === "/auth/login.html" || pathName === "/auth/login":
        loginUser(entries);
        break;
      case pathName === "/index.html" || pathName === "/":
        cta.innerText = "Creating...";
        postOwnPost(entries);
        break;
      case pathName === "/post/":
        cta.innerText = "Placing bid...";
        sendBidToServer(entries);
        break;
      case pathName === "/profile/edit/index.html":
        cta.innerText = "Saving...";
        const isValid = await displayErrorOnEditProfile(entries);
        if (isValid) {
          await sendUpdatedProfile(entries);
        } else {
          cta.innerText = "Save";
        }
        break;
    }
  });
}
