/** Validates and submits the contact form without reloading the page. */
const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const contactFeedback = document.getElementById("contactFeedback");
const emailPattern = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,63}$/i;

/** @typedef {{ok: boolean, error?: string}} ContactResult */

/**
 * Returns a translation or an empty string before i18n is available.
 *
 * @param {string} key - Contact translation key.
 * @returns {string} Localized value.
 */
function translateContact(key) {
  return window.i18n?.t(key) || "";
}

/**
 * Checks email length, syntax, and invalid local-part dot placement.
 *
 * @param {string} value - Email address to validate.
 * @returns {boolean} Whether the value is a valid email address.
 */
function isValidEmail(value) {
  const email = value.trim();
  if (email.length > 254 || !emailPattern.test(email)) return false;
  const [localPart] = email.split("@");
  return localPart.length <= 64
    && !localPart.startsWith(".")
    && !localPart.endsWith(".")
    && !localPart.includes("..");
}

/**
 * Returns the validation message for an ordinary text field.
 *
 * @param {string} name - Field name used by translation keys.
 * @param {string} value - Current field value.
 * @returns {string} Error message or an empty string.
 */
function getTextFieldError(name, value) {
  if (value.trim()) return "";
  return translateContact(`contact.validation.${name}Required`);
}

/**
 * Returns the validation message for an email field.
 *
 * @param {string} value - Current email value.
 * @returns {string} Error message or an empty string.
 */
function getEmailError(value) {
  if (!value.trim()) return translateContact("contact.validation.emailRequired");
  return isValidEmail(value) ? "" : translateContact("contact.validation.emailInvalid");
}

/**
 * Shows or clears a field validation message.
 *
 * @param {Element} field - Contact field wrapper.
 * @param {string} message - Validation message.
 * @returns {void}
 */
function setFieldError(field, message) {
  field.classList.toggle("has-error", Boolean(message));
  const error = field.querySelector(".contact-field-error");
  if (error) error.textContent = message;
}

/**
 * Gets the appropriate validation error for a form field.
 *
 * @param {HTMLElement} field - Contact field wrapper.
 * @param {HTMLInputElement|HTMLTextAreaElement} input - Field control.
 * @returns {string} Error message or an empty string.
 */
function getFieldError(field, input) {
  const name = field.dataset.field;
  if (name === "privacy") {
    return input.checked ? "" : translateContact("contact.validation.privacyRequired");
  }
  if (name === "email") return getEmailError(input.value);
  return getTextFieldError(name, input.value);
}

/**
 * Validates a contact field and displays its current error.
 *
 * @param {Element} field - Contact field wrapper.
 * @returns {boolean} Whether the field is valid.
 */
function validateContactField(field) {
  const input = field.querySelector("input, textarea");
  if (!input) return true;
  const message = getFieldError(field, input);
  setFieldError(field, message);
  return !message;
}

/**
 * Validates every field and returns whether the form can be submitted.
 *
 * @param {NodeListOf<Element>|Element[]} fields - Fields to validate.
 * @returns {boolean} Whether every field is valid.
 */
function validateContactForm(fields) {
  let isValid = true;
  fields.forEach((field) => {
    if (!validateContactField(field)) isValid = false;
  });
  return isValid;
}

/** @returns {void} */
function startContactRequest() {
  contactSubmit.disabled = true;
  contactSubmit.textContent = translateContact("contact.sending");
  contactFeedback.textContent = "";
  contactFeedback.classList.remove("is-success", "is-error");
}

/**
 * Displays the server response using localized fallback text.
 *
 * @param {ContactResult} result - Parsed response from the mail endpoint.
 * @returns {void}
 */
function showContactResult(result) {
  const fallback = translateContact("contact.genericError");
  contactFeedback.textContent = result.ok
    ? translateContact("contact.successMessage")
    : result.error || fallback;
  contactFeedback.classList.add(result.ok ? "is-success" : "is-error");
}

/**
 * Restores an interactive submit button and its original label.
 *
 * @param {string} label - Original submit-button text.
 * @returns {void}
 */
function restoreContactSubmit(label) {
  contactSubmit.textContent = label;
  contactSubmit.disabled = false;
}

/**
 * Clears the successfully submitted form after feedback was visible.
 *
 * @param {NodeListOf<Element>|Element[]} fields - Form field wrappers.
 * @param {string} label - Original submit-button text.
 * @returns {void}
 */
function resetContactForm(fields, label) {
  contactForm.reset();
  fields.forEach((field) => setFieldError(field, ""));
  contactFeedback.textContent = "";
  contactFeedback.classList.remove("is-success", "is-error");
  restoreContactSubmit(label);
}

/**
 * Sends form data to the server and parses its JSON response.
 *
 * @returns {Promise<ContactResult>} Parsed server result.
 * @throws {Error} When the network response is not successful.
 */
async function sendContactRequest() {
  const response = await fetch("./mailer.php", {
    method: "POST",
    body: new FormData(contactForm),
  });
  if (!response.ok) throw new Error(`Contact request failed: ${response.status}`);
  return response.json();
}

/**
 * Handles a validated contact form submission.
 *
 * @param {SubmitEvent} event - Contact form submission event.
 * @param {NodeListOf<Element>|Element[]} fields - Form field wrappers.
 * @returns {Promise<void>}
 */
async function submitContactForm(event, fields) {
  event.preventDefault();
  if (!validateContactForm(fields)) return;
  const label = contactSubmit.textContent;
  startContactRequest();
  try {
    const result = await sendContactRequest();
    showContactResult(result);
    if (result.ok) {
      window.setTimeout(() => resetContactForm(fields, label), 3000);
      return;
    }
  } catch {
    showContactResult({ ok: false });
  }
  restoreContactSubmit(label);
}

/**
 * Revalidates a field only after it has shown an error.
 *
 * @param {Element} field - Contact field wrapper.
 * @returns {void}
 */
function revalidateInvalidField(field) {
  if (field.classList.contains("has-error")) validateContactField(field);
}

/**
 * Connects live validation events to one contact field.
 *
 * @param {Element} field - Contact field wrapper.
 * @returns {void}
 */
function bindContactField(field) {
  const input = field.querySelector("input, textarea");
  if (!input) return;
  input.addEventListener("blur", () => validateContactField(field));
  input.addEventListener("input", () => revalidateInvalidField(field));
  if (input.type === "checkbox") {
    input.addEventListener("change", () => validateContactField(field));
  }
}

/** @returns {void} */
function initializeContactForm() {
  if (!contactForm || !contactSubmit || !contactFeedback) return;
  const fields = contactForm.querySelectorAll("[data-field]");
  fields.forEach(bindContactField);
  document.addEventListener("languagechange", () => fields.forEach(revalidateInvalidField));
  contactForm.addEventListener("submit", (event) => submitContactForm(event, fields));
}

initializeContactForm();
