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
let personalInformation
let creditCard
let toPay
//---------------------------------------------------------------------------------------------------------------------------------
//ARRAYS
let productsForRendering = []
let productsInCart = []
//---------------------------------------------------------------------------------------------------------------------------------
//ITEM CALL
//Various item call
listProducts = document.getElementById('listProducts')
searchResultContainer = document.getElementById('searchResultContainer')
columnToFilter = document.getElementById('columnToFilter')
containerMain = document.getElementById('containerMain')
buttonsAdd = document.getElementsByClassName('buttonAdd')
cartContainer = document.getElementById('cartContainer')
buttonsCategory = document.getElementsByClassName('buttonCategory')
delivery24Hs = document.getElementById('delivery24Hs')
stop20= document.getElementById('stop20')
between20and65 = document.getElementById('between20and65')
over65 = document.getElementById('over65')
search = document.getElementById('search')
buttonBuy = document.getElementById('buttonBuy')
logoNav = document.getElementById('logoNav')
buttonCart = document.getElementById('buttonCart')
homePage = document.getElementById('homePage')
checkout = document.getElementById('checkout')
buttonPay = document.getElementById('buttonPay')
aboutUsContainer = document.getElementById('aboutUsContainer')
buttonAboutUs = document.getElementById('buttonAboutUs')
contactContainer = document.getElementById('contactContainer')
buttonContact = document.getElementById('buttonContact')
//---------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS
//Creat product cards and add in container
function renderProductCards(parameter1) {
    listProducts.innerHTML= ""
    checkout.className = "noVisible"
    cartContainer.className = "noVisible"
    aboutUsContainer.className = "noVisible"
    contactContainer.className = "noVisible"
    columnToFilter.className = ""
    searchResultContainer.className = ""
    for (const product of parameter1) {
        if (product.delivery == 24) {
            cardProduct = document.createElement ('li')
            cardProduct.className = `cardProduct`
            cardProduct.innerHTML = `
                <div class="productCardContent">
                    <div class="photoContainer">
                        <img class="photoProduct" src="${product.photoProduct}" alt="${product.nameProduct}">
                    </div>
                    <div class="infoProduct">
                        <h4 class="nameProduct">${product.nameProduct}</h4>
                        <div class="priceContent">
                            <h3 class="priceProduct">$ ${product.priceProduct}</h3>
                            <h4 class="tag24Hs">Llega en 24hs</h4>
                        </div>
                        <div class="addButtonContainer">
                            <button class="buttonAdd" id="${product.idProduct}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>`
            listProducts.append(cardProduct)
        } else {
            cardProduct = document.createElement ('li')
            cardProduct.className = `cardProduct`
            cardProduct.innerHTML = `
                <div class="productCardContent">
                    <div class="photoContainer">
                        <img class="photoProduct" src="${product.photoProduct}" alt="${product.nameProduct}">
                    </div>
                    <div class="infoProduct">
                        <h4 class="nameProduct">${product.nameProduct}</h4>
                        <div class="priceContent">
                            <h3 class="priceProduct">$ ${product.priceProduct}</h3>
                            <h4 class="tag24Hs white">.</h4>
                        </div>
                        <div class="addButtonContainer">
                            <button class="buttonAdd" id="${product.idProduct}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>`
            listProducts.append(cardProduct)
        }
    }
    addProductCardToCart(parameter1)
}
//Click button add, create the product card in cart
function addProductCardToCart(parameter1) {
    for (const buttonAdd of buttonsAdd) {
        buttonAdd.addEventListener('click', () => {
            total = 0
            clickedProduct = parameter1.find(product => product.idProduct == buttonAdd.id)
            clickedProduct.priceProductTotal = clickedProduct.priceProduct
            clickedProductPositionInCart = productsInCart.findIndex(product => product.idProduct == clickedProduct.idProduct)
            if (clickedProductPositionInCart != -1) {
                productsInCart[clickedProductPositionInCart].qProduct++
                productsInCart[clickedProductPositionInCart].priceProductTotal = productsInCart[clickedProductPositionInCart].priceProduct * productsInCart[clickedProductPositionInCart].qProduct
            } else {
                productsInCart.push(clickedProduct)
            }
            saveProductsInCartStorage()              
            renderProductsInCart(parameter1)
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
              })
              Toast.fire({
                icon: 'success',
                html: '<h3 class= "black">Product added to cart.</h3>'
              })
        })
    }
}
//Click button category, filter products according to category and render
function filterProductsWithButtonCategory(parameter1) {
    for (const buttonCategory of buttonsCategory) {
        buttonCategory.addEventListener('click', () => {
            productsForRendering = parameter1.filter((product) => product.categoryProduct == (buttonCategory.id))
            renderProductCards(productsForRendering)
        })
    }
}
//Filter products up to $20000
function filterProductsUpTo20000(parameter1) {
    stop20.addEventListener('click', () => {
        productsForRendering = parameter1.filter((product) => product.priceProduct < 20000)
        renderProductCards(productsForRendering)
    })
}
//Filter products between $20000 and $65000
function filterProductsBetween20and65(parameter1) {
    between20and65.addEventListener('click', () => {
        productsForRendering = parameter1.filter((product) => product.priceProduct >= 20000 && product.priceProduct <= 65000)
        renderProductCards(productsForRendering)
    })
}
//Filter products over $65000
function filterProductsOver65(parameter1) {
    over65.addEventListener('click', () => {
        productsForRendering = parameter1.filter((product) => product.priceProduct >= 65000)
        renderProductCards(productsForRendering)
    })
}
//Click button delivery 24hs, filter products according to category and render
function filterProductsWithButton24Hs(parameter1) {
    delivery24Hs.addEventListener('click', () => {
        productsForRendering = parameter1.filter((product) => product.delivery == 24)
        renderProductCards(productsForRendering)
    })
}
//Filter products by search value and render
function filterProductsWithSearch(parameter1) {
    search.oninput = () => {
        productsForRendering = parameter1.filter(product => product.nameProduct.includes(search.value))
        renderProductCards(productsForRendering)
    }
}
//Create and render product cards in cart
function renderProductsInCart (parameter1) {
    cartContainer.innerHTML = ''
    total = 0
    for (const product of productsInCart) {
        total += product.priceProductTotal
        productCardInCart = document.createElement('li')
        productCardInCart.className = `cardProduct`
        productCardInCart.id = `productCardInCart ${product.idProduct}`
        productCardInCart.innerHTML= `
        <div class="productCardContentCart">
                <div class="photoContainer">
                    <img class="photoProduct" src="${product.photoProduct}" alt="${product.nameProduct}">
                </div>
                <div class="infoProduct">
                    <h4 class="nameProduct">${product.nameProduct}</h4>
                    <h4 class="qProduct">${product.qProduct} uds.</h4>
                    <h3 class="priceProduct">$ ${product.priceProductTotal}</h3>
                </div>
            </div>`
        cartContainer.append(productCardInCart)
    }
    cartContainer.innerHTML += `
    <div class= "footerCart">
    <h1>Total: $${total}</h1>
    <button id="buttonBuy">Comprar</button>
    </div>`
    Buy(parameter1)
}
//Save productos in cart sotrage
function saveProductsInCartStorage() {
    savedCartJSON = JSON.stringify(productsInCart)
    localStorage.setItem('savedCart', savedCartJSON)
}
//Click button buy and clear local storage
function Buy(parameter1) {
    buttonBuy = document.getElementById('buttonBuy')
    buttonBuy.addEventListener('click', () => {
        localStorage.clear()
        productsInCart = []
        cartContainer.innerHTML = `
        <div class="emptyCart">
            <h3>You have not selected products yet</h3>
            <button class="goShopping" id="goShopping">Go Shopping</button>
        </div>`
        cartContainer.className = "noVisible"
        checkout.className =""
        checkout.innerHTML = ""
        personalInformation = document.createElement('div')
        personalInformation.className = `personalInformation`
        personalInformation.innerHTML= `
            <h2>Información Personal</h2>
                <div class="inputs">
                    <input type="text" placeholder="   Name and Last Name">
                    <input type="tel" placeholder="   Phone number">
                    <input type="email" placeholder="   Enter your email">
                </div>`
        creditCard = document.createElement('div')
        creditCard.className = `creditCard`
        creditCard.innerHTML = `
            <h2>Datos Tarjeta de Crédito</h2>
                <div class="inputs">
                    <input type="number" placeholder="   Card Number">
                    <input type="tel" placeholder="   MM/YY">
                    <input type="number" placeholder="   CVV">
                </div>`
        toPay = document.createElement('div')
        toPay.className = `toPay`
        toPay.innerHTML = `
            <div class="toPay">
                <button id="buttonPay">Pagar</button>
            </div>`
        checkout.append(personalInformation, creditCard, toPay)
        Pay(parameter1)
    })
}
//Click button logo add all products to the container
function clickLogo(parameter1) {
    logoNav.addEventListener('click', () => {
        renderProductCards(parameter1)
    })
}
//Click button cart, render cart
function clickButtonCart(parameter1) {
    buttonCart.addEventListener('click', () => {
        cartContainer.className = ""
        checkout.className = "noVisible"
        columnToFilter.className = "noVisible"
        searchResultContainer.className = "noVisible"
        aboutUsContainer.className = "noVisible"
        contactContainer.className = "noVisible"
        if (localStorage.getItem('savedCart')){
            productsInCart = JSON.parse(localStorage.getItem('savedCart'))
            renderProductsInCart()
            Buy(parameter1)
        } else {
            cartContainer.innerHTML = `
            <div class="emptyCart">
            <h3>No has seleccionado productos</h3>
            <button class="goShopping" id="goShopping">Ver productos</button>
            </div>`
            clickButtonGoShopping(parameter1)
        }
    })
}
//Click button go shopping, render products
function clickButtonGoShopping(parameter1) {
    buttonGoShopping = document.getElementById('goShopping')
    buttonGoShopping.addEventListener('click', () => {
        renderProductCards(parameter1)
    })
}
//Click button pay, the purchase is finalized and add all products to the container
function Pay(parameter1) {
    buttonPay = document.getElementById('buttonPay')
    buttonPay.addEventListener('click', () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '<h4 class="black">Payment completed.Thank you!</h4>',
            showConfirmButton: false,
            timer: 3000
        })
        renderProductCards(parameter1)
    })
}
//Click button about us, render brand info
function clickButtonAboutUs() {
    buttonAboutUs.addEventListener('click', () => {
        aboutUsContainer.className = ""
        checkout.className = "noVisible"
        cartContainer.className = "noVisible"
        columnToFilter.className = "noVisible"
        searchResultContainer.className = "noVisible"
        contactContainer.className = "noVisible"
        aboutUsContainer.innerHTML = `
        <div>
        <h1>INFORMACIÓN DE NOSOTROS EN CONSTRUCCIÓN</h1>
        </div>`
    })
}
//Click button contact, render contact info
function clickButtonContact() {
    buttonContact.addEventListener('click', () => {
        contactContainer.className = ""
        aboutUsContainer.className = "noVisible"
        checkout.className = "noVisible"
        cartContainer.className = "noVisible"
        columnToFilter.className = "noVisible"
        searchResultContainer.className = "noVisible"
        contactContainer.innerHTML = `
        <div>
        <h1>INFORMACIÓN DE CONTACTO EN CONSTRUCCIÓN</h1>
        </div>`
    })
}
//Development of ecommerce
function ecommerce(parameter1) {
    renderProductCards(parameter1)
    filterProductsWithButtonCategory(parameter1)
    filterProductsWithButton24Hs(parameter1)
    filterProductsWithSearch(parameter1)
    filterProductsUpTo20000(parameter1)
    filterProductsBetween20and65(parameter1)
    filterProductsOver65(parameter1)
    clickButtonCart(parameter1)
    clickLogo(parameter1)
    clickButtonAboutUs()
    clickButtonContact()
}
//---------------------------------------------------------------------------------------------------------------------------------
//PROGRAM
fetch('/Entrega Proyecto Final JS - Santiago Gabutti - CoderHouse/bddPF.json')
    .then((response) => response.json())
    .then((stockProducts) => ecommerce(stockProducts))
//End