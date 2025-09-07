export function checkIfImageValid(url, imgName) {
  return new Promise((result) => {
    const img = new Image();
    img.onload = () => result(true);
    img.onerror = () => result(false);
    img.src = url;
  });
}
