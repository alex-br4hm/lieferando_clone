const dishesFavouriteContainer = document.getElementById("dishesFavouriteContainer");
const dishesAllContainer = document.getElementById("dishesAllContainer");
const shoppingCartContainer = document.getElementById("shoppingCartContainer");
const shoppingCartProductContainer = document.getElementById("shoppingCartProductContainer");
const costsContainer = document.getElementById("costsContainer");
const searchBarContainer = document.getElementById("searchBarContainer");
renderFavouriteProducts();
renderAllProducts();

function renderFavouriteProducts() {
   dishesFavouriteContainer.innerHTML = "";
   for (let i = 0; i < 1; i++) {
      dishesFavouriteContainer.innerHTML += ` 
      <h2 class="headline-favourits-icon">${products[i].category}
      <img src="./src/img/heart_liked.png" alt="heart icon" /></h2>`;
      let categoryProducts = products[i].categoryProducts;
      for (let j = 0; j < categoryProducts.length; j++) {
         let product = categoryProducts[j];
         dishesFavouriteContainer.innerHTML += `
          <div class="dishes-single-wrapper">
             <div class="dishes-single-head-wrapper">
                <h3 class="dishes-single-headline">
                   ${product.productName}<img src="./src/img/info_icon.png" alt="information icon" />
                </h3>
                <div class="counter-icon">
                   <img src="./src/img/add_icon.png" alt="add icon" class="add-icon" onclick="addToShoppingCart('${product.productName}', ${product.productPrice})"/>
                </div>
             </div>
             <div class="dishes-single-description">
                ${product.productDescription}
             </div>
             <div class="dishes-single-price"><span id="dishPrice">${product.productPrice}</span>€</div>
          </div>
          `;
      }
   }
}

function renderAllProducts() {
   dishesAllContainer.innerHTML = "";
   for (let i = 1; i < products.length; i++) {
      dishesAllContainer.innerHTML += ` 
       <img src="${products[i].imgSrc}.png" alt="" id="${products[i].id}"/>
       <h2 class="headline-favourits-icon">${products[i].category}
       <img src="./src/img/heart_liked.png" alt="heart icon" /></h2>`;
      let categoryProducts = products[i].categoryProducts;
      for (let j = 0; j < categoryProducts.length; j++) {
         let product = categoryProducts[j];
         dishesAllContainer.innerHTML += `
           <div class="dishes-single-wrapper">
              <div class="dishes-single-head-wrapper">
                 <h3 class="dishes-single-headline">
                    ${product.productName}<img src="./src/img/info_icon.png" alt="information icon" />
                 </h3>
                 <div class="counter-icon">
                    <img src="./src/img/add_icon.png" alt="add icon" class="add-icon" onclick="addToShoppingCart('${
                       product.productName
                    }', ${product.productPrice})"/>
                 </div>
              </div>
              <div class="dishes-single-description">
                 ${product.productDescription ? product.productDescription : ""}
              </div>
              <div class="dishes-single-price"><span id="dishPrice">${product.productPrice}</span>€</div>
           </div>`;
      }
   }
}

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
      let newShoppingCartProduct = {
         "itemName": productName,
         "itemPrice": productPriceFloat,
         "itemAmount": 1,
      };
      shoppingCartProducts.push(newShoppingCartProduct);
   }

   renderShoppingCart();
}

