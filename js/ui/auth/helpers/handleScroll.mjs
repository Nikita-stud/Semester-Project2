const header = document.getElementById("headerContainer");

export function handleScroll() {
  const scrolledY = window.scrollY;

  if (scrolledY > 1) {
    header.classList.add("opacity-10", "ease-in");
  } else {
    header.classList.remove("opacity-10", "ease-in");
  }
}
