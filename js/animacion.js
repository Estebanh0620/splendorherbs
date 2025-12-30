document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-from-center");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.3
  });

  elements.forEach(el => observer.observe(el));
});
