function renderFavouriteProductsHTML(products, i) {
   dishesFavouriteContainer.innerHTML += `
       <h2 class="headline-favourits-icon" id="favourits">${products[i].category}
       <img src="./src/img/heart_liked.png" alt="heart icon" /></h2>`;

   let categoryProducts = products[i].categoryProducts;
   for (let j = 0; j < categoryProducts.length; j++) {
      let product = categoryProducts[j];
      dishesFavouriteContainer.innerHTML += `
           <div class="dishes-single-wrapper">
               <div class="dishes-single-head-wrapper">
                   <h3 class="dishes-single-headline">
                       ${product.productName}
                       <img src="./src/img/info_icon.png" alt="information icon" />
                   </h3>
                   <div class="counter-icon" onclick="addToShoppingCart('${product.productName}', ${
         product.productPrice
      })">
                       <img src="./src/img/add_icon.png" alt="add icon" class="add-icon" />
                   </div>
               </div>
               <div class="dishes-single-description">
                   ${product.productDescription ? product.productDescription : ""}
               </div>
               <div class="dishes-single-price"><span id="dishPrice">${product.productPrice}</span>€</div>
           </div>`;
   }
}

function renderAllProductsHeadHTML(products, i) {
   dishesAllContainer.innerHTML += `
       <img src="${products[i].imgSrc}.png" alt="" id="${products[i].id}"/>
       <h2 class="headline-favourits-icon">${products[i].category}
       <img src="./src/img/heart_liked.png" alt="heart icon" /></h2>`;
}

function renderAllProductsContentHTML(product) {
   dishesAllContainer.innerHTML += `
       <div class="dishes-single-wrapper">
           <div class="dishes-single-head-wrapper">
               <h3 class="dishes-single-headline">
                   ${product.productName}
                   <img src="./src/img/info_icon.png" alt="information icon" />
               </h3>
               <div class="counter-icon" onclick="addToShoppingCart('${product.productName}', ${product.productPrice})">
                   <img src="./src/img/add_icon.png" alt="add icon" class="add-icon" />
               </div>
           </div>
           <div class="dishes-single-description">
               ${product.productDescription ? product.productDescription : ""}
           </div>
           <div class="dishes-single-price"><span id="dishPrice">${product.productPrice}</span>€</div>
       </div>`;
}

function renderShoppingCartHTML(i, subtotalItem) {
   shoppingCartProductContainer.innerHTML += `
       <div class="selected-dish-head">
           <div class="selected-dish-head-left">
               <div class="selected-dish-count">${shoppingCartProducts[i].itemAmount}</div>
               <div class="selected-dish-name">${shoppingCartProducts[i].itemName}</div>
           </div>
           <div class="selected-dish-price"><span>${subtotalItem}</span>€</div>
       </div>
       <div class="selected-dish-bottom">
           <div class="selected-dish-addcomment">Anmerkung hinzufügen</div>
           <div class="selected-dish-left-counter">
               <div class="selected-dish-counter-icon">
                   <img src="./src/img/remove_icon.png" alt="remove icon" onclick="removeItemFromShoppingCart(${i})"/>
               </div>
               <div class="selected-dish-price"><span>${shoppingCartProducts[i].itemAmount}</span></div>
               <div class="selected-dish-counter-icon">
                   <img src="./src/img/add_icon.png" alt="add icon" onclick="increaseQuantityFromItem(${i})"/>
               </div>
           </div>
       </div>`;
}

function shoppingCartEmptyStandardHTML() {
   costsContainer.innerHTML = `
       <div class="empty-shopping-cart">
           <img src="./src/img/shopping_bag.png" alt="shopping bag icon" />
           <h2>Fülle deinen Warenkorb</h2>
           <div>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</div>
       </div>`;
}

function renderCostsHTML(formattedSubTotal, formattedCostsTotal) {
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
       </div>`;
}

function renderShoppingCartBtnMobileHTML(formattedCostsTotal) {
   shoppingCartBtnContainer.innerHTML = `
       <div class="shopping-cart-btn-mobile pay-button" onclick="openShoppingCart()">
           <div class="shopping-bag-counter">
               <img src="./src/img/shopping_bag.png" alt="" />
               <span>${shoppingCartProducts.length}</span>
           </div>
           Warenkorb<span>(${formattedCostsTotal}€)</span>
       </div>`;
}
