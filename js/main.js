const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    langButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const alleBoxen = document.querySelectorAll(".box");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sichtbar");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // ÄNDERUNG: Reagiert erst, wenn 25% des Objekts im Viewport sichtbar sind
      threshold: 0.25,
      // rootMargin komplett auf 0 setzen für exakte Bildschirmkanten
      rootMargin: "0px",
    },
  );

  alleBoxen.forEach((box) => {
    observer.observe(box);
  });
});

const testimonials = [
  {
    text: "Fügen Sie hier ein Zitat eines ehemaligen Kollegen oder Teampartners ein. Was hat diese Person an der Zusammenarbeit mit Ihnen besonders geschätzt?",
    author: "Vorname Nachname - Team-Partner",
  },
  {
    text: "Ergänzen Sie eine Rückmeldung Ihres Dozenten oder Mentors zu Ihrer Entwicklung während der Ausbildung.",
    author: "Vorname Nachname - Dozent:in",
  },
  {
    text: "Nutzen Sie diesen Platz für das Feedback eines Kunden oder einer Kundin zu einem abgeschlossenen Projekt.",
    author: "Vorname Nachname - Kunde",
  },
];

const testimonialText = document.getElementById("testimonialText");
const testimonialAuthor = document.getElementById("testimonialAuthor");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");

let currentTestimonial = 0;

function showTestimonial(index) {
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  const testimonial = testimonials[currentTestimonial];

  testimonialText.textContent = testimonial.text;
  testimonialAuthor.textContent = testimonial.author;

  testimonialDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentTestimonial);
  });
}

if (testimonialText) {
  testimonialPrev.addEventListener("click", () =>
    showTestimonial(currentTestimonial - 1),
  );
  testimonialNext.addEventListener("click", () =>
    showTestimonial(currentTestimonial + 1),
  );

  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", () =>
      showTestimonial(Number(dot.dataset.index)),
    );
  });
}
