import { loadLocalStorage } from "../../events/auth/loadLocalStorage.mjs";

export function checkIfLoggedIn() {
  const profile = loadLocalStorage("UserName");
  const token = loadLocalStorage("token");
  if (profile && token) {
    return true;
  }
}
