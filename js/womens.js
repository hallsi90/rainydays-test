/* 
  JavaScript for the Women's Jackets Page 
  → Fetches and displays only products with gender "female"
*/

const apiUrl = "https://v2.api.noroff.dev/rainy-days";

// Fetch only women's jackets
async function fetchWomensJackets() {
  showSpinner(); // Show spinner before fetching

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const products = result.data;

    // Filter only women's jackets
    const womensJackets = products.filter(
      (product) => product.gender && product.gender.toLowerCase() === "female"
    );

    displayProducts(womensJackets);
  } catch (error) {
    displayMessage("Error fetching women's jackets: " + error.message);
  } finally {
    hideSpinner(); // Always hide spinner after fetch completes
  }
}

// Function to display products
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear the product list before displaying new products

  // Check if products is valid
  if (!products || !Array.isArray(products) || products.length === 0) {
    displayMessage("No women's jackets found.");
    return;
  }

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    // Format the price and check if product is on sale
    const formattedPrice = formatPrice(product.price);
    const formattedDiscountedPrice = product.discountedPrice
      ? formatPrice(product.discountedPrice)
      : formattedPrice; // Use normal price if discounted price is missing

    // Build the HTML for the product display
    productDiv.innerHTML = `
    <h3>${product.title}</h3>
    <div class="image-container">
      <img src="${product.image.url}" alt="${product.image.alt}">
    </div>
    ${
      product.onSale
        ? `<div class="price-wrapper">
             <p class="discounted-price">${formattedDiscountedPrice}</p>
             <p class="original-price">${formattedPrice}</p>
             <span class="on-sale-badge">On Sale</span>
           </div>`
        : `<p class="price">${formattedPrice}</p>`
    }
  `;

    // Functionality to navigate to the product page
    productDiv.onclick = () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product/index.html"; // Redirect to product page
    };

    productList.appendChild(productDiv);
  });
}

// Call the function to fetch and display women's jackets
fetchWomensJackets();
