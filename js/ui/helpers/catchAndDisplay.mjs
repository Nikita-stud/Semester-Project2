export function catchAndDisplay(containerId, jsonValue, errorFalse) {
  const container = document.getElementById(`${containerId}`);
  const parent = container.parentElement;
  if (errorFalse === false) {
    container.innerHTML = "";
    parent.classList.remove("hidden");
    container.innerText =
      jsonValue.errors?.[0]?.message || "There has been an Error";
  } else {
    parent.classList.remove("hidden");
    parent.classList.remove("border-redTime", "text-redTime");
    parent.classList.add("border-green", "text-green");
    container.innerText = "Success";
  }
}
