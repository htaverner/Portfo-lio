document.addEventListener("DOMContentLoaded", () => {
  const sections = {
    home: document.getElementById("home"),
    tech: document.getElementById("tech"),
    design: document.getElementById("design"),
    fiction: document.getElementById("fiction")
  };

  const sidebarItems = document.querySelectorAll("#sidebar ul li");
  const heroText = document.getElementById("hero-text");
  const mainContent = document.getElementById("main-content");

  let currentSection = "home";
  const fadeDuration = 600;

  function sidebarLabel(id) {
    switch (id) {
      case "home": return "PORTFO<br/>LIO";
      case "tech": return "TECH<br/>WRITING";
      case "design": return "DES<br/>IGN";
      case "fiction": return "FICT<br/>ION";
      default: return "PORTFO<br/>LIO";
    }
  }

  function showSection(target) {
    if (target === currentSection) return;

    const current = sections[currentSection];
    const next = sections[target];

    // Fade out current section and hero text
    current.style.opacity = 0;
    heroText.style.opacity = 0;

    setTimeout(() => {
      // Hide current section
      current.classList.remove("active");
      current.style.display = "none";

      // Show and fade in new section
      next.style.display = "block";
      // Scroll to top of main content smoothly BEFORE fade-in
      mainContent.scrollTo({ top: 0, behavior: "smooth" });

      requestAnimationFrame(() => {
        next.classList.add("active");
        next.style.opacity = 1;
      });

      // Update hero text after fade out, then fade in
      heroText.innerHTML = sidebarLabel(target);
      requestAnimationFrame(() => {
        heroText.style.opacity = 1;
      });

      // Update sidebar highlight
      sidebarItems.forEach(item => {
        item.classList.toggle("active", item.dataset.section === target);
      });

      currentSection = target;
    }, fadeDuration);
  }

  // Initial section setup
  Object.entries(sections).forEach(([key, section]) => {
    if (key === currentSection) {
      section.classList.add("active");
      section.style.opacity = 1;
      section.style.display = "block";
    } else {
      section.classList.remove("active");
      section.style.opacity = 0;
      section.style.display = "none";
    }
  });

  heroText.innerHTML = sidebarLabel(currentSection);
  heroText.style.opacity = 1;

  // Sidebar click handling
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.dataset.section;
      showSection(target);
    });
  });

  // Optional: On load, jump to section in URL hash
  const hash = window.location.hash.replace("#", "");
  if (hash && sections[hash]) {
    showSection(hash);
  }
});
