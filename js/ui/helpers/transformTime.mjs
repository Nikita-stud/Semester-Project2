export function transformTime(date) {
  return {
    hours: String(date.getHours()).padStart(2, "0"),
    min: String(date.getMinutes()).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: String(date.getFullYear()).padStart(2, "0"),
  };
}
