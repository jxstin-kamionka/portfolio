/* ==========================================================================
   SPRACHUMSCHALTER (DE/EN)
   Reiner Button-Zustand hier; das eigentliche Übersetzen von Texten/
   Attributen übernimmt applyLanguage() in js/translate.js, das an
   dieselben .lang-btn-Elemente einen eigenen Click-Listener hängt.
   ========================================================================== */
const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    langButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

/* ==========================================================================
   MOBILES BURGER-MENÜ
   Schaltet .is-open auf Button + Menü um (Optik/Animation via respo.css)
   und sperrt das Body-Scrolling, solange das Menü offen ist. Ein Klick auf
   einen Link oder Sprach-Button schließt das Menü automatisch wieder.
   ========================================================================== */
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

/* ==========================================================================
   SCROLL-REVEAL
   Beobachtet jedes Element mit der Klasse ".box" und fügt beim ersten
   Erreichen der Sichtbarkeitsschwelle die Klasse "sichtbar" hinzu, die in
   css/animation.css das eigentliche Einblenden (Fade + Slide-up) auslöst.
   Danach wird das Element abgemeldet (unobserve) - die Animation läuft
   also nur einmal, nicht bei jedem erneuten Scrollen ins Sichtfeld.
   rootMargin zieht die untere Erkennungskante 15% nach oben, daher feuert
   der Observer schon, sobald ein Element von unten ins Bild ragt, statt
   erst bei 25% sichtbarer Fläche (das wirkte bei hohen Sections zu spät).
   ========================================================================== */
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
      threshold: 0,
      rootMargin: "0px 0px -15% 0px",
    },
  );

  alleBoxen.forEach((box) => {
    observer.observe(box);
  });
});

/* ==========================================================================
   PORTFOLIO SCROLL-SLIDESHOW
   .portfolio-list ist eine 300vh hohe Scrollstrecke; .portfolio-sticky bleibt
   währenddessen als volle Bildschirmhöhe fixiert (position: sticky). Beim
   normalen Runterscrollen wird anhand der Scroll-Position innerhalb dieser
   Strecke berechnet, welches der drei Projekte gerade "aktiv" ist, und per
   Klassenwechsel eingeblendet (Opacity-Transition in style.css).
   ========================================================================== */
const portfolioTrack = document.querySelector(".portfolio-list");
const portfolioItems = document.querySelectorAll(
  ".portfolio-list .portfolio-item",
);

function updatePortfolioActive() {
  if (!portfolioTrack || !portfolioItems.length) return;

  const rect = portfolioTrack.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const progress =
    scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
  const activeIndex = Math.min(
    portfolioItems.length - 1,
    Math.floor(progress * portfolioItems.length),
  );

  portfolioItems.forEach((item, index) => {
    item.classList.toggle("is-active", index === activeIndex);
  });
}

if (portfolioTrack) {
  window.addEventListener("scroll", updatePortfolioActive, { passive: true });
  window.addEventListener("resize", updatePortfolioActive);
  updatePortfolioActive();
}

/* ==========================================================================
   TESTIMONIALS SLIDER (KORRIGIERT & ERWEITERT)
   ========================================================================== */
const testimonialText = document.getElementById("testimonialText");
const testimonialAuthor = document.getElementById("testimonialAuthor");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialPrev = document.getElementById("testimonialPrev");
const testimonialNext = document.getElementById("testimonialNext");

let currentTestimonial = 0;

/**
 * Liest die drei Testimonial-Texte/-Autoren über window.i18n (translate.js).
 * Falls i18n noch nicht bereit ist oder einen Key unübersetzt zurückgibt,
 * springt ein fest hinterlegter deutscher Fallback-Text ein, damit die
 * Slider-Karte nie leer bleibt.
 * @returns {{text: string, author: string}[]}
 */
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

/**
 * Wechselt zur Testimonial-Karte an `index` (mit Wraparound in beide
 * Richtungen). Blendet die Karte kurz aus (siehe .is-fading in
 * css/animation.css), tauscht währenddessen Text/Autor/Dots aus und blendet
 * wieder ein - so wirkt der Wechsel weich statt abrupt.
 * @param {number} index Zielindex, darf auch < 0 oder >= Anzahl sein
 */
function showTestimonial(index) {
  const testimonials = getTestimonials();
  if (!testimonials.length || !testimonialText) return; // Sicherheits-Check

  currentTestimonial = (index + testimonials.length) % testimonials.length;
  const testimonial = testimonials[currentTestimonial];
  const card = testimonialText.closest(".testimonial-card");

  const applyContent = () => {
    testimonialText.textContent = testimonial.text;
    testimonialAuthor.textContent = testimonial.author;

    testimonialDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === currentTestimonial);
    });

    if (card) card.classList.remove("is-fading");
  };

  if (card) {
    card.classList.add("is-fading");
    window.setTimeout(applyContent, 200);
  } else {
    applyContent();
  }
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


/* ==========================================================================
   KONTAKTFORMULAR
   Client-seitige Validierung (Pflichtfelder + E-Mail-Format) mit
   sprachabhängigen Fehlermeldungen; der eigentliche Versand läuft per
   fetch() gegen mailer.php (serverseitiges PHP-Skript, nicht Teil dieses
   Repos). Der Submit-Button bleibt deaktiviert, bis die Datenschutz-
   Checkbox aktiv ist.
   ========================================================================== */
const contactForm = document.getElementById("contactForm");
const contactPrivacy = document.getElementById("contactPrivacy");
const contactSubmit = document.getElementById("contactSubmit");
const contactFeedback = document.getElementById("contactFeedback");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Kurzform für eine i18n-Übersetzung; liefert "" statt eines rohen Keys,
 *  solange translate.js noch nicht initialisiert ist. */
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

/** Zeigt/versteckt die Fehlermeldung eines Formularfelds (leerer String = kein Fehler). */
function setFieldError(field, message) {
  const errorEl = field.querySelector(".contact-field-error");
  field.classList.toggle("has-error", Boolean(message));
  errorEl.textContent = message;
}

/**
 * Validiert ein einzelnes Formularfeld anhand seines `data-field`-Attributs
 * gegen `contactValidators` und zeigt einen eventuellen Fehler direkt an.
 * @param {HTMLElement} field Wrapper-Element mit data-field + input/textarea
 * @returns {boolean} true, wenn das Feld gültig ist
 */
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

/* ==========================================================================
   SCROLL-TO-TOP-BUTTON
   Blendet den Button erst nach 600px Scrolltiefe ein (.visible in style.css)
   und scrollt bei Klick sanft zurück nach oben.
   ========================================================================== */
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 600);
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
