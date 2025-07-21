import { loginUser } from "../../api/auth/loginUser.mjs";
import { registerUser } from "../../api/auth/registerUser.mjs";

export function formHandler(formID, pathName, buttonID) {
  const formRegister = document.querySelector(`${formID}`);
  const cta = document.querySelector(`${buttonID}`);

  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());

    if (pathName === "/auth/register.html" || pathName === "auth/register") {
      cta.innerText = "Submitting...";
      registerUser(entries);
    }
    if (pathName === "/auth/login.html" || pathName === "auth/login") {
      loginUser(entries);
    }
  });
}
