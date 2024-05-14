const dishesFavouriteContainer = document.getElementById("dishesFavouriteContainer");
const dishesAllContainer = document.getElementById("dishesAllContainer");
const shoppingCartContainer = document.getElementById("shoppingCartContainer");
const shoppingCartProductContainer = document.getElementById("shoppingCartProductContainer");
const costsContainer = document.getElementById("costsContainer");
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
       <img src="${products[i].imgSrc}.png" alt="" />
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
   let itemAmount = 1;
   newShoppingCartProduct = {
      "itemName": `${productName}`,
      "itemPrice": `${productPriceFloat}`,
      "itemAmount": `${itemAmount}`,
   };

   shoppingCartProducts.push(newShoppingCartProduct);
   renderShoppingCartItem();
}

function renderShoppingCartItem() {
   calculateCosts();
   shoppingCartProductContainer.innerHTML = "";
   for (let i = 0; i < shoppingCartProducts.length; i++) {
      shoppingCartProductContainer.innerHTML += `
           <div class="selected-dish-head">
              <div class="selected-dish-head-left">
                 <div class="selected-dish-count">1</div>
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
   calculateCosts();
}

function increaseQuantityFromItem(i) {
   shoppingCartProducts[i].itemAmount = parseFloat(shoppingCartProducts[i].itemAmount) + 1;
   console.table(shoppingCartProducts);
   renderShoppingCartItem();
}

function removeItemFromShoppingCart(i) {
   if (shoppingCartProducts[i].itemAmount > 1) {
      shoppingCartProducts[i].itemAmount = parseFloat(shoppingCartProducts[i].itemAmount) - 1;
      renderShoppingCartItem();
   } else {
      shoppingCartProducts.splice(i, 1);
      renderShoppingCartItem();
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
       <div class="pay-button">
          <div>Bezahlen</div>
          <div class="costs-pay-button">(<span>${formattedCostsTotal}</span>€)</div>
       </div>
    `;
}

window.addEventListener("scroll", function () {
   let scrollPosition = window.scrollY;

   if (scrollPosition < 60) {
      shoppingCartContainer.style.position = "absolute";
   } else {
      shoppingCartContainer.style.position = "fixed";
   }
});
