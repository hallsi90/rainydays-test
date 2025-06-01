/* JavaScript for the product page showing a spesific product with details */

// Retrieve the product data from local storage
const productData = JSON.parse(localStorage.getItem("selectedProduct"));

// Check if productData exists
if (productData) {
  // Set the product information in the respective elements
  document.getElementById("product-title").innerText = productData.title;
  document.getElementById("product-image").src = productData.image.url;
  document.getElementById("product-image").alt =
    productData.image.alt || productData.title;
  document.getElementById("product-description").innerText =
    productData.description;

  // Format the price using formatPrice function from common.js
  const formattedPrice = formatPrice(productData.price);

  // Check if the product is on sale and display the correct price
  if (productData.onSale) {
    const formattedDiscountedPrice = formatPrice(productData.discountedPrice);
    document.getElementById("product-price").innerHTML = `
      <div class="price-wrapper">
        <p class="discounted-price">${formattedDiscountedPrice}</p>
        <p class="original-price">${formattedPrice}</p>
        <span class="on-sale-badge">On Sale</span>
      </div>
    `;
  } else {
    document.getElementById(
      "product-price"
    ).innerHTML = `<p class="price">${formattedPrice}</p>`;
  }

  // Display sizes if available
  if (productData.sizes && productData.sizes.length > 0) {
    document.getElementById(
      "product-sizes"
    ).innerText = `Sizes: ${productData.sizes.join(", ")}`;
  } else {
    document.getElementById("product-sizes").innerText = "Sizes: Not available";
  }

  // Display the base color
  document.getElementById("product-base-color").innerText = `Color: ${
    productData.baseColor || "Not specified"
  }`;
} else {
  // Redirect back to homepage if no product is found
  console.warn("No product data found. Redirecting to the homepage.");
  window.location.href = "index.html";
}

// Event listener for Add to Cart button
const addToCartButton = document.getElementById("add-to-cart-button");
if (addToCartButton) {
  addToCartButton.addEventListener("click", () => {
    const product = {
      title: productData.title,
      price: productData.price, // Keep price as a number
      discountedPrice: productData.discountedPrice || null, // Add discounted price
      onSale: productData.onSale || false, // Add on-sale status
      imageUrl: productData.image.url,
      sizes: productData.sizes ? productData.sizes.join(", ") : "Not available", // Cleaned-up sizes
      baseColor: productData.baseColor || "Not specified", // Include base color
    };

    addToCart(product); // Calls addToCart function from cart.js
  });
}
