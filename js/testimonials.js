/** Controls translated testimonial content and slider navigation. */
const testimonialText = document.getElementById("testimonialText");
const testimonialAuthor = document.getElementById("testimonialAuthor");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");
const testimonialFallbacks = [
  ["Die Zusammenarbeit lief absolut reibungslos. Besonders beeindruckt hat mich die strukturierte Arbeitsweise.", "Sarah Lehmann - Project Manager"],
  ["Ein fantastischer Teampartner mit einem extrem hohen Qualitätsanspruch. Jederzeit gerne wieder!", "Michael Klose - Developer"],
  ["Kreative Denkansätze gepaart mit starkem technischem Know-how. Hat unser Projekt entscheidend nach vorne gebracht.", "Elena Rostova - Product Owner"],
];
let currentTestimonial = 0;

/**
 * Reads one testimonial and falls back when translation data is unavailable.
 *
 * @param {number} index - Zero-based testimonial index.
 * @returns {{text: string, author: string}} Testimonial copy.
 */
function getTestimonial(index) {
  const translate = window.i18n?.t || (() => "");
  const textKey = `testimonials.${index}.text`;
  const authorKey = `testimonials.${index}.author`;
  const text = translate(textKey);
  const author = translate(authorKey);
  if (!text || text === textKey) {
    return { text: testimonialFallbacks[index][0], author: testimonialFallbacks[index][1] };
  }
  return { text, author };
}

/**
 * Highlights the navigation dot of the active testimonial.
 *
 * @returns {void}
 */
function updateTestimonialDots() {
  testimonialDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentTestimonial);
  });
}

/**
 * Inserts the selected testimonial and ends its fade transition.
 *
 * @param {{text: string, author: string}} testimonial - Copy to render.
 * @param {Element|null} card - Testimonial card containing the copy.
 * @returns {void}
 */
function applyTestimonial(testimonial, card) {
  testimonialText.textContent = testimonial.text;
  testimonialAuthor.textContent = testimonial.author;
  updateTestimonialDots();
  card?.classList.remove("is-fading");
}

/**
 * Displays a testimonial index with circular navigation.
 *
 * @param {number} index - Requested testimonial index.
 * @returns {void}
 */
function showTestimonial(index) {
  if (!testimonialText) return;
  currentTestimonial = (index + testimonialFallbacks.length) % testimonialFallbacks.length;
  const testimonial = getTestimonial(currentTestimonial);
  const card = testimonialText.closest(".testimonial-card");
  if (!card) return applyTestimonial(testimonial, card);
  card.classList.add("is-fading");
  window.setTimeout(() => applyTestimonial(testimonial, card), 200);
}

/**
 * Handles direct navigation from a testimonial dot.
 *
 * @param {MouseEvent} event - Click on a navigation dot.
 * @returns {void}
 */
function selectTestimonial(event) {
  showTestimonial(Number(event.currentTarget.dataset.index));
}

/**
 * Connects slider controls and shows the first testimonial.
 *
 * @returns {void}
 */
function initializeTestimonials() {
  if (!testimonialText || !testimonialPrev || !testimonialNext) return;
  testimonialPrev.addEventListener("click", () => showTestimonial(currentTestimonial - 1));
  testimonialNext.addEventListener("click", () => showTestimonial(currentTestimonial + 1));
  testimonialDots.forEach((dot) => dot.addEventListener("click", selectTestimonial));
  document.addEventListener("languagechange", () => showTestimonial(currentTestimonial));
  showTestimonial(0);
}

initializeTestimonials();
