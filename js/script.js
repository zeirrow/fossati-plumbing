const testimonials = [
  {
    name: "@ Joyce Morabito",
    platform: "Google Review",
    date: "2 weeks ago",
    content:
      "Always on time. Very knowledgeable. Work done quickly and efficiently. Highly recommend!",
  },
  {
    name: "@ Susan J.",
    platform: "Google Review",
    date: "1 month ago",
    content:
      "Very happy with the service! Always a great experience. Honest and reliable!",
  },
  {
    name: "@ Michael T.",
    platform: "Facebook Review",
    date: "3 months ago",
    content:
      "Fixed our emergency leak at 9pm on a Sunday! Saved us from major water damage. Can't thank them enough!",
  },
  {
    name: "@ David L.",
    platform: "Google Review",
    date: "1 week ago",
    content:
      "Fossati is the best. Transparent pricing, quick turnaround, and great customer service.",
  },
];

const toggleBtn = document.getElementById("mobile-nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
document.addEventListener("DOMContentLoaded", () => {
  toggleBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });

  // Optional: Auto-close nav when link is clicked (for single page scroll)
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Modal functionality
  document.querySelectorAll(".service-modal-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.dataset.service;
      document.getElementById("selectedService").value = service;
      document.getElementById(
        "modalServiceTitle"
      ).textContent = `Schedule ${service} Service`;
      document.getElementById("serviceModal").classList.remove("hidden");
    });
  });

  document.getElementById("modalClose").addEventListener("click", () => {
    document.getElementById("serviceModal").classList.add("hidden");
  });

  document.getElementById("serviceForm").addEventListener("submit", (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    alert("Service scheduled successfully! We will contact you shortly.");
    document.getElementById("serviceModal").classList.add("hidden");
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === document.getElementById("serviceModal")) {
      document.getElementById("serviceModal").classList.add("hidden");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("testimonial-carousel");
  testimonials.forEach((t) => {
    const card = document.createElement("div");
    card.className =
      "min-w-[320px] max-w-[340px] snap-center bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 border border-gray-100";

    card.innerHTML = `
    <div class="bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-4 flex items-center space-x-4">
      <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
        ${t.name.trim().charAt(2).toUpperCase()}
      </div>
      <div>
        <div class="text-gray-900 font-semibold">${t.name}</div>
        <div class="text-yellow-400 text-sm flex">
          ${'<i class="fas fa-star mr-1"></i>'.repeat(5)}
        </div>
      </div>
    </div>

    <div class="px-6 py-5 relative">
      <i class="fas fa-quote-left text-blue-300 text-3xl absolute top-4 left-4 opacity-20"></i>
      <p class="text-gray-700 italic leading-relaxed ml-6 mt-2 mb-4">"${
        t.content
      }"</p>
      <div class="flex justify-between text-sm text-gray-500 pt-2 border-t">
        <span>${t.platform}</span>
        <span>${t.date}</span>
      </div>
    </div>
  `;
    container.appendChild(card);
  });
  function scrollCarousel(direction) {
    const scrollAmount = 320 + 24; // Card width + gap
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Enhanced Intersection Observer with more options
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const animation = el.dataset.animate || "fade-up";
          const delay = el.dataset.delay || "0";
          const duration = el.dataset.duration || "700";
          const easing = el.dataset.ease || "ease-out";

          // Reset all potential animation classes first
          el.classList.remove(
            "opacity-0",
            "translate-y-10",
            "translate-y-20",
            "translate-x-10",
            "translate-x-20",
            "scale-90",
            "scale-95",
            "scale-105",
            "rotate-6",
            "-rotate-6",
            "blur-sm"
          );

          // Apply transition properties
          el.style.transition = `all ${duration}ms ${easing} ${delay}ms`;

          // Apply specific animation classes
          switch (animation) {
            case "fade-up":
              el.classList.add("opacity-100", "translate-y-0");
              break;
            case "fade-down":
              el.classList.add("opacity-100", "-translate-y-0");
              break;
            case "fade-left":
              el.classList.add("opacity-100", "translate-x-0");
              break;
            case "fade-right":
              el.classList.add("opacity-100", "-translate-x-0");
              break;
            case "zoom-in":
              el.classList.add("opacity-100", "scale-100");
              break;
            case "zoom-out":
              el.classList.add("opacity-100", "scale-100");
              break;
            case "flip-in":
              el.classList.add("opacity-100", "rotate-0");
              break;
            case "blur-in":
              el.classList.add("opacity-100", "blur-none");
              break;
            case "jack-in":
              el.classList.add("opacity-100", "scale-100", "rotate-0");
              break;
          }

          // Add a one-time event listener for animation end
          const handleAnimationEnd = () => {
            el.style.transition = "";
            el.removeEventListener("transitionend", handleAnimationEnd);
          };
          el.addEventListener("transitionend", handleAnimationEnd);

          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px", // Trigger when 50px from bottom of viewport
    }
  );

  // Initialize all animatable elements
  document.querySelectorAll("[data-animate]").forEach((el) => {
    // Set initial state based on animation type
    const animation = el.dataset.animate;

    el.classList.add("opacity-0", "transition-all");

    switch (animation) {
      case "fade-up":
        el.classList.add("translate-y-10");
        break;
      case "fade-down":
        el.classList.add("-translate-y-10");
        break;
      case "fade-left":
        el.classList.add("translate-x-10");
        break;
      case "fade-right":
        el.classList.add("-translate-x-10");
        break;
      case "zoom-in":
        el.classList.add("scale-95");
        break;
      case "zoom-out":
        el.classList.add("scale-105");
        break;
      case "flip-in":
        el.classList.add("rotate-6");
        break;
      case "blur-in":
        el.classList.add("blur-sm");
        break;
      case "jack-in":
        el.classList.add("scale-90", "-rotate-6");
        break;
    }

    observer.observe(el);
  });
});
