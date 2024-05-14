const dishesFavouriteContainer = document.getElementById("dishesFavouriteContainer");
const dishesAllContainer = document.getElementById("dishesAllContainer");
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
                   <img src="./src/img/add_icon.png" alt="add icon" class="add-icon" />
                </div>
             </div>
             <div class="dishes-single-description">
                ${product.productDescription ? product.productDescription : ""}
             </div>
             <div class="dishes-single-price"><span id="dishPrice">${product.productPrice.toFixed(2)}</span>€</div>
          </div>`;
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
                    <img src="./src/img/add_icon.png" alt="add icon" class="add-icon" />
                 </div>
              </div>
              <div class="dishes-single-description">
                 ${product.productDescription ? product.productDescription : ""}
              </div>
              <div class="dishes-single-price"><span id="dishPrice">${product.productPrice.toFixed(2)}</span>€</div>
           </div>`;
      }
   }
}
