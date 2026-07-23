/** Validates and submits the contact form without reloading the page. */
const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const contactFeedback = document.getElementById("contactFeedback");
const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,63}$/i;

/** Returns a translation or an empty string before i18n is available. */
function translateContact(key) {
  return window.i18n?.t(key) || "";
}

/** Checks email length, syntax, and invalid local-part dot placement. */
function isValidEmail(value) {
  const email = value.trim();
  if (email.length > 254 || !emailPattern.test(email)) return false;
  const [localPart] = email.split("@");
  return localPart.length <= 64
    && !localPart.startsWith(".")
    && !localPart.endsWith(".")
    && !localPart.includes("..");
}

/** Returns the validation message for an ordinary text field. */
function getTextFieldError(name, value) {
  if (value.trim()) return "";
  return translateContact(`contact.validation.${name}Required`);
}

/** Returns the validation message for an email field. */
function getEmailError(value) {
  if (!value.trim()) return translateContact("contact.validation.emailRequired");
  return isValidEmail(value) ? "" : translateContact("contact.validation.emailInvalid");
}

/** Shows or clears a field validation message. */
function setFieldError(field, message) {
  field.classList.toggle("has-error", Boolean(message));
  field.querySelector(".contact-field-error").textContent = message;
}

/** Gets the appropriate validation error for a form field. */
function getFieldError(field, input) {
  const name = field.dataset.field;
  if (name === "privacy") {
    return input.checked ? "" : translateContact("contact.validation.privacyRequired");
  }
  if (name === "email") return getEmailError(input.value);
  return getTextFieldError(name, input.value);
}

/** Validates a contact field and displays its current error. */
function validateContactField(field) {
  const input = field.querySelector("input, textarea");
  const message = getFieldError(field, input);
  setFieldError(field, message);
  return !message;
}

/** Validates every field and returns whether the form can be submitted. */
function validateContactForm(fields) {
  return [...fields].map(validateContactField).every(Boolean);
}

/** Prepares the form controls for an active request. */
function startContactRequest() {
  contactSubmit.disabled = true;
  contactSubmit.textContent = translateContact("contact.sending");
  contactFeedback.textContent = "";
  contactFeedback.classList.remove("is-success", "is-error");
}

/** Displays the server response using localized fallback text. */
function showContactResult(result) {
  const fallback = translateContact("contact.genericError");
  contactFeedback.textContent = result.ok
    ? translateContact("contact.successMessage")
    : result.error || fallback;
  contactFeedback.classList.add(result.ok ? "is-success" : "is-error");
}

/** Restores an interactive submit button and its original label. */
function restoreContactSubmit(label) {
  contactSubmit.textContent = label;
  contactSubmit.disabled = false;
}

/** Clears the successfully submitted form after feedback was visible. */
function resetContactForm(fields, label) {
  contactForm.reset();
  fields.forEach((field) => setFieldError(field, ""));
  contactFeedback.textContent = "";
  contactFeedback.classList.remove("is-success", "is-error");
  restoreContactSubmit(label);
}

/** Sends form data to the server and parses its JSON response. */
async function sendContactRequest() {
  const response = await fetch("./mailer.php", {
    method: "POST",
    body: new FormData(contactForm),
  });
  return response.json();
}

/** Handles a validated contact form submission. */
async function submitContactForm(event, fields) {
  event.preventDefault();
  if (!validateContactForm(fields)) return;
  const label = contactSubmit.textContent;
  startContactRequest();
  try {
    const result = await sendContactRequest();
    showContactResult(result);
    if (result.ok) return void window.setTimeout(() => resetContactForm(fields, label), 3000);
  } catch {
    showContactResult({ ok: false });
  }
  restoreContactSubmit(label);
}

/** Revalidates a field only after it has shown an error. */
function revalidateInvalidField(field) {
  if (field.classList.contains("has-error")) validateContactField(field);
}

/** Connects live validation events to one contact field. */
function bindContactField(field) {
  const input = field.querySelector("input, textarea");
  input.addEventListener("blur", () => validateContactField(field));
  input.addEventListener("input", () => revalidateInvalidField(field));
  if (input.type === "checkbox") {
    input.addEventListener("change", () => validateContactField(field));
  }
}

/** Refreshes visible error messages after the language changes. */
function refreshContactErrors(fields) {
  fields.forEach(revalidateInvalidField);
}

/** Initializes validation and submission when the contact form exists. */
function initializeContactForm() {
  if (!contactForm || !contactSubmit || !contactFeedback) return;
  const fields = contactForm.querySelectorAll("[data-field]");
  fields.forEach(bindContactField);
  document.addEventListener("languagechange", () => refreshContactErrors(fields));
  contactForm.addEventListener("submit", (event) => submitContactForm(event, fields));
}

initializeContactForm();
