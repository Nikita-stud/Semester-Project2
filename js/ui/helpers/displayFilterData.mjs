const filterContainer = document.getElementById("filterContainer");
const filterText = document.getElementById("filterText");
const filterCloseIcon = document.getElementById("filterCloseIcon");

export function displayFilterData() {
  filterText.addEventListener("click", () => {
    filterContainer.classList.toggle("hidden");
  });

  filterCloseIcon.addEventListener("click", () => {
    filterContainer.classList.toggle("hidden");
  });
}
