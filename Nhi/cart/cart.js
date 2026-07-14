let container = document.querySelector('.container')
let cartContainer = document.querySelector('.cart-container')
let cart = JSON.parse(localStorage.getItem('cart')) || []
let cartSumary =document.querySelector('.cart-sumary')
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
                        <input onchange= "update(${search.id})" type="number" id="${search.id}" min="1"
                        value = "${itemCart.count}"  >
                    </div>
                    <div class="cart-price">
                        <h4>${search.price}</h4>
                    </div>
                    <div class="cart-total">
                        <h4>${search.price * itemCart.count}</h4>
                    </div>
                    <div onclick = "removeItem(${search.id})" class="cart-remove">
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
        <a href="../page/index.html"><button class="back-btn">Back to home</button></a>
        </div>
        `;
    }

}
let update = (id) =>{
    if( cart.length !== 0){
        let SearchIndex = cart.findIndex(itemCart => Number(itemCart.id) === Number(id))
        if (SearchIndex !== -1){
            let qualityElement = document.getElementById(id)
            if(qualityElement){
                cart[SearchIndex].count = parseInt(qualityElement.value, 10) || 0
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
                totalProduct();
            }
        }
    }

}
let totalProduct = async () =>{
    let response= await fetch('../page/data.json')
    let data = await response.json()
    if(cart.length !== 0){
        let Total = cart.map(item =>{
            let search = data.find(itemData => itemData.id ===Number(item.id)) || [];
            return item.count * search.price;
        }).reduce((x,y) => x+y, 0);
        cartSumary.innerHTML = `
        <div class="product-total">
                <h2>Product total: <span id="total">${Total}</span></h2>
            </div>
            <div class="product-checkout">
                <a href="../checkout/checkout.html" class="checkout">Checkout</a>
            </div>
            <div >
                <button onclick="clearCart()" class="removeAll" >Clear cart</button>
            </div>`
    }
    else{
        cartSumary.innerHTML= "";
    }

}
let removeItem = (id) =>{
    let removeId = id
    cart= cart.filter(item => Number(item.id) !== Number(removeId));
    renderCartItems()
    totalProduct()
    localStorage.setItem('cart' , JSON.stringify(cart))
    
}
let clearCart = () =>{
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart))
    renderCartItems()
    totalProduct()
}
renderCartItems();
totalProduct();
