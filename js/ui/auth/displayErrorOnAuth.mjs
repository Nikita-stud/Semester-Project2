import { validateEmail } from "../../events/auth/validateEmail.mjs";
import { validateName } from "../../events/auth/validateName.mjs";
import { clearError } from "../helpers/clearError.mjs";
import { showError } from "../helpers/showError.mjs";

export function displayErrorOnAuth(submitCta) {
  const submit = document.getElementById(`${submitCta}`);
  submit.classList.add("opacity-70");

  let nameIf = false;
  let emailIf = false;
  let passwordIf = false;

  const updateSubmitButton = () => {
    const isValid = nameIf && emailIf && passwordIf;
    if (isValid) {
      submit.classList.remove("opacity-70");
      submit.disabled = !isValid;
    }
  };

  const nameInput = document.getElementById("name");
  nameIf = nameInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (!value) {
      clearError("nameErrorText");
      nameIf = false;
      updateSubmitButton();
      return;
    }

    switch (true) {
      case value.length > 20:
        showError("nameErrorText", `Name is too long`);
        nameIf = false;
        break;
      case !validateName(value):
        showError("nameErrorText", "No spaces allowed except _");
        nameIf = false;
        break;
      case validateName(value) && value.length > 20:
        nameIf = true;
        break;
      default:
        clearError("nameErrorText");
        nameIf = true;
        break;
    }
    updateSubmitButton();
  });

  const emailInput = document.getElementById("email");
  emailInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (!value) {
      clearError("emailErrorText");
      emailIf = false;
      updateSubmitButton();
      return;
    }

    switch (true) {
      case !validateEmail(value):
        showError("emailErrorText", "stud.noroff.no email needed");
        emailIf = false;
        break;
      default:
        clearError("emailErrorText");
        emailIf = true;
        break;
    }
    updateSubmitButton();
  });

  const passwordInput = document.getElementById("password");
  passwordInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (!value) {
      clearError("passwordErrorText");
      passwordIf = false;
      updateSubmitButton();
      return;
    }

    switch (true) {
      case value.length < 8:
        showError("passwordErrorText", "Min. length 8 characters");
        passwordIf = false;
        break;
      default:
        clearError("passwordErrorText");
        passwordIf = true;
        break;
    }
    updateSubmitButton();
  });
}
