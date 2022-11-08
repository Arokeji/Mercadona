/*
    Products DDBB
*/

let products = [
    {
        id: 1,
        nombre: 'Pera Conferencia',
        precio: 0.34,
        imagen: './assets/item1.jpeg',
        cantidad: 0
    },
    {
        id: 2,
        nombre: 'Manzana Golden',
        precio: 0.36,
        imagen: './assets/item2.jpeg',
        cantidad: 0
    },
    {
        id: 3,
        nombre: 'Uvas',
        precio: 2.60,
        imagen: './assets/item3.jpeg',
        cantidad: 0
    },
    {
        id: 4,
        nombre: 'Banana',
        precio: 0.21,
        imagen: './assets/item4.jpeg',
        cantidad: 0
    },
    {
        id: 5,
        nombre: 'Melón Galia',
        precio: 2.71,
        imagen: './assets/item5.jpeg',
        cantidad: 0
    },
    {
        id: 6,
        nombre: 'Mandarina',
        precio: 0.36,
        imagen: './assets/item6.jpeg',
        cantidad: 0
    },
    {
        id: 7,
        nombre: 'Piña',
        precio: 2.30,
        imagen: './assets/item7.jpeg',
        cantidad: 0
    },
    {
        id: 8,
        nombre: 'Mango',
        precio: 1.23,
        imagen: './assets/item8.jpeg',
        cantidad: 0
    }
];

/* 

ESTRUCTURA DE LOS PRODUCTOS

<div class="main-item">
                    <div class="main-item-details">
                        <img class="main-item-img" src="./src/item1.png">
                        <p class="main-item-name">Big Mac</p>
                    </div>
                    <div class="main-item-order">
                        <p class="main-item-price">8.10</p>
                        <button class="main-item-add">+</button>
                    </div>
                </div>
*/

let elementProductContainer = document.getElementById('main-products-container');

let itemsArray = [];
let total = 0;

function renderProducts(){
    //Rendering every product in the ddbb
    for(let i = 0; i < products.length; i++){        
        
        //main-item
        let elementMainItem = document.createElement('div');
        elementMainItem.classList.add('main-item');
        elementProductContainer.appendChild(elementMainItem);
        
        //details
        let elementMainItemDetails = document.createElement('div');
        elementMainItemDetails.classList.add('main-item-details');
        elementMainItem.appendChild(elementMainItemDetails);

        let elementMainItemImg = document.createElement('img');
        elementMainItemImg.classList.add('main-item-img');
        elementMainItemImg.setAttribute('src', products[i].imagen);
        elementMainItemDetails.appendChild(elementMainItemImg);

        let elementMainItemName = document.createElement('p');
        elementMainItemName.classList.add('main-item-name');
        elementMainItemName.textContent = products[i].nombre;
        elementMainItemDetails.appendChild(elementMainItemName);
        
        //order
        let elementMainItemOrder = document.createElement('div');
        elementMainItemOrder.classList.add('main-item-order');
        elementMainItem.appendChild(elementMainItemOrder);

        let elementMainItemPrice = document.createElement('p');
        elementMainItemPrice.classList.add('main-item-price');
        elementMainItemPrice.textContent = products[i].precio + '€';
        elementMainItemOrder.appendChild(elementMainItemPrice);

        let elementMainItemAdd = document.createElement('button');
        elementMainItemAdd.classList.add('main-item-add');
        elementMainItemImg.setAttribute('id', 'main-item-add');
        elementMainItemAdd.textContent = 'Añadir al carrito';
        elementMainItemAdd.addEventListener('click', function(){ addItem(products[i], i)});
        elementMainItemOrder.appendChild(elementMainItemAdd);
    }
}

renderProducts();

function addItem(product, item){
    
    //Total sum after adding
    total += product.precio;
    total = Math.round(total * 100) / 100;

    //Lets suppose the item doesnt exist in the array before checking it
    let exists = false;

    //Units counter. If there is something in the array...
    if (itemsArray.length > 0){
        //Does this item already exist in it?
        for(let i = 0; i < itemsArray.length ; i ++){
            if(itemsArray[i] == product){
                //Exists, just add 1 unit and mark as true
                itemsArray[i].cantidad += 1; 
                exists = true;
            }
        }   
    } 
    
    //Not exist, then add the item in the array
    if (exists == false) {
        product.cantidad = 1;
        itemsArray.push(product);
    }    

    renderCart(itemsArray, exists);
    
    //Reset 'exists' for following instances
    exists = false;
}

function renderCart(productsArray, exists){
    
    let elementCartEmpty = document.getElementById('cart-empty');
    let elementItemList = document.getElementById('cart-list');  

    //Render the array only if there is elements in the array
    if(productsArray.length !== 0){
        //Hiding the text
        elementCartEmpty.style.display = 'none';
        elementItemList.textContent = '';

        //Render items in the array only if units > 0
        for(let i = 0; i < productsArray.length ; i ++){       
            if(productsArray[i].cantidad > 0){
                //Adding item box
                let elementItemDetails = document.createElement('div');
                if(exists){
                    elementItemDetails.classList.add('cart-item-exists');
                } else {
                    elementItemDetails.classList.add('cart-item');
                }
                elementItemList.appendChild(elementItemDetails);
        
                //Adding item details
                let elementItemImg = document.createElement('img');
                elementItemImg.classList.add('cart-item-img');
                elementItemImg.setAttribute('src', productsArray[i].imagen);
                elementItemDetails.appendChild(elementItemImg);

                let elementItemName = document.createElement('p');
                elementItemName.classList.add('cart-item-name');
                elementItemName.textContent = productsArray[i].nombre;
                elementItemDetails.appendChild(elementItemName);

                let elementItemPrice = document.createElement('p');
                elementItemPrice.classList.add('cart-item-price');
                elementItemPrice.textContent = productsArray[i].precio;
                elementItemDetails.appendChild(elementItemPrice);

                let elementItemSummary = document.createElement('div');
                elementItemSummary.classList.add('cart-item-summary');
                elementItemDetails.appendChild(elementItemSummary);

                let elementItemQuantity = document.createElement('p');
                elementItemQuantity.classList.add('cart-item-quantity');
                elementItemQuantity.textContent = productsArray[i].cantidad + 'X';
                elementItemSummary.appendChild(elementItemQuantity);
                
                let elementMainItemRemove = document.createElement('button');
                elementMainItemRemove.classList.add('cart-item-remove');
                elementMainItemRemove.textContent = '-';
                elementMainItemRemove.addEventListener('click', function(){ removeItem(productsArray, i)});
                elementItemSummary.appendChild(elementMainItemRemove); 
            }

            
        }  
    //In case there is nothing, we want the empty back
    } else {
        elementCartEmpty.style.display = 'flex';
    }

    //Total box
    let elementItemTotal = document.createElement('p');
    elementItemTotal.classList.add('cart-total');
    elementItemTotal.textContent = total.toFixed(2) + ' €';
    if(total != 0){
        elementItemList.appendChild(elementItemTotal);    
    } 

}

function removeItem(productsArray, item){
    
    //Total sum removing 1 item
    total -= productsArray[item].precio;
    total = Math.round(total * 100) / 100;

    //Removing 1 unit from prodct 
    productsArray[item].cantidad -= 1;
    
    //Checking if the cart is empty to clear
    if (total == 0){
        itemsArray = [];
        productsArray = [];

        let elementItemList = document.querySelector('.cart-list');
        let elementItemTotal = document.querySelector('.cart-total');
        
        elementItemList.textContent = '';
        elementItemTotal.textContent = '';
    }

    renderCart(productsArray, true);
}
