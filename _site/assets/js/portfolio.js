document.addEventListener("DOMContentLoaded", () => {
  const sections = {
    tech: document.getElementById("tech"),
    design: document.getElementById("design"),
    fiction: document.getElementById("fiction")
  };

  const sidebarItems = document.querySelectorAll("#sidebar ul li");
  const heroText = document.getElementById("hero-text");

  let currentSection = "tech";
  const fadeDuration = 600; // Must match CSS transition

  function sidebarLabel(id) {
    switch (id) {
      case "tech": return "TECH<br/>WRITING";
      case "design": return "DES<br/>IGN";
      case "fiction": return "FICT<br/>ION";
      default: return "PORTFO<br/>LIO";
    }
  }

  function showSection(target) {
    if (target === currentSection) return;

    // Fade out current section
    sections[currentSection].classList.remove("active");
    heroText.style.opacity = 0;

    setTimeout(() => {
      // Hide old section, show new section
      sections[target].classList.add("active");
      heroText.innerHTML = sidebarLabel(target);
      heroText.style.opacity = 1;

      // Update sidebar state
      sidebarItems.forEach(item => {
        item.classList.toggle("active", item.dataset.section === target);
      });

      currentSection = target;
    }, fadeDuration);
  }

  // Initialize visible section
  Object.entries(sections).forEach(([key, section]) => {
    if (key === currentSection) {
      section.classList.add("active");
      section.style.opacity = 1;
    } else {
      section.classList.remove("active");
      section.style.opacity = 0;
    }
  });

  // Initial hero text opacity
  heroText.style.opacity = 1;

  // Attach sidebar event listeners
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => {
      showSection(item.dataset.section);
    });
  });
});
