const dishesFavouriteContainer = document.getElementById("dishesFavouriteContainer");
const dishesAllContainer = document.getElementById("dishesAllContainer");
const shoppingCartContainer = document.getElementById("shoppingCartContainer");
const shoppingCartProductContainer = document.getElementById("shoppingCartProductContainer");
const costsContainer = document.getElementById("costsContainer");
const searchBarContainer = document.getElementById("searchBarContainer");
const shoppingCartBtnContainer = document.getElementById("shoppingCartBtnContainer");
const shoppingCartContainerMobile = document.getElementById("shoppingCartContainerMobile");
const shoppingCartProductContainerMobile = document.getElementById("shoppingCartProductContainerMobile");
const costsContainerMobile = document.getElementById("costsContainerMobile");
const shoppingCartOverloadClass = "overload-prevention-costs";

renderFavouriteProducts();
renderAllProducts();
renderShoppingCartBtnMobile();

// Render functions on page load

function renderFavouriteProducts() {
   dishesFavouriteContainer.innerHTML = "";
   for (let i = 0; i < 1; i++) {
      renderFavouriteProductsHTML(products, i);
   }
}

function renderAllProducts() {
   dishesAllContainer.innerHTML = "";
   for (let i = 1; i < products.length; i++) {
      renderAllProductsHeadHTML(products, i);
      let categoryProducts = products[i].categoryProducts;
      for (let j = 0; j < categoryProducts.length; j++) {
         let product = categoryProducts[j];
         renderAllProductsContentHTML(product);
      }
   }
}

// add Item to shopping cart

function addToShoppingCart(productName, productPrice) {
   let productPriceFloat = parseFloat(productPrice).toFixed(2);
   let itemAlreadyExists = false;
   for (let i = 0; i < shoppingCartProducts.length; i++) {
      if (shoppingCartProducts[i].itemName === productName) {
         shoppingCartProducts[i].itemAmount++;
         itemAlreadyExists = true;
         break;
      }
   }
   if (!itemAlreadyExists) {
      generateNewShoppingCartItem(productName, productPriceFloat);
   }
   renderShoppingCart();
   renderShoppingCartMobile();
}

function generateNewShoppingCartItem(productName, productPriceFloat) {
   let newShoppingCartProduct = {
      "itemName": productName,
      "itemPrice": productPriceFloat,
      "itemAmount": 1,
   };
   shoppingCartProducts.push(newShoppingCartProduct);
}

// Render function when changing the content of the shopping cart

function renderShoppingCart() {
   checkShoppingCartProductsAmount();
   shoppingCartProductContainer.innerHTML = "";
   for (let i = 0; i < shoppingCartProducts.length; i++) {
      renderShoppingCartHTML(i);
   }
}

function renderShoppingCartMobile() {
   checkShoppingCartProductsAmount();
   shoppingCartProductContainerMobile.innerHTML = "";
   for (let i = 0; i < shoppingCartProducts.length; i++) {
      renderShoppingCartMobileHTML(i);
   }
}

function checkShoppingCartProductsAmount() {
   calculateCosts();
   if (shoppingCartProducts.length === 0) {
      shoppingCartEmptyStandardHTML();
   } else if (shoppingCartProducts.length > 3) {
      shoppingCartOverloadPrevention();
   } else shoppingCartStopOverloadPrevention();
}

// Functions to prevent overflow when the shoppingcart is too full

function shoppingCartOverloadPrevention() {
   costsContainer.classList.add("overload-prevention-costs");
   shoppingCartProductContainer.classList.add("overload-prevention-cart-products");
   shoppingCartProductContainerMobile.classList.add("overload-prevention-cart-products");
}

function shoppingCartStopOverloadPrevention() {
   costsContainer.classList.remove("overload-prevention-costs");
   shoppingCartProductContainer.classList.remove("overload-prevention-cart-products");
   shoppingCartProductContainerMobile.classList.remove("overload-prevention-cart-products");
}

// Increase and decrease the quantity of an item in the shoppingcart

function increaseQuantityFromItem(i) {
   shoppingCartProducts[i].itemAmount = parseFloat(shoppingCartProducts[i].itemAmount) + 1;
   console.table(shoppingCartProducts);
   renderShoppingCart();
   renderShoppingCartMobile();
}

function removeItemFromShoppingCart(i) {
   if (shoppingCartProducts[i].itemAmount > 1) {
      shoppingCartProducts[i].itemAmount = parseFloat(shoppingCartProducts[i].itemAmount) - 1;
      renderShoppingCart();
      renderShoppingCartMobile();
   } else {
      shoppingCartProducts.splice(i, 1);
      renderShoppingCart();
      renderShoppingCartMobile();
   }
}

// Calculate and render the order costs when something is changed in the shopping basket

function calculateCosts() {
   let subTotal = 0;
   let costsTotal = 0;
   for (let i = 0; i < shoppingCartProducts.length; i++) {
      subTotal += parseFloat(shoppingCartProducts[i].itemAmount) * parseFloat(shoppingCartProducts[i].itemPrice);
      costsTotal = subTotal + 0.49 + 0.99;
   }
   subTotal = parseFloat(subTotal.toFixed(2));
   costsTotal = parseFloat(costsTotal.toFixed(2));
   renderCosts(subTotal, costsTotal);
   renderCostsMobile(subTotal, costsTotal);
}

function renderCosts(subTotal, costsTotal) {
   costsContainer.innerHTML = "";
   const formattedSubTotal = subTotal.toFixed(2);
   const formattedCostsTotal = costsTotal.toFixed(2);
   renderCostsHTML(formattedSubTotal, formattedCostsTotal);
   renderShoppingCartBtnMobile(formattedCostsTotal);
}

function renderCostsMobile(subTotal, costsTotal) {
   costsContainerMobile.innerHTML = "";
   const formattedSubTotal = subTotal.toFixed(2);
   const formattedCostsTotal = costsTotal.toFixed(2);
   renderCostsMobileHTML(formattedSubTotal, formattedCostsTotal);
   renderShoppingCartBtnMobile(formattedCostsTotal);
}

function sendOrderSucces() {
   if (shoppingCartProducts.length > 0) {
      document.getElementById("orderSuccesContainer").classList.remove("d-none");
      shoppingCartProducts = [];
      renderShoppingCart();
      renderShoppingCartMobile();
   }
}

function closeOrderSucces() {
   document.getElementById("orderSuccesContainer").classList.add("d-none");
}

function renderShoppingCartBtnMobile(formattedCostsTotal) {
   if (shoppingCartProducts.length === 0) {
      formattedCostsTotal = "0,00";
   }
   renderShoppingCartBtnMobileHTML(formattedCostsTotal);
}

function openShoppingCartMobile() {
   shoppingCartContainerMobile.style.setProperty("display", "flex");
   renderShoppingCartMobile();
}

function closeShoppingCartMobile() {
   shoppingCartContainerMobile.style.setProperty("display", "none");
}

window.addEventListener("scroll", function () {
   let scrollPosition = window.scrollY;

   if (scrollPosition < 60) {
      shoppingCartContainer.style.position = "absolute";
   } else {
      shoppingCartContainer.style.position = "fixed";
   }
   if (window.scrollY >= 750) {
      searchBarContainer.classList.add("search-bar-wrapper-top");
   } else {
      searchBarContainer.classList.remove("search-bar-wrapper-top");
   }
});
