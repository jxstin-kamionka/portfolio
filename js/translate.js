/**
 * Applies static translations and exposes lookups for dynamic UI content.
 * Translation dictionaries are loaded before this file.
 */
const translations = window.translations;
const supportedLangs = Object.keys(translations);
const languageStorageKey = "preferredLang";
let currentLang = document.documentElement.lang || "de";

/**
 * Updates elements identified by a translation data attribute.
 *
 * @param {string} selector - CSS selector for the elements to translate.
 * @param {string} datasetKey - Dataset property containing the translation key.
 * @param {"textContent"|"innerHTML"|"placeholder"|"aria-label"} target - Property
 * or attribute that receives the translated value.
 * @returns {void}
 */
function translateElements(selector, datasetKey, target) {
  document.querySelectorAll(selector).forEach((element) => {
    const value = translations[currentLang][element.dataset[datasetKey]];
    if (value === undefined) return;
    if (target === "aria-label") {
      element.setAttribute(target, value);
      return;
    }
    element[target] = value;
  });
}

/**
 * Translates all supported text, metadata, and attributes in the document.
 *
 * @returns {void}
 */
function translateDocument() {
  translateElements("[data-i18n]", "i18n", "textContent");
  translateElements("[data-i18n-html]", "i18nHtml", "innerHTML");
  translateElements(
    "[data-i18n-placeholder]",
    "i18nPlaceholder",
    "placeholder",
  );
  translateElements("[data-i18n-aria]", "i18nAria", "aria-label");
  const titleKey = document.body?.dataset.i18nTitle;
  if (titleKey)
    document.title = translations[currentLang][titleKey] || document.title;
}

/**
 * Applies a supported language and notifies dynamic components.
 *
 * @param {string} lang - Requested ISO language code.
 * @returns {void}
 */
function applyLanguage(lang) {
  if (!supportedLangs.includes(lang)) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  translateDocument();
  document.dispatchEvent(
    new CustomEvent("languagechange", { detail: { lang } }),
  );
}

/**
 * Returns the active language code.
 *
 * @returns {string} The currently active language code.
 */
function getCurrentLang() {
  return currentLang;
}

/**
 * Looks up a translation in the active dictionary.
 *
 * @param {string} key - Translation key.
 * @returns {string} Translated value, or the key when it is missing.
 */
function t(key) {
  return translations[currentLang]?.[key] || key;
}

/**
 * Reads the saved language while tolerating blocked browser storage.
 *
 * @returns {string|null} Stored language code, if available.
 */
function getStoredLang() {
  return localStorage.getItem(languageStorageKey);
}
/**
 * Persists the selected language when browser storage is available.
 *
 * @param {string} lang - Supported language code.
 * @returns {void}
 */
function storeLang(lang) {
  localStorage.setItem(languageStorageKey, lang);
}

/**
 * Synchronizes the visual state of all language buttons.
 *
 * @param {string} lang - Active language code.
 * @returns {void}
 */
function syncLanguageButtons(lang) {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
}

/**
 * Handles a language button click.
 *
 * @param {MouseEvent} event - Language-button click event.
 * @returns {void}
 */
function selectLanguage(event) {
  const lang = event.currentTarget.dataset.lang;
  if (!supportedLangs.includes(lang)) return;
  applyLanguage(lang);
  storeLang(lang);
  syncLanguageButtons(lang);
}

/**
 * Connects every language button to the translation service.
 *
 * @returns {void}
 */
function bindLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", selectLanguage);
  });
}

/**
 * Initializes translations from the stored or document language.
 *
 * @returns {void}
 */
function initializeTranslations() {
  const storedLang = getStoredLang();
  const initialLang = supportedLangs.includes(storedLang)
    ? storedLang
    : currentLang;
  bindLanguageButtons();
  applyLanguage(initialLang);
  syncLanguageButtons(initialLang);
}

initializeTranslations();
window.i18n = { translations, applyLanguage, getCurrentLang, t };
