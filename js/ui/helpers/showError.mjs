export function showError(textContainer, text) {
  const container = document.getElementById(`${textContainer}`);
  container.innerText = text;
  container.classList.remove("hidden");
  container.classList.add("text-redTime");
}
