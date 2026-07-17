const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    langButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  const closeNavMenu = () => {
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("nav-open-lock");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open-lock", isOpen);
  });

  navMenu.querySelectorAll("a, .lang-btn").forEach((link) => {
    link.addEventListener("click", closeNavMenu);
  });
}

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

const contactForm = document.getElementById("contactForm");
const contactPrivacy = document.getElementById("contactPrivacy");
const contactSubmit = document.getElementById("contactSubmit");
const contactFeedback = document.getElementById("contactFeedback");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactValidators = {
  name: (value) =>
    value.trim() === "" ? "Bitte geben Sie Ihren Namen ein." : "",
  email: (value) => {
    if (value.trim() === "") return "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    return emailPattern.test(value)
      ? ""
      : "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  },
  message: (value) =>
    value.trim() === "" ? "Bitte geben Sie eine Nachricht ein." : "",
};

function setFieldError(field, message) {
  const errorEl = field.querySelector(".contact-field-error");
  field.classList.toggle("has-error", Boolean(message));
  errorEl.textContent = message;
}

function validateContactField(field) {
  const input = field.querySelector("input, textarea");
  const validate = contactValidators[field.dataset.field];
  const message = validate(input.value);
  setFieldError(field, message);
  return message === "";
}

if (contactForm) {
  const contactFields = contactForm.querySelectorAll("[data-field]");

  contactFields.forEach((field) => {
    const input = field.querySelector("input, textarea");
    input.addEventListener("blur", () => validateContactField(field));
    input.addEventListener("input", () => {
      if (field.classList.contains("has-error")) {
        validateContactField(field);
      }
    });
  });

  contactPrivacy.addEventListener("change", () => {
    contactSubmit.disabled = !contactPrivacy.checked;
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let isValid = true;
    contactFields.forEach((field) => {
      if (!validateContactField(field)) {
        isValid = false;
      }
    });

    if (!isValid || !contactPrivacy.checked) {
      return;
    }

    const submitLabel = contactSubmit.textContent;
    contactSubmit.disabled = true;
    contactSubmit.textContent = "Wird gesendet...";
    contactFeedback.textContent = "";
    contactFeedback.classList.remove("is-success", "is-error");

    try {
      const response = await fetch("./mailer.php", {
        method: "POST",
        body: new FormData(contactForm),
      });
      const result = await response.json();

      contactFeedback.textContent = result.message;
      contactFeedback.classList.add(
        result.success ? "is-success" : "is-error",
      );

      if (result.success) {
        contactForm.reset();
      }
    } catch (error) {
      contactFeedback.textContent =
        "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.";
      contactFeedback.classList.add("is-error");
    } finally {
      contactSubmit.textContent = submitLabel;
      contactSubmit.disabled = !contactPrivacy.checked;
    }
  });
}

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 600);
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
