/**
 * Closes the mobile navigation and releases the document scroll lock.
 *
 * @param {HTMLElement} toggle - Menu toggle button.
 * @param {HTMLElement} menu - Collapsible navigation menu.
 * @returns {void}
 */
function closeNavigation(toggle, menu) {
  toggle.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
  document.body.classList.remove("nav-open-lock");
}

/**
 * Toggles the mobile navigation state.
 *
 * @param {HTMLElement} toggle - Menu toggle button.
 * @param {HTMLElement} menu - Collapsible navigation menu.
 * @returns {void}
 */
function toggleNavigation(toggle, menu) {
  const isOpen = menu.classList.toggle("is-open");
  toggle.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open-lock", isOpen);
}

/**
 * Connects the mobile menu controls when navigation exists.
 *
 * @returns {void}
 */
function initializeNavigation() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => toggleNavigation(toggle, menu));
  menu.querySelectorAll("a, .lang-btn").forEach((item) => {
    item.addEventListener("click", () => closeNavigation(toggle, menu));
  });
}

/**
 * Reveals intersecting elements once and then stops observing them.
 *
 * @param {IntersectionObserverEntry[]} entries - Current observer entries.
 * @param {IntersectionObserver} observer - Observer managing the entries.
 * @returns {void}
 */
function revealEntries(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("sichtbar");
    observer.unobserve(entry.target);
  });
}

/**
 * Starts the one-time reveal observer for animated content boxes.
 *
 * @returns {void}
 */
function initializeRevealEffects() {
  const boxes = document.querySelectorAll(".box");
  if (!boxes.length || !("IntersectionObserver" in window)) {
    boxes.forEach((box) => box.classList.add("sichtbar"));
    return;
  }
  const options = { threshold: 0, rootMargin: "0px 0px -15% 0px" };
  const observer = new IntersectionObserver(revealEntries, options);
  boxes.forEach((box) => observer.observe(box));
}

/**
 * Updates the visibility of the scroll-to-top button.
 *
 * @param {HTMLElement} button - Scroll-to-top control.
 * @returns {void}
 */
function updateScrollTopVisibility(button) {
  button.classList.toggle("visible", window.scrollY > 600);
}

/**
 * Connects the scroll-to-top control when it is present.
 *
 * @returns {void}
 */
function initializeScrollTop() {
  const button = document.getElementById("scrollTopBtn");
  if (!button) return;
  window.addEventListener("scroll", () => updateScrollTopVisibility(button));
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  updateScrollTopVisibility(button);
}

/**
 * Initializes all interactive page features.
 *
 * @returns {void}
 */
function init() {
  initializeNavigation();
  initializeRevealEffects();
  initializeScrollTop();
}

document.addEventListener("DOMContentLoaded", init);
