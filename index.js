// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// ==================== DONATION AMOUNT SELECTION ====================
const amountButtons = document.querySelectorAll(".amount-btn");
const customAmountInput = document.getElementById("customAmount");
let selectedAmount = 200; // Default

amountButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    amountButtons.forEach((b) => b.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    // Store selected amount
    selectedAmount = parseInt(btn.dataset.amount);

    // Clear custom amount input
    customAmountInput.value = "";
  });
});

// Handle custom amount input
customAmountInput.addEventListener("input", () => {
  if (customAmountInput.value) {
    // Remove active class from all buttons
    amountButtons.forEach((b) => b.classList.remove("active"));
    selectedAmount = parseInt(customAmountInput.value) || 0;
  }
});

// ==================== DONATE BUTTON ====================
const donateBtn = document.getElementById("donateBtn");

donateBtn.addEventListener("click", () => {
  const amount = customAmountInput.value || selectedAmount;

  if (amount && amount > 0) {
    alert(
      `Thank you for your generous donation of ৳${amount}! 🙏\n\nYour contribution will help flood-affected families.\n\nRedirecting to payment gateway...`
    );
    // Here you would redirect to actual payment gateway
    // window.location.href = 'payment-gateway-url';
  } else {
    alert("Please select or enter a donation amount.");
  }
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;

  if (email) {
    alert(
      `✅ Success!\n\nThank you for subscribing with ${email}.\n\nYou'll receive updates about our relief efforts.`
    );
    e.target.reset();
  }
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    navbar.style.backgroundColor = "rgba(6, 6, 22, 0.98)";
  } else {
    navbar.style.backgroundColor = "rgba(6, 6, 22, 0.95)";
  }
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip if href is just "#"
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ==================== ANIMATE ON SCROLL ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections
document
  .querySelectorAll(
    ".plan-card, .impact-card, .testimonial-card, .about-content"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ==================== COUNTER ANIMATION FOR STATS ====================
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent =
        target.toLocaleString() +
        (element.textContent.includes("K")
          ? "K+"
          : element.textContent.includes("M")
          ? "M+"
          : "+");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current).toLocaleString() +
        (element.textContent.includes("K")
          ? "K+"
          : element.textContent.includes("M")
          ? "M+"
          : "+");
    }
  }, 16);
};

// Observe stats section
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-item h3");
        statNumbers.forEach((stat, index) => {
          const text = stat.textContent;
          const hasK = text.includes("K");
          const hasM = text.includes("M");
          let number = parseInt(text.replace(/[^\d]/g, ""));

          if (hasK) number = number;
          if (hasM) number = number;

          setTimeout(() => {
            animateCounter(stat, number, 2000);
          }, index * 200);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// ==================== CONSOLE MESSAGE ====================
console.log(
  "%c🌟 Be Humble - Donation Website",
  "color: #e74c3c; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cBuilt with ❤️ for helping flood-affected families",
  "color: #3498db; font-size: 14px;"
);
console.log(
  "%cDeveloped by: Safayet Nur Electra",
  "color: #27ae60; font-size: 12px;"
);
