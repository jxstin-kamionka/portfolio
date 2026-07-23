/**
 * Applies static translations and exposes lookups for dynamic UI content.
 * Translation dictionaries are loaded before this file.
 */
const translations = window.translations;
const supportedLangs = Object.keys(translations);
const languageStorageKey = "preferredLang";
let currentLang = document.documentElement.lang || "de";

/** Updates one group of elements from a translation data attribute. */
function translateElements(selector, datasetKey, applyValue) {
  document.querySelectorAll(selector).forEach((element) => {
    const value = translations[currentLang][element.dataset[datasetKey]];
    if (value !== undefined) applyValue(element, value);
  });
}

/** Replaces translated text content. */
function applyText(element, value) {
  element.textContent = value;
}

/** Replaces trusted, project-owned translated HTML. */
function applyHtml(element, value) {
  element.innerHTML = value;
}

/** Replaces an input placeholder. */
function applyPlaceholder(element, value) {
  element.placeholder = value;
}

/** Replaces an accessible label. */
function applyAriaLabel(element, value) {
  element.setAttribute("aria-label", value);
}

/** Translates all supported text and attributes on the current document. */
function translateDocument() {
  translateElements("[data-i18n]", "i18n", applyText);
  translateElements("[data-i18n-html]", "i18nHtml", applyHtml);
  translateElements("[data-i18n-placeholder]", "i18nPlaceholder", applyPlaceholder);
  translateElements("[data-i18n-aria]", "i18nAria", applyAriaLabel);
}

/** Applies a supported language and notifies dynamic components. */
function applyLanguage(lang) {
  if (!supportedLangs.includes(lang)) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  translateDocument();
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

/** Returns the active language code. */
function getCurrentLang() {
  return currentLang;
}

/** Returns a translated value or its key when no translation exists. */
function t(key) {
  return translations[currentLang]?.[key] || key;
}

/** Reads the saved language while tolerating blocked browser storage. */
function getStoredLang() {
  try {
    return localStorage.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

/** Persists the selected language when browser storage is available. */
function storeLang(lang) {
  try {
    localStorage.setItem(languageStorageKey, lang);
  } catch {
    // The page remains usable when storage is unavailable.
  }
}

/** Synchronizes the visual state of all language buttons. */
function syncLanguageButtons(lang) {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
}

/** Handles a language button click. */
function selectLanguage(event) {
  const lang = event.currentTarget.dataset.lang;
  if (!supportedLangs.includes(lang)) return;
  applyLanguage(lang);
  storeLang(lang);
  syncLanguageButtons(lang);
}

/** Connects every language button to the translation service. */
function bindLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", selectLanguage);
  });
}

/** Initializes translations from the stored or document language. */
function initializeTranslations() {
  const storedLang = getStoredLang();
  const initialLang = supportedLangs.includes(storedLang) ? storedLang : currentLang;
  bindLanguageButtons();
  applyLanguage(initialLang);
  syncLanguageButtons(initialLang);
}

initializeTranslations();
window.i18n = { translations, applyLanguage, getCurrentLang, t };
