/** Adds reliable touch and keyboard behavior to the learning tooltip. */
const learningSkill = document.querySelector(".skill-item--learning");
const learningTrigger = document.querySelector(".skill-learning-trigger");

/**
 * Opens or closes the tooltip and synchronizes its accessible state.
 *
 * @param {boolean} open - Whether the tooltip should be open.
 * @returns {void}
 */
function setLearningTooltip(open) {
  if (!learningSkill || !learningTrigger) return;
  learningSkill.classList.toggle("is-open", open);
  learningTrigger.setAttribute("aria-expanded", String(open));
}

/**
 * Toggles the tooltip after a mouse or touch activation.
 *
 * @returns {void}
 */
function toggleLearningTooltip() {
  setLearningTooltip(!learningSkill.classList.contains("is-open"));
}

/**
 * Closes the tooltip when interaction moves outside its component.
 *
 * @param {PointerEvent} event - Pointer event raised on the document.
 * @returns {void}
 */
function closeLearningTooltipOutside(event) {
  if (learningSkill?.contains(event.target)) return;
  setLearningTooltip(false);
}

/**
 * Closes the tooltip with Escape and returns focus to its trigger.
 *
 * @param {KeyboardEvent} event - Keyboard event raised on the document.
 * @returns {void}
 */
function closeLearningTooltipWithKeyboard(event) {
  if (event.key !== "Escape") return;
  setLearningTooltip(false);
  learningTrigger?.focus();
}

/**
 * Connects all supported tooltip interactions.
 *
 * @returns {void}
 */
function initializeLearningTooltip() {
  if (!learningSkill || !learningTrigger) return;
  learningTrigger.addEventListener("click", toggleLearningTooltip);
  document.addEventListener("pointerdown", closeLearningTooltipOutside);
  document.addEventListener("keydown", closeLearningTooltipWithKeyboard);
}

initializeLearningTooltip();
