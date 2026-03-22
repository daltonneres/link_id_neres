const elements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
});

elements.forEach(el => observer.observe(el));

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal, .fade-in");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// CONTADOR ANIMADO
const counters = document.querySelectorAll(".numero");
let started = false;

function startCounter() {
  const trigger = document.getElementById("resultados");

  if (!trigger) return;

  const top = trigger.getBoundingClientRect().top;

  if (top < window.innerHeight - 100 && !started) {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-valor");
      let count = 0;

      const update = () => {
        let increment = target / 100;

        if (count < target) {
          count += increment;
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });

    started = true;
  }
}

window.addEventListener("scroll", startCounter);