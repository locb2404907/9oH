const detailContainer = document.querySelector('.detail-container')
const btnAddCart = document.getElementById('addCart')
let findProductId;
const getDetailProduct = async() =>{
    const path = new URLSearchParams(window.location.search)
    const productId = path.get('id')
    const response= await fetch("../page/data.json")
    const data = await response.json()
    findProductId = data.find(item => item.id.toString() === productId.toString())
    console.log(findProductId)
    detailContainer.innerHTML=`
   
            <div class="detail">
                <div class="detail-image">
                    <img src="../${findProductId.img}" alt="${findProductId.title}">
                </div>
                <div class="detail-infor">
                    <h2>${findProductId.title}</h2>
                    <p>${findProductId.information}</p>
                    <div class="detail-price">
                        Price: 
                        <span class="Price">${findProductId.price}</span>
                    </div>
                    
                </div>
            </div>
    
    `
}
btnAddCart.addEventListener('click', ()=>{
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart){
        const item = cart.findIndex(item => item.id.toString()===findProductId.id.toString())
        if(item !== -1){
            cart[item].count += 1;
        }
        else{
            cart.push({id: findProductId.id, count:1})
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    else{
        const cart = [{
            id: findProductId.id,
            count : 1
        }]
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    console.log(findProductId)
})

getDetailProduct()