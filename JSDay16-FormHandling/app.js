// Targeting root element
const ROOT = document.getElementById("root");
// Create section element
const section = document.createElement("div");
section.classList.add("form-section");
// Create form element
const form = document.createElement("form");
form.classList.add = "form-container";
// Utility function to create input fields
function createInputElement(type, placeholder, label = false) {
  const inputElement = document.createElement("input");
  inputElement.type = type;
  inputElement.placeholder = placeholder;
  inputElement.classList.add("form-input");

  if (label) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");

    const labelField = document.createElement("label");
    labelField.innerText = placeholder;
    labelField.classList.add("form-label");

    wrapper.appendChild(labelField);
    wrapper.appendChild(inputElement);
    return wrapper;
  }
  return inputElement;
}

// Input field
const fNameInput = createInputElement("text", "Enter your First name:", true);
const lNameInput = createInputElement("text", "Enter your Last name:", true);
const emailInput = createInputElement("email", "Enter your Email:", true);
const telInput = createInputElement("tel", "Enter your Phone Number:", true);
const dobInput = createInputElement("date", "Enter your DOB here:", true);

// Append Input fields
form.appendChild(fNameInput);
form.appendChild(lNameInput);
form.appendChild(emailInput);
form.appendChild(telInput);
form.appendChild(dobInput);

// Create div for checkboxes, radios, textarea
const formDiv = document.createElement("div");
formDiv.classList.add("form-extra");
form.appendChild(formDiv);

// Hobbies checkbox
const hobbiesLabel = document.createElement("label");
hobbiesLabel.innerText = "Select your hobbies:";
hobbiesLabel.classList.add("form-label");
formDiv.appendChild(hobbiesLabel);

const hobbies = ["Reading", "Traveling", "Cooking"];
for (let hobby of hobbies) {
  const checkboxDiv = document.createElement("div");
  checkboxDiv.classList.add("checkbox-group");

  const label = document.createElement("label");
  label.textContent = hobby;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "hobbies";

  checkboxDiv.appendChild(label);
  checkboxDiv.appendChild(checkbox);
  formDiv.appendChild(checkboxDiv);
}

// Gender (radio)
const radioLabel = document.createElement("label");
radioLabel.innerText = "Select gender:";
radioLabel.classList.add("form-label");
formDiv.appendChild(radioLabel);

const genders = ["Male", "Female", "Other"];
for (let gender of genders) {
  const radioDiv = document.createElement("div");
  radioDiv.classList.add("radio-group");

  const label = document.createElement("label");
  label.textContent = gender;

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "genders";
  radioDiv.appendChild(label);
  radioDiv.appendChild(radio);
  formDiv.appendChild(radioDiv);
}

// Message textarea
const textLabel = document.createElement("label");
textLabel.innerText = "Enter your message here:";
textLabel.classList.add("form-label");
formDiv.appendChild(textLabel);

const message = document.createElement("textarea");
message.placeholder = "Enter your message here:";
message.classList.add("form-textarea");
formDiv.appendChild(message);

// Submit Button
const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.textContent = "Submit";
submitBtn.classList.add("submit-button");
form.appendChild(submitBtn);

form.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Form submitted successfully.🎉");
  form.reset();
});

section.appendChild(form);
ROOT.appendChild(section);
