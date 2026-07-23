/** Adds reliable touch and keyboard behavior to the learning tooltip. */
const learningSkill = document.querySelector(".skill-item--learning");
const learningTrigger = document.querySelector(".skill-learning-trigger");

/** Opens or closes the tooltip and synchronizes its accessible state. */
function setLearningTooltip(open) {
  if (!learningSkill || !learningTrigger) return;
  learningSkill.classList.toggle("is-open", open);
  learningTrigger.setAttribute("aria-expanded", String(open));
}

/** Toggles the tooltip after a mouse or touch activation. */
function toggleLearningTooltip() {
  setLearningTooltip(!learningSkill.classList.contains("is-open"));
}

/** Closes the tooltip when interaction moves outside its component. */
function closeLearningTooltipOutside(event) {
  if (learningSkill?.contains(event.target)) return;
  setLearningTooltip(false);
}

/** Closes the tooltip with Escape and returns focus to its trigger. */
function closeLearningTooltipWithKeyboard(event) {
  if (event.key !== "Escape") return;
  setLearningTooltip(false);
  learningTrigger?.focus();
}

/** Connects all supported tooltip interactions. */
function initializeLearningTooltip() {
  if (!learningSkill || !learningTrigger) return;
  learningTrigger.addEventListener("click", toggleLearningTooltip);
  document.addEventListener("pointerdown", closeLearningTooltipOutside);
  document.addEventListener("keydown", closeLearningTooltipWithKeyboard);
}

initializeLearningTooltip();
