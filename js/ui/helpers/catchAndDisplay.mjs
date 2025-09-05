export function catchAndDisplay(containerId, jsonValue, errorFalse) {
  const container = document.getElementById(`${containerId}`);
  const parent = container.parentElement;
  if (errorFalse === false) {
    const errorMessage =
      jsonValue.errors?.[0]?.message || "There has been an Error";
    const isNotFound = errorMessage.toLowerCase().includes("not found");
    const errorStatus = jsonValue.statusCode;
    const clientError = errorStatus >= 400 && errorStatus <= 499;
    const serverError = errorStatus >= 500 && errorStatus <= 599;

    container.innerHTML = "";
    parent.classList.remove("hidden");

    if (isNotFound && clientError) {
      container.innerText = "Error on our side, please try again later";
    } else if (serverError) {
      container.innerText = "Error with our servers, please try again later";
    } else {
      container.innerText = errorMessage;
    }
  } else {
    parent.classList.remove("hidden");
    parent.classList.remove("border-redTime", "text-redTime");
    parent.classList.add("border-green", "text-green");
    container.innerText = "Success";
  }
}
