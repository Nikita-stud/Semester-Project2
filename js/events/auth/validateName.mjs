export function validateName(name) {
  const nameTest = /^[a-zA-Z0-9_]+$/;
  return nameTest.test(name);
}
