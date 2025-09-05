import { API_POST } from "../../constants/constants.mjs";
import { loadLocalStorage } from "../../events/auth/loadLocalStorage.mjs";
import { createAllowedDataRequest } from "../../events/helpers/createAlloweddataRequest.mjs";
import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function postOwnPost(postData) {
  const button = document.getElementById("postOwnCTA");
  const fieldset = document.getElementById("fieldsetPost");
  fieldset.disabled = true;
  let jsonValue = {};

  try {
    const userName = loadLocalStorage("UserName");
    const {
      product,
      time,
      description,
      image,
      image2,
      image3,
      image4,
      image5,
    } = postData;

    let images = [image, image2, image3, image4, image5];
    const filteredImages = images.filter((img) => img && img.trim().length > 0);

    const bodyData = {
      title: product,
      description: description,
      endsAt: time,
      tags: [userName],
    };

    if (filteredImages.length > 0) {
      bodyData.media = filteredImages.map((img, index) => ({
        url: img,
        alt: `Image${index + 1} for ${product}`,
      }));
    }

    const fetchPosts = createAllowedDataRequest("POST", bodyData);
    const response = await fetch(API_POST, fetchPosts);
    const json = await response.json();
    jsonValue = json;
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Getting Posts failed");
    } else {
      catchAndDisplay("errorPosting", jsonValue, true);
      location.reload();
    }
  } catch (error) {
    catchAndDisplay("errorPosting", jsonValue, false);
  } finally {
    fieldset.disabled = false;
    button.innerText = "Post";
  }
}
