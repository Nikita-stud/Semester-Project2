export function checkIfImageValid(url) {
  const urlToUse = url.trim().toLowerCase();
  const invalidEnds = [
    `google.com/search`,
    `google.com/url?`,
    `google.com/images`,
    `&q=search`,
    `?q=search`,
  ];
  return !invalidEnds.some((ends) => urlToUse.includes(ends));
}
