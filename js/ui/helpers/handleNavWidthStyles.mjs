export function handleNavWidthStyles() {
  let width = window.innerWidth;
  const headerContent = document.getElementById("headerContent");
  const hiddenNav = document.getElementById("toggleMenu");
  const headerNavUl = document.getElementById("headerNavUl");
  const loggedNav = document.getElementById("navLoggedProfile");
  const headerLine = document.getElementById("headerLine");
  const allIcons = document.querySelectorAll("div nav ul li  i");
  const cta = document.getElementById("ctaToggleScreen");
  const headerUnderline = document.getElementById("headerUnderline");

  if (width >= 768) {
    headerContent.classList.remove("px-[20px]");
    headerContent.classList.add("px-[50px]");

    hiddenNav.classList.remove(
      "bg-white",
      "hidden",
      "fixed",
      "w-[246px]",
      "h-screen",
      "shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
    );
    hiddenNav.classList.add("relative", "z-100", "h-full", "mt-[13px]");

    headerNavUl.classList.remove(
      "pl-[20px]",
      "flex-col",
      "gap-[20px]",
      "text-mobileButton"
    );
    headerNavUl.classList.add("text-desktopText");

    loggedNav.classList.add("hidden");
    headerLine.classList.add("hidden");

    allIcons.forEach((li) => {
      li.style.display = "none";
    });
    cta.classList.add("hidden");

    headerUnderline.classList.remove("px-[20px]");
    headerUnderline.classList.add("px-[50px]");
  } else if (width < 768) {
    headerContent.classList.add("px-[20px]");
    headerContent.classList.remove("px-[50px]");

    hiddenNav.classList.add(
      "bg-white",
      "hidden",
      "fixed",
      "w-[246px]",
      "h-screen",
      "shadow-[0_6px_10px_rgba(0,0,0,0.25)]"
    );
    hiddenNav.classList.remove("relative", "z-100", "h-full", "mt-[13px]");

    headerNavUl.classList.add(
      "pl-[20px]",
      "flex-col",
      "gap-[20px]",
      "text-mobileButton"
    );
    headerNavUl.classList.remove("text-desktopText");

    headerLine.classList.remove("hidden");

    allIcons.forEach((li) => {
      li.style.display = "inline";
    });
    cta.classList.remove("hidden");

    headerUnderline.classList.add("px-[20px]");
    headerUnderline.classList.remove("px-[50px]");
  }
}
