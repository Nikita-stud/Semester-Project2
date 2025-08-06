const header = document.getElementById("headerContainer");
const lastScrolledY = window.scrollY;

export function handleScroll() {
  const currentScrolledY = window.scrollY;
  const scrolledDirection = currentScrolledY > lastScrolledY ? "down" : "up;";
  lastScrolledY = currentScrolledY;

  if (scrolledY > 23) {
    header.classList.add("bg-white", "bg-opacity-90", "ease-in");
  } else {
    header.classList.remove("bg-white", "bg-opacity-90", "ease-in");
  }
}
