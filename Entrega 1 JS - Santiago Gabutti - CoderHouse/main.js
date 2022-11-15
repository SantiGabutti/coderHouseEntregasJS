//FUNCTIONS
function order(parameter1, parameter2, parameter3) {
    alert("Your order is "+ parameter1+" "+parameter2+". Total: $"+(parameter1 * parameter3))
    console.log("Your order is "+ parameter1+" "+parameter2+". Total: $"+(parameter1 * parameter3))
}
function selectedProduct1() {
    console.log("You have selected the product Cheesburger + Coca Cola 330cc")
    console.log("How many cheeseburgers do you want?")
}
function selectedProduct2() {
    console.log("You have selected the product Cheesburger + Sprite 330cc")
    console.log("How many cheeseburgers do you want?")
}
function selectedProduct3() {
    console.log("You have selected the product Cheesburger + Beer IPA 330cc")
    console.log("How many cheeseburgers do you want?")  
}
function minorGreetings(parameter1) {
    alert("Hi "+ parameter1+", you are a minor, some products are restricted. Thanks, you can now place your order!") 
    console.log("Hi "+ parameter1+", you are a minor, some products are restricted. Thanks, you can now place your order!")

}
function adultGreetings(parameter1) {
    alert("Hi "+ parameter1+". Thanks, you can now place your order!")
    console.log("Hi "+ parameter1+". Thanks, you can now place your order!")
}
function selectedPaymentMethod(parameter1){
    alert("You have selected "+parameter1+" payment method.")
    console.log("You have selected "+parameter1+" payment method")
}
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
//Constant Variables
const product1 = ("Cheeseburger + Coca Cola 330cc")
const product2 = ("Cheeseburger + Sprite 330cc")
const product3 = ("Cheeseburger + Beer IPA 330cc")
const priceProdcut1 = 16
const priceProdcut2 = 16
const priceProdcut3 = 25
const paymentMethod1 = ("the card")
const paymentMethod2 = ("cash")
//----------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------
//Program Start
alert("¡Hi, your welcome to MagicStore!"); console.log("Hi, your welcome to MagicStore")
alert("Enter your data to see the products"); console.log("Enter your data to see the products")
let nameUser = prompt("What is your name?")
let ageUser = Number(prompt("What is your age?"))
let selectProduct
let qProduct
let paymentMethod
let nameUserCard
while (isNaN(ageUser)) {
    ageUser = Number(prompt("Enter a valid age"))
}
if (ageUser < 18) {
        minorGreetings(nameUser)
        do {
            console.log("What product do you want?\n1-Cheeseburger + Coca Cola 330cc $16\n2-Cheeseburger + Sprite 330cc $16")
            selectProduct = Number(prompt("What product do you want?\n1-Cheeseburger + Coca Cola 330cc $16\n2-Cheeseburger + Sprite 330cc $16"))
            if (selectProduct == 1) {
                selectedProduct1(); qProduct = Number(prompt("How many cheeseburgers do you want?"))
            } else if (selectProduct == 2) {
                selectedProduct2(); qProduct = Number(prompt("How many cheeseburgers do you want?"))
            }
        } while (qProduct === 0 || qProduct == " " ||  selectProduct < 1 || selectProduct > 2 || isNaN(qProduct) || isNan(selectProduct));
    } else {
        adultGreetings (nameUser)
        do {
            console.log("What product do you want?\n1-Cheeseburger + Coca Cola 330cc $16\n2-Cheeseburger + Sprite 330cc $16\n3-Cheeseburger + Beer IPA 330cc $25")
            selectProduct = Number(prompt("What product do you want?\n1-Cheeseburger + Coca Cola 330cc $16\n2-Cheeseburger + Sprite 330cc $16\n3-Cheeseburger + Beer IPA 330cc $25"))
            if (selectProduct == 1) {
                selectedProduct1(); qProduct = Number(prompt("How many cheeseburgers do you want?"))
            } else if (selectProduct == 2) {
                selectedProduct2(); qProduct = Number(prompt("How many cheeseburgers do you want?"))
            } else if (selectProduct == 3) {
                selectedProduct3(); qProduct = Number(prompt("How many cheeseburgers do you want?"))
            }
        } while (qProduct == 0 || qProduct == " " || selectProduct < 1 || selectProduct > 3 || isNaN(selectProduct) || isNaN(qProduct));
}
if (selectProduct == 1) {
    order(qProduct, product1, priceProdcut1)    
} else if (selectProduct == 2) {
    order(qProduct, product2, priceProdcut2)
} else if (selectProduct == 3) {
    order(qProduct, product3, priceProdcut3)
}
do {
    paymentMethod = Number(prompt("How would you like to pay? \n1-Credit Card\n2-Cash"))
} while (paymentMethod < 1 || paymentMethod == " " || paymentMethod > 2 || isNaN(paymentMethod));
if (paymentMethod == 1) {
    selectedPaymentMethod(paymentMethod1, nameUser)
    nameUserCard = prompt("Enter the name that appears on your card")
    numberCard = prompt("Enter your card number")
    cardExpiration = prompt("Enter the expiration of your card")
    cvv = prompt ("Enter the cvv code of your card")
    if (nameUserCard == " " || numberCard == " " || isNaN(numberCard) || isNaN(cvv) || isNaN(cardExpiration)) {
        while (nameUserCard == " " || numberCard == " " || isNaN(numberCard) || isNaN(cvv) || isNaN(cardExpiration)) {
            alert("You have entered incorrect data, please try again")
            console.log("You have entered incorrect data, please try again")
            nameUserCard = prompt("Enter the name that appears on your card")
            numberCard = prompt("Enter your card number")
            cardExpiration = prompt("Enter the expiration of your card (mmyy)")
            cvv = prompt ("Enter the cvv code of your card")
        }
    } else {
        alert ("Your data has been validated, payment completed")
        console.log ("Your data has been validated, payment completed")
    }
} else if (paymentMethod == 2) {
    selectedPaymentMethod(paymentMethod2, nameUser)
}
alert("Thank you very much for your purchase "+nameUser+". ¡Enjoy your burger!")
console.log("Thank you very much for your purchase "+nameUser+". ¡Enjoy your burger!")