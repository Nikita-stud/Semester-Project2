import { createPost } from "../../api/posts/createPost.mjs";
import { API_POST } from "../../constants/constants.mjs";
import { createAllowedRequest } from "../../events/helpers/createAllowedRequest.mjs";
import { getQueryParam } from "../../events/helpers/getQueryParam.mjs";

export async function fetchSinglePost() {
  const postID = getQueryParam("id");
  if (!postID) {
    window.location.href = "/";
  }
  // let jsonValue = {};
  try {
    const post = createAllowedRequest("GET");
    const fetched = await fetch(`${API_POST}/${postID}`, post);
    const json = await fetched.json();
    // jsonValue = json;
    createPost(json);

    if (!fetched.ok) {
      throw new Error(json.errors?.[0]?.message || "Failed fetching the post");
    }
  } catch (error) {
    console.log(error);
    // catchAndDisplay("#postContainer", jsonValue.errors?.[0]?.message);
  }
}
