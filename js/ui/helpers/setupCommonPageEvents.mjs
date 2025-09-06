import { displayNavLoggedProfile } from "../auth/displayNavLoggedProfile.mjs";
import { handleNavOnScroll } from "./handleNavOnScroll.mjs";
import { handleNavWidthStyles } from "./handleNavWidthStyles.mjs";
import { sendToHeaderUponReloading } from "./sendToHeaderUponReloading.mjs";
import { toggleNav } from "./toggleNav.mjs";

export function setupCommonPageEvents(whatToDo) {
  window.addEventListener("load", sendToHeaderUponReloading);
  window.addEventListener("scroll", handleNavOnScroll);
  window.addEventListener("resize", handleNavWidthStyles);

  handleNavWidthStyles();
  handleNavOnScroll();
  toggleNav();

  if (whatToDo === "wait") {
    toggleNav();
    displayNavLoggedProfile();
  }
}
