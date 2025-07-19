const hamburger = document.getElementById("hamburger");
const darkBackground = document.getElementById("overlay");
const menu = document.getElementById("toggleMenu");

function toggleNav() {
  hamburger.addEventListener("click", () => {
    darkBackground.classList.toggle("hidden");
    menu.classList.toggle("hidden");
    hamburger.classList.toggle("hidden");
  });
  closeNav();
}
toggleNav();

function closeNav() {
  darkBackground.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    darkBackground.classList.toggle("hidden");
    hamburger.classList.toggle("hidden");
  });
}
