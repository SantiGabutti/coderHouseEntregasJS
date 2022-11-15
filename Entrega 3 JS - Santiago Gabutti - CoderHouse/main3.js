//CLASS
class Product{
    constructor(idProduct, categoryProduct, nameProduct, descriptionProduct, priceProduct, photoProduct, qProduct){
        this.idProduct = idProduct,
        this.categoryProduct = categoryProduct,
        this.nameProduct = nameProduct,
        this.descriptionProduct = descriptionProduct,
        this.priceProduct = priceProduct,
        this.photoProduct = photoProduct,
        this.qProduct = qProduct
    }
}
//---------------------------------------------------------------------------------------------------------------------------------
//BDD PRODUCTS
let product1 = new Product(1, "burgers", "Cheeseburger", "Burger with cheddar cheese, lettuce, tomato, red onion and pickles.", 7, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/cheesburger-preview.png", 1);
let product2 = new Product(2, "burgers", "Cheesburger Doble", "Doble burger with cheddar cheese, lettuce, tomato, red onion and pickles.", 8, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/cheesburgerDoble-preview.png", 1);
let product3 = new Product(3, "burgers", "American Cheddar Burger Doble", "Doble burger with cheddar cheese, red onion, lettuce and bacon.", 9, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/americanCheddarBurger-preview.png", 1);
let product4 = new Product(4, "sides", "Nuggets x10", "Battered chicken", 4, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/nuggets-preview.png", 1);
let product5 = new Product(5, "sides", "Onion Rings x10", "Breaded onion", 3, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/onionsRings-preview.png", 1);
let product6 = new Product(6, "sides", "Fries", "Crispy American French Fries, large size.", 4, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/bigFries-preview.png", 1);
let product7 = new Product(7, "drinks", "Soda 350ml", "You can choose the flavor", 2, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/soda-preview.png", 1);
let product8 = new Product(8, "drinks", "Water 500ml", "Still water 500ml", 1.50, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/water-preview.png", 1)
let product9 = new Product(9, "desserts", "Icecream", "You can choose the flavor", 3, img="/Entrega 3 JS - Santiago Gabutti - CoderHouse/imgs/icecream-preview.png", 1);
//---------------------------------------------------------------------------------------------------------------------------------
//VARIABLES
let productContainer
let productCard
let buttonsAdd
let clickedProduct
let clickedProductPositionInCart
let productCardInCart
let cart
let total = 0
let savedCartJSON
let buttonsCategory
let filteredProdcuts
//---------------------------------------------------------------------------------------------------------------------------------
//ARRAYS
let stockProducts = []
stockProducts.push(product1, product2, product3, product4, product5, product6, product7, product8, product9)
let productsForRendering = []
let productsInCart = []
//---------------------------------------------------------------------------------------------------------------------------------
//ITEM CALL
//Mobile Menu, display menu
const navToggle = document.querySelector(".navToggle")
const navMenu = document.querySelector(".navMenu")
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("navMenuVisible");
});
//Various item call
productContainer = document.getElementById('productContainer')
buttonsAdd = document.getElementsByClassName('buttonAdd')
cartContainer = document.getElementById('cartContainer')
buttonsCategory = document.getElementsByClassName('buttonCategory')
search = document.getElementById('search')
buttonBuy = document.getElementById('buttonBuy')
logo = document.getElementById('logo')
//---------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS
//Creat product cards and add in container
function renderProductCards(parameter1) {
    productContainer.innerHTML= ""
    for (const product of parameter1) {
        productCard = document.createElement ('div')
        productCard.id = `cardProduct ${product.idProduct}`
        productCard.className = `productCard`
        productCard.innerHTML = `
            <img src="${product.photoProduct}" class="photoProduct" alt="">
            <h4 class="nameProduct">${product.nameProduct}</h4>
            <p>${product.descriptionProduct}</p>
            <h4 class="priceProduct">$${product.priceProduct}</h4>
            <button class="buttonAdd" id="${product.idProduct}">Add</button>`
        productContainer.append(productCard)
    }
}
//Click button add, create the product card in cart
function addProductCardToCart() {
    for (const buttonAdd of buttonsAdd) {
        buttonAdd.addEventListener('click', () => {
            total = 0
            clickedProduct = stockProducts.find(product => product.idProduct == buttonAdd.id)
            clickedProduct.priceProductTotal = clickedProduct.priceProduct
            clickedProductPositionInCart = productsInCart.findIndex(product => product.idProduct == clickedProduct.idProduct)
            if (clickedProductPositionInCart != -1) {
                productsInCart[clickedProductPositionInCart].qProduct++
                productsInCart[clickedProductPositionInCart].priceProductTotal = productsInCart[clickedProductPositionInCart].priceProduct * productsInCart[clickedProductPositionInCart].qProduct
            } else {
                productsInCart.push(clickedProduct)
            }
            saveProductsInCartStorage()              
            renderProductsInCart()
        })
    }
}
//Click button category, filter products according to category and render
function filterProductsWithButtonCategory() {
    for (const buttonCategory of buttonsCategory) {
        buttonCategory.addEventListener('click', () => {
            productsForRendering = stockProducts.filter((product) => product.categoryProduct == (buttonCategory.id))
            renderProductCards(productsForRendering)
            addProductCardToCart()
        })
    }
}
//Filter products by search value and render
function filterProductsWithSearch() {
    search.oninput = () => {
        productsForRendering = stockProducts.filter(product => product.nameProduct.includes(search.value))
        renderProductCards(productsForRendering)
        addProductCardToCart()
    }
}
//Create and render product cards in cart
function renderProductsInCart () {
    cartContainer.innerHTML = ''
    for (const product of productsInCart) {
        total += product.priceProductTotal
        productCardInCart = document.createElement('div')
        productCardInCart.className = `productCardInCart`
        productCardInCart.id = `productCardInCart ${product.idProduct}`
        productCardInCart.innerHTML= `
        <img src="${product.photoProduct}" class="photoProduct" alt="">
        <h4 class="nameProduct">${product.nameProduct}</h4>
        <h4 class="qProduct">${product.qProduct} uds.</h4>
        <h4 class="priceProduct">$${product.priceProductTotal}</h4>`
        cartContainer.append(productCardInCart)
    }
    cartContainer.innerHTML += `
    <div class= "footerCart">
    <h1>Total: ${total}</h1>
    <button id="buttonBuy">Comprar</button>
    </div>
    `
    Buy()
}
//Save productos in cart sotrage
function saveProductsInCartStorage() {
    savedCartJSON = JSON.stringify(productsInCart)
    localStorage.setItem('savedCart', savedCartJSON)
}
//Click button buy and clear local storage
function Buy() {
    buttonBuy = document.getElementById('buttonBuy')
    buttonBuy.addEventListener('click', () => {
        localStorage.clear()
        productsInCart = []
        cartContainer.innerHTML = ''
    })
}
//Click button logo add all products to the container
function clickLogo() {
    logo = document.getElementById('logo')
    logo.addEventListener('click', () => {
        renderProductCards(stockProducts)
    })
}
//---------------------------------------------------------------------------------------------------------------------------------
//PROGRAM
//Play
renderProductCards(stockProducts)
if (localStorage.getItem('savedCart')){
    productsInCart = JSON.parse(localStorage.getItem('savedCart'))
    renderProductsInCart()
}
addProductCardToCart()
filterProductsWithButtonCategory()
filterProductsWithSearch()
clickLogo()
//End