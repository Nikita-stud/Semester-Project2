import { transformTime } from "../helpers/transformTime.mjs";

export function renderPostOwnPost() {
  let productCount = "";
  const productInput = document.getElementById("product");
  const productTextCount = document.getElementById("textCount");

  productInput.addEventListener("input", () => {
    productCount = productInput.value.length;
    productTextCount.innerHTML = `${productCount}/10`;
  });

  let descriptionCount = "";
  const descriptionInput = document.getElementById("description");
  const descriptionDefaultCount = document.getElementById("descriptionCount");

  descriptionInput.addEventListener("input", () => {
    descriptionCount = descriptionInput.value.length;
    descriptionDefaultCount.innerHTML = `${descriptionCount}/200`;
  });

  const today = new Date();
  const time = transformTime(today);
  const { day, month, year, hours, min } = time;

  const timeInput = document.getElementById("time");
  timeInput.min = `${year}-${month}-${day}T${hours}:${min}`;
}
