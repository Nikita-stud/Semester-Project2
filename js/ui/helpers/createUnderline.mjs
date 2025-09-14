export function createUnderline() {
  const underline = document.createElement("div");
  underline.classList.add(
    "w-full",
    "h-[3px]",
    "mt-[20px]",
    "bg-green",
    "rounded-md",
  );
  return underline;
}
