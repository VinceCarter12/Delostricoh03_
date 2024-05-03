let openShopping = document.querySelector('.action-btn');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})


let products = [
    { name: "Genshin X Space Kb", 
    price: 4800.00, 
    disc: '<del>6000.00</del> 20% OFF ',
    image: "genshin 3.png", 
    decs:'Custom Space KB analog optical Ultra Responsive',
    },

    { name: "Cherry Pink RK61 ", 
    price: 3199.00, 
    disc: '<del>3299.00</del>',
    image: "kb3.jpg", 
    decs:'Ultra Compact 61 Trimode/ 2.4/ wired Minimalist',
    },

    { name: "keychron V1 Max", 
    price: 5999.00, 
    disc: '<del>6000.00</del>',
    image: "keychron.png", 
    decs:'The barebone version does not include the keycaps and switches',
    },

    { name: "Wooting HE", 
    price: 10999.00, 
    disc: '',
    image: "woot.png", 
    decs:'Gateron x Lekker switch switch powered by Hall effect sensors.',
    },
  
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
        
            <div class="showcase">
            <div class="showcase-banner">
            <img src="${value.image}" alt="${value.name}">
            
            <div class="showcase-rating"> 
            </div>

            <div class="title">
            <a href="#" class="showcase-category">${value.name}</a></div>

            <a href="#">
              <h3 class="showcase-title">${value.decs}</h3>
            </a>
            <div class="disc">${value.disc}</div>
            <div class="price">₱${value.price.toLocaleString()}</div>
            <div class="showcase-content">
   
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}

initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}" alt="${value.name}"></div>
                <div>${value.name}</div>
                <div>₱${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}




