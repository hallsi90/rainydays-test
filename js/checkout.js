/* JavaScript for the Checkout Page showing items in cart */

// Function to display cart items
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("total-price").textContent = ""; // Clear total if empty
    return;
  }

  cartItemsContainer.innerHTML = ""; // Clear container first
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const itemPrice = item.onSale
      ? parseFloat(item.discountedPrice)
      : parseFloat(item.price); // Ensure prices are parsed as numbers
    totalPrice += itemPrice * item.quantity;

    // Format the prices for display
    const formattedPrice = formatPrice(itemPrice * item.quantity);
    const formattedOriginalPrice = item.onSale
      ? formatPrice(parseFloat(item.price) * item.quantity)
      : null;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div class="cart-item-left">
        <img src="${item.imageUrl}" alt="${
      item.alt || item.title
    }" class="cart-item-image">
        <h2 class="cart-item-title">${item.title}</h2>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-button" data-index="${index}" data-delta="-1">-</button>
        <span class="quantity-number">${item.quantity}</span>
        <button class="quantity-button" data-index="${index}" data-delta="1">+</button>
      </div>
      <div class="cart-item-price-wrapper">
        ${
          item.onSale
            ? `<p class="discounted-price">${formattedPrice}</p>
               <p class="original-price">${formattedOriginalPrice}</p>
               <span class="on-sale-badge">On Sale</span>`
            : `<p class="cart-item-price">${formattedPrice}</p>`
        }
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  // Display the total price
  document.getElementById("total-price").textContent = `Total: ${formatPrice(
    totalPrice
  )}`;

  // Add event listeners for quantity buttons
  document.querySelectorAll(".quantity-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = parseInt(event.target.getAttribute("data-index"));
      const delta = parseInt(event.target.getAttribute("data-delta"));
      updateCartQuantity(index, delta); // Update quantity in cart
      displayCartItems(); // Re-render cart items with updated quantities
    });
  });
}

// Function to handle checkout process
function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the cart is empty
  if (cart.length === 0) {
    displayMessage(
      "Your cart is empty. Please add items to proceed to checkout.",
      "error"
    );
    return;
  }

  // Show the processing message
  const processingMessage = document.getElementById("processing-message");

  // Check if the processing message element exists
  if (processingMessage) {
    processingMessage.style.display = "flex"; // Display the processing message
    processingMessage.focus(); // Move focus to the processing message for accessibility
  } else {
    console.error(
      "Processing message element with ID '#processing-message' not found in DOM."
    );
  }

  // Simulate processing delay before redirection
  const redirectDelay = 2500; // Delay in milliseconds
  setTimeout(() => {
    localStorage.removeItem("cart"); // Clear the cart
    window.location.href = "./confirmation/index.html"; // Redirect to confirmation page
  }, redirectDelay); // Allows flexibility for the delay time
}

// Add event listener for the checkout button
document
  .getElementById("checkout-button")
  .addEventListener("click", handleCheckout);

// Call displayCartItems when the page loads
document.addEventListener("DOMContentLoaded", displayCartItems);
