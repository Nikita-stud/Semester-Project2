import { API_KEY } from "../../constants/tokens.mjs";
import { loadLocalStorage } from "../auth/loadLocalStorage.mjs";

export function createAllowedDataRequest(method, data) {
  return {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loadLocalStorage("token")}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
    body: JSON.stringify(data),
  };
}
