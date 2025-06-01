/* 
  Shared site-wide JavaScript
  - Toggles hamburger menu on mobile
  - Updates cart count on all pages
  - Displays error/success messages globally
  - Formats product prices in USD
  - Shows/hides loading spinner during data fetch
*/

/* -------------------------------
   HEADER — Hamburger Menu Toggle
-------------------------------- */

// Handle click to toggle mobile menu and overlay
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menuToggle");
  const navMenu = document.getElementById("mainNav");
  const overlay = document.getElementById("overlay");

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      toggleButton.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    // Close menu when clicking the overlay
    overlay.addEventListener("click", () => {
      toggleButton.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
    });

    // Close the menu if the window is resized
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });

    // Allow closing the menu with the Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        toggleButton.setAttribute("aria-expanded", "false");
      }
    });
  }
});

/* -------------------------------
   HEADER — Shopping cart count
-------------------------------- */

// Function to update the cart count in the header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Listen for the custom cartUpdated event
document.addEventListener("cartUpdated", updateCartCount);
// Call this function on all pages initially to set the count on load
document.addEventListener("DOMContentLoaded", updateCartCount);

/* -------------------------------
   Global — Display message alerts
-------------------------------- */

// Show temporary success or error message
function displayMessage(message, type = "error") {
  const messageContainer = document.getElementById("error-message");
  if (messageContainer) {
    messageContainer.textContent = message;
    messageContainer.style.display = "block";
    messageContainer.className = type === "success" ? "success" : "error";
    setTimeout(() => {
      messageContainer.style.display = "none";
    }, 3000);
  }
}

/* -------------------------------
   FORMAT PRODUCT PRICE
-------------------------------- */

// Function to format price to USD
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/* -------------------------------
   LOADING SPINNER
-------------------------------- */

// Function to show spinner when loading products
function showSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) {
    spinner.style.display = "block";
  }
}

// Function to hide spinner
function hideSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) {
    spinner.style.display = "none";
  }
}

/* -------------------------------
   SCROLL TO TOP BUTTON
-------------------------------- */

const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
