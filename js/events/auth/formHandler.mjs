import { loginUser } from "../../api/auth/loginUser.mjs";
import { registerUser } from "../../api/auth/registerUser.mjs";
import { sendUpdatedProfile } from "../../api/helpers/sendUpdatedProfile.mjs";
import { postOwnPost } from "../../api/posts/postOwnPost.mjs";

export function formHandler(formID, pathName, buttonID) {
  const formRegister = document.querySelector(`${formID}`);
  const cta = document.querySelector(`${buttonID}`);

  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const formFile = new FormData(formRegister);
    const entries = Object.fromEntries(formFile);

    console.log("Inputs from Form", entries);

    if (pathName === "/auth/register.html" || pathName === "/auth/register") {
      cta.innerText = "Submitting...";
      registerUser(entries);
    }
    if (pathName === "/auth/login.html" || pathName === "/auth/login") {
      loginUser(entries);
    }
    if (pathName === "/index.html" || pathName === "/") {
      cta.innerText = "Creating...";
      postOwnPost(entries);
    }
    if (pathName === "/profile/edit/index.html") {
      cta.innerText = "Saving...";
      sendUpdatedProfile(entries);
    }
  });
}
