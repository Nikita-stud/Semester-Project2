import { handleNavOnScroll } from "./handleNavOnScroll.mjs";
import { handleWidthStyles } from "./handleWidthStyles.mjs";
import { sendToHeaderUponReloading } from "./sendToHeaderUponReloading.mjs";
import { toggleNav } from "./toggleNav.mjs";

export function setupCommonPageEvents() {
  let width = window.innerWidth;
  toggleNav();
  window.addEventListener("load", sendToHeaderUponReloading);
  window.addEventListener("scroll", handleNavOnScroll);
  // const loginNavIcon = document.getElementById("loginNavIcon");
  // loginNavIcon.classList.remove("hidden");

  if (width >= 768) {
    handleWidthStyles();
  }
  window.addEventListener("resize", handleWidthStyles);
}
