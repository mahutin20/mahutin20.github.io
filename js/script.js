// =========================================================
// PORTFOLIO IRÉNÉE ATISSOUSSI - V1
// =========================================================

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

// --------------------- Menu mobile ---------------------
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

mainNav.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// --------------------- Photo fallback ---------------------
const profileImage = document.getElementById("profileImage");
const portraitFallback = document.getElementById("portraitFallback");

function showImageIfAvailable() {
  if (profileImage.complete && profileImage.naturalWidth > 0) {
    profileImage.style.display = "block";
    portraitFallback.style.display = "none";
  }
}

profileImage.addEventListener("load", showImageIfAvailable);
profileImage.addEventListener("error", () => {
  profileImage.style.display = "none";
  portraitFallback.style.display = "grid";
});
showImageIfAvailable();

// --------------------- Reveal on scroll ---------------------
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

// --------------------- Back to top ---------------------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
});

// --------------------- Active nav ---------------------
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link[href^='#']")];

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const current = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (current) current.classList.add("active");
      }
    });
  },
  { rootMargin: "-42% 0px -45% 0px" }
);

sections.forEach(section => sectionObserver.observe(section));

// --------------------- Animated network background ---------------------
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let nodes = [];
let width = 0;
let height = 0;
let dpr = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.max(34, Math.floor((width * height) / 26000));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: Math.random() * 1.8 + 0.8
  }));
}

function drawNetwork() {
  ctx.clearRect(0, 0, width, height);

  // nodes
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 118, 110, 0.28)";
    ctx.fill();
  }

  // lines
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);

      if (dist < 135) {
        const alpha = (1 - dist / 135) * 0.19;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(15, 118, 110, ${alpha * 0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawNetwork);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawNetwork();


// --------------------- Project modals ---------------------
const modalTriggers = document.querySelectorAll("[data-modal]");
const projectModals = document.querySelectorAll(".project-modal");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");

function openProjectModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modalTriggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    openProjectModal(trigger.dataset.modal);
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modal = button.closest(".project-modal");
    if (modal) closeProjectModal(modal);
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    projectModals.forEach(modal => {
      if (modal.classList.contains("open")) closeProjectModal(modal);
    });
  }
});
