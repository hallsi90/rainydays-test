/* This file is for the pages where you can add and/or remove a product to/from the cart */

/* -------------------------------
   SHOPPING CART
-------------------------------- */

// Function to add product to cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.title === product.title);

  if (existingProduct) {
    // Increment quantity if item is already in cart
    existingProduct.quantity += 1;
  } else {
    // If the product is not already in the cart, add it with a quantity of 1
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayMessage(`${product.title} has been added to your cart!`, "success");
  updateCartCount();
}

// Function to update the quantity of a cart item
function updateCartQuantity(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart[index];

  if (item) {
    item.quantity += delta;

    // If quantity is zero or less after the update, remove the item from the cart entirely
    if (item.quantity <= 0) {
      cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
}

// Call updateCartCount when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);
