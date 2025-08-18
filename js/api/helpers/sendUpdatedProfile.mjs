import { API_AUCTION } from "../../constants/constants.mjs";
import { createAllowedDataRequest } from "../../events/helpers/createAlloweddataRequest.mjs";

export async function sendUpdatedProfile(entries) {
  try {
    const { product, price, time, description, image } = postData;

    const bodyData = {
      avatar: { url: entries.image },
      description: description,
      endsAt: time,
      bids: [{ amount: price }],
      tags: [userName],
    };
    const fetchUpdate = createAllowedDataRequest("PUT");
    const response = await fetch(API_AUCTION, fetchUpdate);
    const json = await response.json();
    // jsonValue = json;
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    }
    // return json;
  } catch (error) {
    console.log(error);
    // catchAndDisplay("#posts_container", jsonValue.errors?.[0]?.message)
  }
}
