let container = document.querySelector('.container')
let cartContainer = document.querySelector('.cart-container')
let cart = JSON.parse(localStorage.getItem('cart')) || []
const renderCartItems = async() =>{
    const response =await fetch('../page/data.json')
    const data = await response.json()
    if(cart.length !==0){
        return(cartContainer.innerHTML = cart.map(itemCart =>{
            let search = data.find(itemData => itemData.id === Number(itemCart.id)) || []
            return `
            <div class="cart-part">
                    <div class="cart-image">
                        <img src="../${search.img}" alt="${search.title}">
                    </div>
                    <div class="description">${search.title}</div>
                    <div class="cart-quantity">
                        <input type="number" id="quantity" min="1"
                        value = "${itemCart.count}" >
                    </div>
                    <div class="cart-price">
                        <h4>${search.price}</h4>
                    </div>
                    <div class="cart-total">
                        <h4>${search.price * itemCart.count}</h4>
                    </div>
                    <div class="cart-remove">
                        <button>Remove</button>
                    </div>
                </div>
            `;
        }).join('') )

    }
    else{
        return container.innerHTML = 
        `<div class="cart-empty">
        <h2>Cart is empty</h2>
        <button class="back-btn">Back to home</button>
    </div>
        `;
    }

}
renderCartItems()
