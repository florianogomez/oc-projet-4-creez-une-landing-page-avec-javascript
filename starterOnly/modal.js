function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const termsOfUseCheckbox = document.getElementById("checkbox1");
const termsOfUseCheckboxError = document.getElementById("checkbox1-error");


document.addEventListener("DOMContentLoaded", onDocumentReady);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

function validate() {
  console.log("checkbox1", termsOfUseCheckbox.checked);

  if(!termsOfUseCheckbox.checked) {
    showTermsOfUseError();
    return false;
  }

  return true
}

function showTermsOfUseError() {
  termsOfUseCheckbox.classList.add("field-error");
  termsOfUseCheckboxError.style.display = "block";
}

function hideTermsOfUseError() {
  termsOfUseCheckbox.classList.remove("field-error");
  termsOfUseCheckboxError.style.display = "none";
}

function onDocumentReady() {
	console.log("Document is ready");
	modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
	modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
  termsOfUseCheckbox.addEventListener("change", hideTermsOfUseError);
  hideTermsOfUseError();
}