function renderShoppingCart() {
   calculateCosts();
   if (shoppingCartProducts.length === 0) {
      shoppingCartEmptyStandard();
   } else if (shoppingCartProducts.length > 3) {
      shoppingCartOverloadPrevention();
   } else shoppingCartStopOverloadPrevention();

   shoppingCartProductContainer.innerHTML = "";
   for (let i = 0; i < shoppingCartProducts.length; i++) {
      shoppingCartProductContainer.innerHTML += `
           <div class="selected-dish-head">
              <div class="selected-dish-head-left">
                 <div class="selected-dish-count">${shoppingCartProducts[i].itemAmount}</div>
                 <div class="selected-dish-name">${shoppingCartProducts[i].itemName}</div>
              </div>
              <div class="selected-dish-price"><span>${shoppingCartProducts[i].itemPrice}</span>€</div>
           </div>
           <div class="selected-dish-bottom">
              <div class="selected-dish-addcomment">Anmerkung hinzufügen</div>
              <div class="selected-dish-left-counter">
                 <div class="selected-dish-counter-icon">
                    <img src="./src/img/remove_icon.png" alt="remove icon" onclick="removeItemFromShoppingCart(${i})"/>
                 </div>
                 <div class="selected-dish-price"><span>${shoppingCartProducts[i].itemAmount}</span></div>
                 <div class="selected-dish-counter-icon"><img src="./src/img/add_icon.png" alt="add icon" onclick="increaseQuantityFromItem(${i})"/></div>
              </div>
           </div>
        `;
   }
}

function shoppingCartOverloadPrevention() {
   costsContainer.classList.add("overload-prevention-costs");
   shoppingCartProductContainer.classList.add("overload-prevention-cart-products");
}

function shoppingCartStopOverloadPrevention() {
   costsContainer.classList.remove("overload-prevention-costs");
   shoppingCartProductContainer.classList.remove("overload-prevention-cart-products");
}

function shoppingCartEmptyStandard() {
   costsContainer.innerHTML = `
   <div class="empty-shopping-cart">
   <img src="./src/img/shopping_bag.png" alt="shopping bag icon" />
   <h2>Fülle deinen Warenkorb</h2>
   <div>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</div>
   </div>
   `;
}

function increaseQuantityFromItem(i) {
   shoppingCartProducts[i].itemAmount = parseFloat(shoppingCartProducts[i].itemAmount) + 1;
   console.table(shoppingCartProducts);
   renderShoppingCart();
}

function removeItemFromShoppingCart(i) {
   if (shoppingCartProducts[i].itemAmount > 1) {
      shoppingCartProducts[i].itemAmount = parseFloat(shoppingCartProducts[i].itemAmount) - 1;
      renderShoppingCart();
   } else {
      shoppingCartProducts.splice(i, 1);
      renderShoppingCart();
   }
}

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
}

function renderCosts(subTotal, costsTotal) {
   costsContainer.innerHTML = "";
   const formattedSubTotal = subTotal.toFixed(2);
   const formattedCostsTotal = costsTotal.toFixed(2);

   costsContainer.innerHTML = `
       <div class="costs-sum-wrapper costs-wrapper">
          <div>Zwischensumme</div>
          <div class="costs-sum"><span>${formattedSubTotal}</span>€</div>
       </div>
       <div class="costs-delivery-wrapper costs-wrapper">
          <div>Lieferkosten</div>
          <div class="costs-sum"><span>0.49</span>€</div>
       </div>
       <div class="costs-service-wrapper costs-wrapper">
          <div>Servicegebühr <img src="./src/img/info_icon.png" alt="info_icon" /></div>
          <div class="costs-sum"><span>0.99</span>€</div>
       </div>
       <div class="costs-all-wrapper costs-wrapper">
          <div>Gesamt</div>
          <div class="costs-sum"><span>${formattedCostsTotal}</span>€</div>
       </div>
       <div class="pay-button" onclick="sendOrderSucces()">
          <div>Bezahlen</div>
          <div class="costs-pay-button">(<span>${formattedCostsTotal}</span>€)</div>
       </div>
    `;
}

function sendOrderSucces() {
   document.getElementById("orderSuccesContainer").classList.remove("d-none");
   shoppingCartProducts = [];
   renderShoppingCart();
}

function closeOrderSucces() {
   document.getElementById("orderSuccesContainer").classList.add("d-none");
}

window.addEventListener("scroll", function () {
   let scrollPosition = window.scrollY;

   if (scrollPosition < 60) {
      shoppingCartContainer.style.position = "absolute";
   } else {
      shoppingCartContainer.style.position = "fixed";
   }
});
