
const products= document.querySelector('.products')
const getData = async() =>{
    const response = await fetch("data.json")
    const data= await response.json()
    if(data){
        products.innerHTML = data.map(item =>{
            return `
            <div class="products_item">
            <img src="${item.img}" alt="${item.title}">
            <div class="products_infor">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="price-and-add">
                    <p class="price">Price:${item.price}</p>
                    <a href="" class="add" data-id="${item.id}"><i class="material-icons">add_shopping_cart</i></a>
                </div>
                
                <a href="../detail/detail.html?id=${item.id}" class="btn">View</a>
            </div>
        </div>
            `
        }).join(" ")
        const btnAdds = document.querySelectorAll(".add");

    btnAdds.forEach(btn => {
        btn.addEventListener("click", (e) => {
            

            const productId = btn.dataset.id;
            console.log(productId);

            let cart = JSON.parse(localStorage.getItem("cart"));
            console.log("Đã click");

            if (cart) {

                const item = cart.findIndex(
                    product => product.id.toString() === productId.toString()
                );

                if (item !== -1) {
                    cart[item].count += 1;
                } else {
                    cart.push({
                        id: productId,
                        count: 1
                    });
                }

            } else {

                cart = [{
                    id: productId,
                    count: 1
                }];
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            console.log(cart);
        });
    });
;
    }
}

getData();