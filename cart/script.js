// Example - cart.js (cart page JavaScript)
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
  });

const subtotal = () => {
    const arr = JSON.parse(window.localStorage.getItem('cartProducts'));
    let sum = 0;
    arr.forEach((prod) => {
        let price = prod.ProductTitle;
        sum += parseFloat(price.replace(/[^\d.-]/g, ''));
    })
    const total = document.querySelector('.total__amount');
    window.localStorage.setItem('amount',sum);
    total.innerHTML = `<span>$ ${sum}</span>`;
}

const removeFromCart = (event) => {
    const productItem = event.target.parentNode;
    const mytitle = productItem.querySelector('.price > span').textContent;
    
    const cartDiv = document.querySelector('.cart__products');
    const updatedCartItem = [];

    let Allproduct = cartDiv.querySelectorAll('.product');

    let flag = false;

    Allproduct.forEach((prod) => {
        const currTitle = prod.querySelector('.price > span').textContent;
        if(!flag &&currTitle == mytitle) {
            cartDiv.removeChild(prod);
            flag = true;
        }else {
            const imgLink = prod.querySelector('img').getAttribute('src');
            const prodTitle = prod.querySelector('.title > span').textContent; 
            const prodPrice = prod.querySelector('.price > span').textContent; 
            const info = {"ImgLink":imgLink,"ProductTitle":prodTitle,"ProductPrice":prodPrice};
            updatedCartItem.push(info);
        }
    })

    const checkoutList = document.querySelector('.products__list');
    const allCheckout = checkoutList.querySelectorAll('.list__item');
    
    let flag2 = false;
    allCheckout.forEach((prod) => {
        const thisTitle = prod.querySelector('.tle').textContent;
        console.log(thisTitle);
        if(!flag2 && mytitle == thisTitle) {
            checkoutList.removeChild(prod);
            flag2 = true;
        }
    })

    console.log(updatedCartItem);
    window.localStorage.setItem('cartProducts',JSON.stringify(updatedCartItem));

    subtotal();
}

function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartProducts')) || [];

    const cartDiv = document.querySelector('.cart__products');
    const checkoutDiv = document.querySelector('.products__list');

    cartItems.forEach((item) =>{
        const product = document.createElement('div');
        product.className = 'product';

        product.innerHTML = `<div class="image">
                                <img src=${item.ImgLink} alt="img">
                            </div>
                            <div class="details">
                                <div class="title">
                                <span>${item.ProductTitle}</span>
                                </div>
                                <div class="price">
                                <span>${item.ProductPrice}</span>
                                </div>
                            </div>
                            <button class="cart__remove">Remove from Cart</button>`;
        
        product.querySelector('.cart__remove').addEventListener('click',(event) => removeFromCart(event));

        cartDiv.appendChild(product);

        
        const add = document.createElement('div');
        add.className = "list__item";
        add.innerHTML = `<div class="tle"><span>${item.ProductPrice}</span></div>
                         <div><span>${item.ProductTitle}</span></div>`
        checkoutDiv.appendChild(add);
    })
    
    subtotal();
}

document.querySelector('.checkout__button').addEventListener('click',() => {
    window.location.assign('../razorpay/index.html');
})


document.querySelector('.home').addEventListener('click',() => {
    window.location.assign('../index.html');
})

document.querySelector('.mycart').addEventListener('click',()=> {
    window.location.assign('./index.html');
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