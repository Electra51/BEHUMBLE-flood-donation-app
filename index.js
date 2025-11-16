const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

const amountButtons = document.querySelectorAll(".amount-btn");
const customAmountInput = document.getElementById("customAmount");
let selectedAmount = 200;

amountButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    amountButtons.forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    selectedAmount = parseInt(btn.dataset.amount);

    customAmountInput.value = "";
  });
});

customAmountInput.addEventListener("input", () => {
  if (customAmountInput.value) {
    amountButtons.forEach((b) => b.classList.remove("active"));
    selectedAmount = parseInt(customAmountInput.value) || 0;
  }
});

const donateBtn = document.getElementById("donateBtn");

donateBtn.addEventListener("click", () => {
  const amount = customAmountInput.value || selectedAmount;

  if (amount && amount > 0) {
    alert(
      `Thank you for your generous donation of ৳${amount}! 🙏\n\nYour contribution will help flood-affected families.\n\nRedirecting to payment gateway...`
    );
  } else {
    alert("Please select or enter a donation amount.");
  }
});

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

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    navbar.style.backgroundColor = "rgba(6, 6, 22, 0.98)";
  } else {
    navbar.style.backgroundColor = "rgba(6, 6, 22, 0.95)";
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 70;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

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

const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
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
