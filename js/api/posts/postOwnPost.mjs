import { API_POST } from "../../constants/constants.mjs";
import { loadLocalStorage } from "../../events/auth/loadLocalStorage.mjs";
import { createAllowedDataRequest } from "../../events/helpers/createAlloweddataRequest.mjs";
// import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function postOwnPost(postData) {
  // let jsonValue = {};
  const userName = loadLocalStorage("UserName");
  const { product, price, time, description, image } = postData;

  try {
    const bodyData = {
      title: product,
      description: description,
      endsAt: time,
      bids: [{ amount: price }],
      tags: [userName],
    };
    if (postData.image) {
      bodyData.media = {
        url: image,
      };
    }
    const fetchPosts = createAllowedDataRequest("POST", bodyData);
    const response = await fetch(API_POST, fetchPosts);
    const json = await response.json();
    // jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    } else {
      location.reload();
    }
  } catch (error) {
    console.log(error);
    // catchAndDisplay("#posts_container", jsonValue.errors?.[0]?.message)
  }
}
