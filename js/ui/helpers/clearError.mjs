export function clearError(textContainer) {
  const container = document.getElementById(`${textContainer}`);
  container.innerText = "";
  container.classList.add("hidden");
  container.classList.remove("text-redTime");
}
