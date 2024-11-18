function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modals = document.querySelectorAll(".bground");
const modalForm = document.querySelector(".signup-modal-form");
const modalConfirmation = document.querySelector(".confirmation-modal-form");
const signupBtn = document.querySelectorAll(".btn-signup");
const modalCloseBtn = document.querySelectorAll(".close, .btn-close");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector('form[name="reserve"]');

// Inputs
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const termsOfUseCheckbox = document.getElementById("checkbox1");

// Inputs errors
const firstNameError = document.getElementById("firstName-error");
const lastNameError = document.getElementById("lastName-error");
const emailError = document.getElementById("email-error");
const birthdateError = document.getElementById("birthdate-error");
const quantityError = document.getElementById("quantity-error");
const termsOfUseCheckboxError = document.getElementById("checkbox1-error");


document.addEventListener("DOMContentLoaded", onDocumentReady);

// launch modal form
function launchFormModal() {
  modalForm.style.display = "block";
}

// Launch modal confirmation
function launchConfirmationModal() {
  modalConfirmation.style.display = "block";
}

// Close all modals
function closeModal() {
  modals.forEach(modal => modal.style.display = "none");
}

// Form validation function
function validate() {
  try {
    return validateFirstNameInput()
      && validateLastNameInput()
      && validateEmailInput()
      && validateBirthdateInput()
      && validateQuantityInput()
      && validateTermsOfUseCheckbox();
  } catch (e) {
    console.error(e);
    return false;
  }
}

function validateFirstNameInput() {
  // At least 2 characters
  // Required

  const firstName = firstNameInput.value;
  if(firstName.length < 2) {
    showInputError(firstNameInput, firstNameError, "Veuillez entrer 2 caractères ou plus.");
    return false;
  }

  hideInputError(firstNameInput, firstNameError);
  return true;
}

function validateLastNameInput() {
	// At least 2 characters
	// Required

  const lastName = lastNameInput.value;
  if(lastName.length < 2) {
    showInputError(lastNameInput, lastNameError, "Veuillez entrer 2 caractères ou plus.");
    return false;
  }

  hideInputError(lastNameInput, lastNameError);
  return true;
}

function validateEmailInput() {
  // Valid email format
  // Required

  const email = emailInput.value;
  if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showInputError(emailInput, emailError, "Veuillez entrer une adresse email valide.");
    return false;
  }

  hideInputError(emailInput, emailError);
  return true;
}

function validateBirthdateInput() {
  // Valid birthdate format
  // Required

  const frRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const enRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

  const birthdate = birthdateInput.value;
  if(!birthdate.match(enRegex)) {
    showInputError(birthdateInput, birthdateError, "Veuillez entrer une date de naissance valide.");
    return false;
  }

  hideInputError(birthdateInput, birthdateError);
  return true;
}

function validateQuantityInput() {
	// Should be a number
	// At least 0
	// At most 99

	const quantity = quantityInput.value;
  console.log("Quantity :", quantity);

	if (quantity.trim().length == 0 || isNaN(Number(quantity)) || Number(quantity) < 0 || Number(quantity > 99)) {
		showInputError(
			quantityInput,
			quantityError,
			"Veuillez entrer un nombre entier entre 0 et 99."
		);
		return false;
	}

	hideInputError(quantityInput, quantityError);
	return true;
}

function validateTermsOfUseCheckbox () {
  // Should be checked

  if(!termsOfUseCheckbox.checked) {
    showInputError(termsOfUseCheckbox, termsOfUseCheckboxError, "Vous devez cocher cette case");
    return false;
  }

  hideInputError(termsOfUseCheckbox, termsOfUseCheckboxError);
  return true;
}

/**
Displays an error message and styles the input field for invalid input.
@param {HTMLElement} inputElement - The input field element that needs to be styled.
@param {HTMLElement} inputErrorElement - The error message element to display the error message.
@param {string} errorMessage - The error message to be displayed.
@returns {void}
 */
function showInputError(inputElement, inputErrorElement, errorMessage) {
  inputElement.classList.add("field-error");
	inputErrorElement.style.display = "block";
	inputErrorElement.textContent = errorMessage;

  console.log(inputElement.name, "=>", inputElement.value)
}

/**
Hides the error message and styles for an invalid input field.
@param {HTMLElement} inputElement - The input field element that needs to be styled.
@param {HTMLElement} inputErrorElement - The error message element to display the error message.
@returns {void}
 */
function hideInputError(inputElement, inputErrorElement) {
  inputElement.classList.remove("field-error");
	inputErrorElement.textContent = "";
  inputErrorElement.style.display = "none";
}

/**
This function is called when the DOM content has been fully loaded.
It initializes event listeners for signup buttons, modal close buttons,
form input fields, and form submission.
@returns {void}
 */
function onDocumentReady() {
	console.log("Document is ready");
	signupBtn.forEach((btn) => btn.addEventListener("click", launchFormModal));
	modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

  const inputs = [
    { input: firstNameInput, error: firstNameError },
    { input: lastNameInput, error: lastNameError },
    { input: emailInput, error: emailError },
    { input: birthdateInput, error: birthdateError },
    { input: quantityInput, error: quantityError },
    { input: termsOfUseCheckbox, error: termsOfUseCheckboxError },
  ];

  inputs.forEach((input) => {
    input.input.addEventListener("change", () => {
      hideInputError(input.input, input.error);
    });
  });

  form.addEventListener("submit", function (event) {
		event.preventDefault();

		if (validate()) {
			console.log("Form is valid");
      closeModal();
      launchConfirmationModal();
		} else {
			console.log("Form is invalid");
		}
  });
}

