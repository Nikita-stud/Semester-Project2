import { API_POST_TO_BID } from "../../constants/constants.mjs";
import { createAllowedDataRequest } from "../../events/helpers/createAlloweddataRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

/**
 *  Sends your bid to server by sending data
 * from a form to the server
 * @param {Object} entries -User Credit (addBid)
 */

export async function sendBidToServer(entries) {
  const placeBidButton = document.getElementById("placeBidButton");
  let jsonValue = {};

  try {
    const amountBid = entries.addBid;
    const turnStringToNumber = Number(amountBid);

    const bodyData = {};
    if (amountBid) {
      bodyData.amount = turnStringToNumber;
    }

    const postBid = createAllowedDataRequest("POST", bodyData);
    const response = await fetch(API_POST_TO_BID, postBid);
    const json = await response.json();
    jsonValue = json;

    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    } else {
      catchAndDisplay("errorOnBid", jsonValue, true);
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (error) {
    catchAndDisplay("errorOnBid", jsonValue, false);
  } finally {
    placeBidButton.innerText = "Place bid";
  }
}
