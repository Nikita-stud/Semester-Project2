export function catchAndDisplay(containerId, jsonValue, errorTrue) {
  const container = document.getElementById(`${containerId}`);
  const parent = container.parentElement;
  if (errorTrue === false) {
    parent.classList.remove("hidden");
    container.innerText =
      jsonValue.errors?.[0]?.message || "There had been an Error";
  } else {
    parent.classList.remove("hidden");
    parent.classList.remove("border-redTime", "text-redTime");
    parent.classList.add("border-green", "text-green");
    container.innerText = "Success";
  }
}
