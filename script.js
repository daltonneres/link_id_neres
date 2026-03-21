const elements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active'); // anima saída também
    }
  });
}, {
  threshold: 0.1, // ativa mais cedo
  rootMargin: "0px 0px -100px 0px" // ativa antes de chegar no final da tela
});

elements.forEach(el => observer.observe(el));