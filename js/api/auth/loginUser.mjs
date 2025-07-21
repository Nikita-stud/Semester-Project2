import { API_LOGIN } from "../../constants/constants.mjs";
import { saveLocalStorage } from "../../events/auth/saveLocalStorage.mjs";
import { createPostRequest } from "../../events/helpers/createPostRequest.mjs";
// import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function loginUser(user) {
  const button = document.getElementById("loginButton");
  const fieldset = document.getElementById("fieldset");
  fieldset.disabled = true;
  button.innerText = "Logging in...";
  // let jsonValue = {};
  try {
    const postData = createPostRequest(user);
    const response = await fetch(API_LOGIN, postData);
    const json = await response.json();
    jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Login failed");
    }

    const token = json.data.accessToken;
    if (token) {
      console.log("login token is saved");
      saveLocalStorage("token", token);
      saveLocalStorage("email", user.email);
      document.location.href = "/index.html";
    }
  } catch (error) {
    console.log(error);
  } finally {
    fieldset.disabled = false;
    button.innerText = "LOGIN";
  }
}
