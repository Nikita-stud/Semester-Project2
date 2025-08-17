import { API_POST } from "../../constants/constants.mjs";
import { loadLocalStorage } from "../../events/auth/loadLocalStorage.mjs";
import { createAllowedDataRequest } from "../../events/helpers/createAlloweddataRequest.mjs";
// import { catchAndDisplay } from "../../ui/helpers/catchAndDisplay.mjs";

export async function postOwnPost(postData) {
  // let jsonValue = {};
  const userName = loadLocalStorage("UserName");
  const { product, price, time, description, image } = postData;

  const imageFiles = image.files;
  console.log("imageFiles", imageFiles);

  try {
    const bodyData = {
      title: product,
      description: description,
      endsAt: time,
      bids: [{ amount: price }],
      tags: [userName],
    };
    if (image.files && image.files.length > 0) {
      const uploadedFiles = await uploadImages(image.files);
      bodyData.media = uploadedFiles;
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

async function uploadImages(files) {
  const media = [];

  for (let i = 0; i < Math.min(files.length, 5); i++) {
    const file = files[i];
    const uploadedImages = await uploadToStorage(file);
    media.push({
      url: uploadedImages.url,
    });
  }
  return media;
}

async function uploadToStorage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const fetchPosts = createAllowedDataRequest("POST", bodyData);
  const response = await fetch(API_POST, fetchPosts);

  return await response.json();
  // const response = await fetch((API_POST, fetchPosts);)
}
