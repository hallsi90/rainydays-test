/* JavaScript for displaying products with optional gender filtering
   - Used on: index.html, jackets.html, mens.html, women.html
*/

// URL to fetch products
const apiUrl = "https://v2.api.noroff.dev/rainy-days";

// Utility function to get gender from page or dropdown (if exists)
function getGenderFromPage() {
  // If there's a select dropdown, return the selected value
  const genderDropdown = document.getElementById("gender-filter");
  if (genderDropdown) {
    return genderDropdown.value.toLowerCase(); // "all", "male", "female"
  }

  // Otherwise, use a hardcoded gender set in a data attribute
  const genderContainer = document.getElementById("product-list");
  return genderContainer?.dataset.gender || "all"; // Default to all
}

// Fetch and display products with optional gender filtering
async function fetchAndDisplayByGender(gender = "all") {
  showSpinner();

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    let products = result.data;

    // Filter by gender if not "all"
    if (gender !== "all") {
      products = products.filter(
        (product) => product.gender && product.gender.toLowerCase() === gender
      );
    }

    displayProducts(products);
  } catch (error) {
    displayMessage(`Error loading products: ${error.message}`);
  } finally {
    hideSpinner();
  }
}

// Display product cards
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  if (!products || products.length === 0) {
    displayMessage("No matching jackets found.");
    return;
  }

  products.forEach((product) => {
    const formattedPrice = formatPrice(product.price);
    const formattedDiscountedPrice = product.discountedPrice
      ? formatPrice(product.discountedPrice)
      : formattedPrice;

    const productDiv = document.createElement("div");
    productDiv.className = "product";
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

    productDiv.onclick = () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product/index.html";
    };

    productList.appendChild(productDiv);
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  const gender = getGenderFromPage();
  fetchAndDisplayByGender(gender);
});

// Listen for gender filter dropdown (if it exists)
const genderFilter = document.getElementById("gender-filter");
if (genderFilter) {
  genderFilter.addEventListener("change", (e) => {
    const selectedGender = e.target.value;
    fetchAndDisplayByGender(selectedGender);
  });
}
