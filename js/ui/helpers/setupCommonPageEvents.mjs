import { handleScroll } from "./handleScroll.mjs";
import { sendToHeaderUponReloading } from "./sendToHeaderUponReloading.mjs";
import { toggleNav } from "./toggleNav.mjs";

export function setupCommonPageEvents() {
  toggleNav();
  window.addEventListener("load", sendToHeaderUponReloading);
  window.addEventListener("scroll", handleScroll);
}
