export function validateEmail(email) {
  const emailText = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  return emailText.test(email);
}
