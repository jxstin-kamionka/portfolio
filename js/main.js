/** Initializes navigation, reveal effects, and the scroll-to-top control. */

/** Closes the mobile navigation and releases the document scroll lock. */
function closeNavigation(toggle, menu) {
  toggle.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
  document.body.classList.remove("nav-open-lock");
}

/** Toggles the mobile navigation state. */
function toggleNavigation(toggle, menu) {
  const isOpen = menu.classList.toggle("is-open");
  toggle.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open-lock", isOpen);
}

/** Connects the mobile menu controls when navigation exists. */
function initializeNavigation() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => toggleNavigation(toggle, menu));
  menu.querySelectorAll("a, .lang-btn").forEach((item) => {
    item.addEventListener("click", () => closeNavigation(toggle, menu));
  });
}

/** Reveals intersecting elements once and then stops observing them. */
function revealEntries(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("sichtbar");
    observer.unobserve(entry.target);
  });
}

/** Starts the one-time reveal observer for animated content boxes. */
function initializeRevealEffects() {
  const options = { threshold: 0, rootMargin: "0px 0px -15% 0px" };
  const observer = new IntersectionObserver(revealEntries, options);
  document.querySelectorAll(".box").forEach((box) => observer.observe(box));
}

/** Updates the visibility of the scroll-to-top button. */
function updateScrollTopVisibility(button) {
  button.classList.toggle("visible", window.scrollY > 600);
}

/** Scrolls smoothly to the beginning of the page. */
function scrollToPageTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Connects the scroll-to-top control when it is present. */
function initializeScrollTop() {
  const button = document.getElementById("scrollTopBtn");
  if (!button) return;
  window.addEventListener("scroll", () => updateScrollTopVisibility(button));
  button.addEventListener("click", scrollToPageTop);
  updateScrollTopVisibility(button);
}

initializeNavigation();
document.addEventListener("DOMContentLoaded", initializeRevealEffects);
initializeScrollTop();
