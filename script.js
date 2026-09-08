const loader = document.getElementById("loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 650));

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}));

const roles = ["Java Full Stack Developer", "Aspiring Software Engineer", "Frontend Developer"];
const typed = document.getElementById("typed-role");
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole(){
  const word = roles[roleIndex];
  typed.textContent = deleting ? word.slice(0, --charIndex) : word.slice(0, ++charIndex);
  let delay = deleting ? 45 : 85;
  if(!deleting && charIndex === word.length){ delay = 1400; deleting = true; }
  if(deleting && charIndex === 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }
  setTimeout(typeRole, delay);
}
setTimeout(typeRole, 900);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const subject = encodeURIComponent("Portfolio contact from " + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:moulikaallam2004@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelectorAll(".skill-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*6;
    const y = ((e.clientY-r.top)/r.height-.5)*-6;
    card.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});
