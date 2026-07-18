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

/* ==========================================================================
   TESTIMONIALS SLIDER (KORRIGIERT & ERWEITERT)
   ========================================================================== */
const testimonialText = document.getElementById("testimonialText");
const testimonialAuthor = document.getElementById("testimonialAuthor");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");

let currentTestimonial = 0;

function getTestimonials() {
  // Fallback-Texte, falls i18n noch nicht geladen ist oder leere Strings liefert
  const t = window.i18n ? window.i18n.t : () => "";
  
  return [0, 1, 2].map((index) => {
    const textKey = `testimonials.${index}.text`;
    const authorKey = `testimonials.${index}.author`;
    
    // Holt die Übersetzung. Falls i18n fehlschlägt, nutzen wir einen soliden Fallback-Text
    let text = t(textKey);
    let author = t(authorKey);

    // WICHTIG: Falls i18n den Key selbst zurückgibt oder leer ist, 
    // setzen wir einen temporären deutschen Standardtext ein
    if (!text || text === textKey) {
      const fallbacks = [
        "Die Zusammenarbeit lief absolut reibungslos. Besonders beeindruckt hat mich die strukturierte Arbeitsweise.",
        "Ein fantastischer Teampartner mit einem extrem hohen Qualitätsanspruch. Jederzeit gerne wieder!",
        "Kreative Denkansätze gepaart mit starkem technischem Know-how. Hat unser Projekt entscheidend nach vorne gebracht."
      ];
      const authors = ["Sarah Lehmann - Project Manager", "Michael Klose - Developer", "Elena Rostova - Product Owner"];
      text = fallbacks[index];
      author = authors[index];
    }

    return { text, author };
  });
}

function showTestimonial(index) {
  const testimonials = getTestimonials();
  if (!testimonials.length || !testimonialText) return; // Sicherheits-Check

  currentTestimonial = (index + testimonials.length) % testimonials.length;
  const testimonial = testimonials[currentTestimonial];

  testimonialText.textContent = testimonial.text;
  testimonialAuthor.textContent = testimonial.author;

  testimonialDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentTestimonial);
  });
}

// Event Listener registrieren & Initialisierung
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

  document.addEventListener("languagechange", () =>
    showTestimonial(currentTestimonial),
  );

  // NEU: Lädt das erste Testimonial direkt beim Start, sobald das DOM bereit ist
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => showTestimonial(0));
  } else {
    showTestimonial(0);
  }
}


const contactForm = document.getElementById("contactForm");
const contactPrivacy = document.getElementById("contactPrivacy");
const contactSubmit = document.getElementById("contactSubmit");
const contactFeedback = document.getElementById("contactFeedback");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function tt(key) {
  return window.i18n ? window.i18n.t(key) : "";
}

const contactValidators = {
  name: (value) =>
    value.trim() === "" ? tt("contact.validation.nameRequired") : "",
  email: (value) => {
    if (value.trim() === "") return tt("contact.validation.emailRequired");
    return emailPattern.test(value)
      ? ""
      : tt("contact.validation.emailInvalid");
  },
  message: (value) =>
    value.trim() === "" ? tt("contact.validation.messageRequired") : "",
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

  document.addEventListener("languagechange", () => {
    contactFields.forEach((field) => {
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
    contactSubmit.textContent = tt("contact.sending");
    contactFeedback.textContent = "";
    contactFeedback.classList.remove("is-success", "is-error");

    try {
      const response = await fetch("./mailer.php", {
        method: "POST",
        body: new FormData(contactForm),
      });
      const result = await response.json();

      contactFeedback.textContent = result.ok
        ? tt("contact.successMessage")
        : result.error || tt("contact.genericError");
      contactFeedback.classList.add(result.ok ? "is-success" : "is-error");

      if (result.ok) {
        contactForm.reset();
      }
    } catch (error) {
      contactFeedback.textContent = tt("contact.genericError");
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
