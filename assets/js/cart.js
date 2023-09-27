"use strict";

let basket = [];


if (localStorage.getItem("basket") != null) {
    basket = JSON.parse(localStorage.getItem("basket"))
    document.querySelector("#cart .alert-warning").classList.add("d-none");
} else {
    document.querySelector(".basket .count").classList.add("d-none");
    document.querySelector("#cart .table").classList.add("d-none");
    // document.querySelector("#cart .alert-warning").classList.remove("d-none");
}

if(basket.length == 0){
    document.querySelector("#cart .table").classList.add("d-none");
    document.querySelector("#cart .alert-warning").classList.remove("d-none");
    document.querySelector(".basket .count").classList.add("d-none");
    document.querySelector("main .price").classList.add("d-none")
}



function basketCount() {
    let basketCount = 0;
    for (const item of basket) {
        basketCount += item.count;
    }
    return basketCount;
}



document.querySelector(".basket .count span").innerText = basketCount();


showBasketDatas(basket);





function showBasketDatas(products){
    let tableBody = document.querySelector(".table tbody");
    for (const item of products) {
        tableBody.innerHTML += `<tr>
        <td><img src="${item.image}" alt=""></td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td><i data-id=${item.id} class="fa-solid fa-minus" ></i><span>${item.count} </span><i data-id=${item.id} class="fa-solid fa-plus "></i></td>
        <td>${item.price} ₼</td>
        <td>${item.price * item.count} ₼</td>
        <td>
            <button data-id="${item.id}" class="btn btn-danger delete-btn">Delete</button>
        </td>
        </tr>`
        
    }
    totalPrice()
}


 
function totalPrice(){
    let total = 0;

    for (const item of basket) {
    total+=item.price*item.count
    document.querySelector("main .total-price").innerHTML=total +" ₼";
}
}

deleteBasketItem();



function deleteBasketItem(){

let deleteBtns = document.querySelectorAll(".table button");
deleteBtns.forEach(btn => {
    btn.addEventListener("click",function(){
        let productId = parseInt(this.getAttribute("data-id"));
        let existProduct = basket.find(m=>m.id == productId);
        basket = basket.filter(m=>m.id != existProduct.id);
        localStorage.setItem("basket",JSON.stringify(basket));
        document.querySelector(".basket .count span").innerText = basketCount();
        this.parentNode.parentNode.remove();
        if(basket.length == 0){
            document.querySelector("#cart .table").classList.add("d-none");
            document.querySelector("#cart .alert-warning").classList.remove("d-none");
            document.querySelector(".basket .count").classList.add("d-none");
            document.querySelector("main .price").classList.add("d-none");
            document.querySelector("main .total-price").classList.add("d-none")
        }
        totalPrice();
    })
});
}

let iconMinus =document.querySelectorAll(".fa-minus")

let iconPlus =document.querySelectorAll(".fa-plus")

iconPlus.forEach(plus => {
    plus.addEventListener("click",function(){
        let productId = parseInt(this.getAttribute("data-id"));
        let existProduct = basket.find(m=>m.id == productId);
        existProduct.count++
        localStorage.setItem("basket",JSON.stringify(basket));
        this.previousElementSibling.innerText = existProduct.count
        document.querySelector(".basket .count span").innerText = basketCount();
        this.parentNode.nextElementSibling.nextElementSibling.innerText = existProduct.price*existProduct.count +" ₼"
        totalPrice();
    })
});

iconMinus.forEach(plus => {
    plus.addEventListener("click",function(){
        let productId = parseInt(this.getAttribute("data-id"));
        let existProduct = basket.find(m=>m.id == productId);
        if (existProduct.count>1) {
            existProduct.count--

        localStorage.setItem("basket",JSON.stringify(basket));
        this.nextElementSibling.innerText = existProduct.count
        document.querySelector(".basket .count span").innerText = basketCount();
        this.parentNode.nextElementSibling.nextElementSibling.innerText = existProduct.price*existProduct.count +" ₼"
        totalPrice();
        }
        
    })
});



