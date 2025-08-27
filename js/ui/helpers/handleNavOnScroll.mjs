export function handleNavOnScroll() {
  const header = document.getElementById("headerContainer");
  const headerUnderline = document.getElementById("headerUnderline");
  const currentScrolledY = window.scrollY;

  if (currentScrolledY > 25) {
    header.classList.add(
      "bg-white",
      "bg-opacity-95",
      "pb-[20px]",
      "ease-in",
      "border-b-[3px]",
      "border-green"
    );
    headerUnderline.classList.add("hidden");
  } else {
    header.classList.remove(
      "bg-white",
      "bg-opacity-95",
      "pb-[20px]",
      "ease-in",
      "border-b-[3px]",
      "border-green"
    );
    headerUnderline.classList.remove("hidden");
  }
}
