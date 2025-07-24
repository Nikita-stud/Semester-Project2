export function transformTime(date) {
  return {
    hours: date.getHours(),
    min: date.getMinutes(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}
