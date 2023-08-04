// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

//const { number } = require("prop-types");

// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

const productsDiv = document.querySelector('.products');
function rate(rating) {

  let stars = "";
  Array(Math.floor(rating)).fill().map(() => stars += "🌟")
  return stars;
} 

const colorArray = ["red","blue","green","black","white"];

function randomColor() {
  return colorArray[Math.floor(Math.random() * 5)];
}

//add to cart
let cartProducts = [];

const addToCart = (event) => {
    const myproduct = event.target.parentNode;

    const imgLink = myproduct.querySelector('img').getAttribute('src');
    const prodTitle = myproduct.querySelector('.title > span').textContent; 
    const prodPrice = myproduct.querySelector('.price__size > span').textContent; 

    console.log(imgLink,prodPrice,prodTitle);
    const info = {"ImgLink":imgLink,"ProductTitle":prodPrice,"ProductPrice":prodTitle};

    if(window.localStorage.getItem('cartProducts')) {
      cartProducts = JSON.parse(window.localStorage.getItem('cartProducts'));
    }
    cartProducts.push(info);

    window.localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
}

async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();   
    productsDiv.innerHTML = '';

    products.forEach(p => {
      const product = document.createElement('div');
      product.className = 'product';
      if(p.category == "men's clothing" || p.category == "women's clothing") {
        product.innerHTML = `<div class="image">
                              <img src=${p.image} alt="img">
                          </div>
                          <div class="details">
                              <div class="title">
                                <span>${p.title}</span>
                              </div>
                              <div class="price__size">
                              <span>$${p.price}</span>
                              <span class="colors__random">Colors:
                                <div class="circle" style="background-color: ${randomColor()}"></div>
                                <div class="circle" style="background-color: ${randomColor()}"></div>
                                <div class="circle" style="background-color: ${randomColor()}"></div>
                              </span>
                              </div>
                              <div class="category">Category: ${p.category}</div>
                              <div class="rating">rating ${rate(p.rating.rate)}</div>
                          </div>
                          <button class="add__cart">Add To Cart</button>`;
      }
      else{
        product.innerHTML = `<div class="image">
                              <img src=${p.image} alt="img">
                          </div>
                          <div class="details">
                              <div class="title">
                                <span>${p.title}</span>
                              </div>
                              <div class="price__size">
                              <span>$${p.price}</span>
                              <span>stock ${p.rating.count}</span>
                              </div>
                              <div class="category">${p.category}</div>
                              <div class="rating">rating ${rate(p.rating.rate)}</div>
                          </div>
                          <button class="add__cart">Add To Cart</button>`;
      }
      productsDiv.appendChild(product);
    });
    const addToCartButtons = document.querySelectorAll('.add__cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {addToCart(event)});
    });
}

getProducts();

const allBtn = document.querySelector('.all').addEventListener('click',getProducts);
const menBtn = document.querySelector('.mens').addEventListener('click',() => filterProducts("men's clothing"));
const womenBtn = document.querySelector('.womens').addEventListener('click',() => filterProducts("women's clothing"));
const jewel = document.querySelector('.jewellery').addEventListener('click',() => filterProducts("jewelery"));
const electronics = document.querySelector('.electronics').addEventListener('click',() => filterProducts("electronics"));

async function filterProducts(selectedCategory) {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    productsDiv.innerHTML = '';

    products.forEach(p => {
      if(p.category == selectedCategory) {
        
        const product = document.createElement('div');
        product.className = 'product';
        product.innerHTML = `<div class="image">
                                <img src=${p.image} alt="img">
                            </div>
                            <div class="details">
                                <div class="title">
                                  <span>${p.title}</span>
                                </div>
                                <div class="price__size">
                                <span>$${p.price}</span>
                                <span>stock ${p.rating.count}</span>
                                </div>
                                <div class="category">${p.category}</div>
                                <div class="rating">rating ${rate(p.rating.rate)}</div>
                            </div>
                            <button class="add__cart">Add To Cart</button>`;

        productsDiv.appendChild(product);
      }
    });
    const addToCartButtons = document.querySelectorAll('.add__cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {addToCart(event)});
    });
}


//applyFilter

