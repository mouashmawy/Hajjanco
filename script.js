const navItems = [
  ["home", "Home", "index.html"],
  ["solutions", "Solutions", "solutions.html"],
  ["equipment", "Equipment & Systems", "equipment.html"],
  ["parts", "Spare Parts", "spare-parts.html"],
  ["industries", "Industries", "industries.html"],
  ["training", "Training", "training.html"],
  ["projects", "Projects", "projects.html"],
  ["about", "About", "about.html"],
  ["contact", "Contact", "contact.html"],
];

function headerMarkup(page) {
  const nav = navItems.map(([key, label, href]) =>
    `<a href="${href}" class="${page === key ? "active" : ""}">${label}</a>`
  ).join("");

  return `
    <div class="topbar">
      <div class="container">
        <span>Saudi Arabia · Industrial Solutions</span>
        <span>Operation · Maintenance · Training · Spare Parts</span>
      </div>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Hajjanco home">
          <img src="public/assets/hajjanco-logo.jpeg" alt="Hajjanco Industrial Solutions">
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Open navigation">☰</button>
        <nav class="main-nav" aria-label="Main navigation">${nav}</nav>
        <a class="header-cta" href="contact.html?type=service">Request support</a>
      </div>
    </header>`;
}

function footerMarkup() {
  return `
    <footer class="site-footer">
      <div class="container footer-main">
        <div>
          <img class="footer-logo" src="public/assets/hajjanco-logo.jpeg" alt="Hajjanco Industrial Solutions">
          <p class="footer-about">Integrated industrial solutions for operation, maintenance, technical training, engineering documentation, equipment and spare-parts support.</p>
        </div>
        <div class="footer-col">
          <h4>Capabilities</h4>
          <a href="solutions.html">Solutions</a>
          <a href="equipment.html">Equipment & Systems</a>
          <a href="spare-parts.html">Spare Parts</a>
          <a href="industries.html">Industries</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">About Hajjanco</a>
          <a href="training.html">Training</a>
          <a href="projects.html">Projects</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Start an enquiry</h4>
          <a href="contact.html?type=service">Request Service</a>
          <a href="contact.html?type=parts">Request Spare Part</a>
          <p>Saudi Arabia</p>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© <span data-year></span> Hajjanco Industrial Solutions.</span>
        <span>Pitch website · Content subject to final approval</span>
      </div>
    </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "";
  document.querySelector("[data-site-header]").innerHTML = headerMarkup(page);
  document.querySelector("[data-site-footer]").innerHTML = footerMarkup();

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });

  document.querySelectorAll(".form-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".form-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".form-panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.target)?.classList.add("active");
      const next = new URL(location.href);
      next.searchParams.set("type", tab.dataset.target === "parts-form" ? "parts" : "service");
      history.replaceState({}, "", next);
    });
  });

  const requestedType = new URLSearchParams(location.search).get("type");
  if (requestedType === "parts") {
    document.querySelector('[data-target="parts-form"]')?.click();
  }

  document.querySelectorAll("form[data-pitch-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const status = form.querySelector(".form-status");
      status.textContent = "Pitch mode: the enquiry has been prepared. Connect this form to Hajjanco's preferred email or CRM before launch.";
      status.classList.add("show");
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
