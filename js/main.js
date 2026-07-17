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