const colorForm = document.getElementById('colorForm');
        const sizeForm = document.getElementById('sizeForm');
        const ratingForm = document.getElementById('ratingForm');
        const priceForm = document.getElementById('priceForm');
        const applyFilterBtn = document.getElementById('applyFilterBtn');

        // Add event listener for Apply Filter button
        applyFilterBtn.addEventListener('click', () => {

            // Example: Get selected values from colorForm
            const selectedColors = Array.from(colorForm.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value);

            // Example: Get selected values from sizeForm
            const selectedSizes = Array.from(sizeForm.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value);

            // Example: Get selected value from ratingForm
            const selectedRating = ratingForm.querySelector('input[type="range"]').value;

            // Example: Get selected values from priceForm
            const selectedPrices = Array.from(priceForm.querySelectorAll('input[type="checkbox"]:checked'))
                .map(checkbox => checkbox.value);

            // Do something with the selected filter values
            console.log('Selected Colors:', selectedColors);
            console.log('Selected Sizes:', selectedSizes);
            console.log('Selected Rating:', selectedRating);
            console.log('Selected Prices:', selectedPrices);

            const ProductsDiv = document.querySelector('.products');
            const allProducts = productsDiv.querySelectorAll('.product');
            

            const updatedProducts = [];

            allProducts.forEach((prod) => {
              let isEligible = true;

              //color
              if (selectedColors.length > 0) {
                const cat = prod.querySelector('.category').textContent;
                
                if (cat == "Category: men's clothing" || cat == "Category: women's clothing") {
                    let flagColor = false;
            
                    const circles = prod.querySelectorAll('.circle');
            
                    selectedColors.forEach((selectedColor) => {
                        const selectedHexColor = colorNameToHex(selectedColor);
            
                        circles.forEach((curCircle) => {
                            const circleStyle = getComputedStyle(curCircle);
                            const circleColor = circleStyle.backgroundColor;
                            const circleHexColor = rgbToHex(circleColor);
            
                            if (selectedHexColor.toLowerCase() === circleHexColor.toLowerCase()) {
                                flagColor = true;
                            }
                        });
                    });
            
                    if (!flagColor) {
                        isEligible = false;
                    }
                } else {
                    isEligible = false;
                }
            }
            
            function rgbToHex(rgb) {
                return "#" + rgb.match(/\d+/g).map(Number)
                    .map(component => {
                        return (component < 16 ? "0" : "") + component.toString(16);
                    }).join("");
            }
            
            function colorNameToHex(colorName) {
                const colorElem = document.createElement('div');
                colorElem.style.color = colorName;
                document.body.appendChild(colorElem);
                const computedColor = getComputedStyle(colorElem).color;
                document.body.removeChild(colorElem);
                return rgbToHex(computedColor);
            }
               
              //size

              if(selectedSizes.length > 0) {
                
              }

              //Rating
              const prodRating = prod.querySelector('.rating').textContent;
              const starCount = (prodRating.match(/🌟/g) || []).length;
              if(starCount < selectedRating) {
                isEligible = false;
              }
              //prices

              selectedPrices.forEach((curPrice) => {
                const minmax = curPrice.split('-');
            
                minmax[0] = parseFloat(minmax[0]);
                if (typeof minmax[1] === "number") minmax[1] = parseFloat(minmax[1]);
            
                const price = prod.querySelector('.price__size > span').textContent;
                const numericValue = parseFloat(price.replace('$', ''));
            
                if (minmax[0] === 100) {
                    if (!(numericValue >= 100)) {
                        isEligible = false;
                    }
                } else {
                    if (!(numericValue >= minmax[0]  && numericValue <= minmax[1])) {
                        isEligible = false;
                    }
                }
            });

              //if eligible push the product
              if(isEligible) updatedProducts.push(prod);
            })

            productsDiv.innerHTML = ``;

            updatedProducts.forEach((updatedProduct) => {
              productsDiv.appendChild(updatedProduct);
            })

            console.log(updatedProducts);

        });

//search bar
const searchInput = document.querySelector('.searchbar__box');

searchInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    const serachText = searchInput.value;
    performSearch(serachText);
  }
})

const performSearch = (serachText) => {
    async function getSearchProducts() {
      const productsDiv = document.querySelector('.products');
      const products = productsDiv.querySelectorAll('.product');  
      productsDiv.innerHTML = '';

      products.forEach((p) => {

        const curTitle = p.querySelector('.title > span').textContent;
        console.log(p);
        if(curTitle == serachText) {
          productsDiv.appendChild(p);
        }
      })
    }
    getSearchProducts();
}

//navigation

document.querySelector('.home').addEventListener('click',() => {
  window.location.assign('../index.html');
})

document.querySelector('.mycart').addEventListener('click',()=> {
  window.location.assign('../cart/index.html');
})

document.querySelector('.profile').addEventListener('click',()=> {
  window.location.assign('../profile/index.html');
})

document.querySelector('.signup').addEventListener('click',()=> {
  window.location.assign('../signup/index.html');
})

document.querySelector('.login').addEventListener('click',()=> {
  window.location.assign('../login/index.html');
})




