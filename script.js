// ─── SCROLL REVEAL (único, usando IntersectionObserver) ───────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -80px 0px"
});

document.querySelectorAll('.reveal, .fade-in').forEach(el => revealObserver.observe(el));


// ─── CONTADOR ANIMADO (via IntersectionObserver, reanima ao voltar) ────────────
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".numero").forEach(counter => {
        const target = +counter.getAttribute("data-valor");
        let count = 0;
        counter.innerText = "0";

        const update = () => {
          const increment = target / 80;
          if (count < target) {
            count = Math.min(count + increment, target);
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        };
        update();
      });
    }
  });
}, { threshold: 0.3 });

const resultadosSection = document.getElementById("resultados");
if (resultadosSection) counterObserver.observe(resultadosSection);


// ─── NAVBAR: oculta ao scrollar para baixo, aparece ao subir ──────────────────
let lastScrollY = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  if (current > lastScrollY && current > 80) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }

  // active link highlight
  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120 && top > -200) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });

  lastScrollY = current;
}, { passive: true });


// ─── MODAL: abrir, fechar com botão, Esc e clique fora ────────────────────────
let servicoSelecionado = "";

function abrirModal(servico) {
  servicoSelecionado = servico;

  const titulos = {
    iphone: "🍎 Recuperação de iPhone",
    formatacao: "💻 Formatação & Sistema",
    virus: "🛡️ Remoção de Vírus",
    android: "🔓 Desbloqueio Android"
  };

  document.getElementById("tituloServico").innerText = titulos[servico] || servico;
  const modal = document.getElementById("modalServico");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // foca no primeiro input para acessibilidade
  setTimeout(() => document.getElementById("nome")?.focus(), 100);
}

function fecharModal() {
  const modal = document.getElementById("modalServico");
  modal.style.display = "none";
  document.body.style.overflow = "";

  // limpa os campos
  ["nome", "modelo", "descricao"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

// Fechar com Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharModal();
});

// Fechar ao clicar fora do conteúdo
document.getElementById("modalServico")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) fecharModal();
});

function enviarWhatsApp() {
  const nome = document.getElementById("nome").value.trim();
  const modelo = document.getElementById("modelo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (!nome || !descricao) {
    alert("Por favor, preencha ao menos seu nome e a descrição do problema.");
    return;
  }

  const msg = `Olá, me chamo ${nome}.\nServiço: ${servicoSelecionado}\nModelo: ${modelo || "Não informado"}\nProblema: ${descricao}`;
  const url = `https://wa.me/5546999711937?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}


// ─── MENU MOBILE: toggle ──────────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

// Fechar menu ao clicar em link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

