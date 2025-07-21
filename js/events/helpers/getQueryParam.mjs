export function getQueryParam(param) {
  const queryString = document.location.search;
  const parameters = new URLSearchParams(queryString);
  const parameter = parameters.get(param);
  return parameter;
}
