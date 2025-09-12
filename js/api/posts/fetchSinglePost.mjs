import { API_POST } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
import { getQueryParam } from "../../events/helpers/getQueryParam.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function fetchSinglePost() {
  const postID = getQueryParam("id");
  if (!postID) {
    window.location.href = "/";
  }
  let jsonValue = {};
  try {
    const post = createAllowedRequest("GET");
    const fetched = await fetch(
      `${API_POST}/${postID}?&_bids=true&_seller=true`,
      post
    );
    const json = await fetched.json();
    jsonValue = json;
    if (!fetched.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed fetching the post");
    }
    return json;
  } catch (error) {
    catchAndDisplay("errorSinglePost", jsonValue, false);
  }
}
