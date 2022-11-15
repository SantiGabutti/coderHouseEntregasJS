//Class
class Modifier{
    constructor(id, nameModifier){
        this.id = id,
        this.nameModifier = nameModifier
    }
}
class Product{
    constructor(id, nameProduct, descriptionProduct, price){
        this.id = id,
        this.nameProduct = nameProduct,
        this.descriptionProduct = descriptionProduct,
        this.price = price
    }
}
//-----------------------------------------------------------------------------------------------------------------
//BDD Products
const product1 = new Product(1, "Cheeseburger", "Bread, meat, cheese, ketchup, onions.", 7);
const product2 = new Product(2, "American Cheddar Burger", "Bread, meat, cheese, onions, bacon, lettuce, bqq, ketchup, mustard.", 9);
const product3 = new Product(3, "Nuggets x10", "Battered chicken", 4);
const product4 = new Product(4, "Onion Rings x10", "Breaded onion", 3);
const product5 = new Product(5, "Soda 500ml", "You can choose the flavor", 2);
const product6 = new Product(6, "Icecream", "You can choose the flavor", 3);
//BDD Modifiers
const modifier1 = new Modifier(1, "meat"); const modifier2 = new Modifier(2, "cheese")
const modifier3 = new Modifier(3, "onions"); const modifier4 = new Modifier(4, "katchup")
const modifier5 = new Modifier(5, "bacon"); const modifier6 = new Modifier(6, "lettuce")
const modifier7 = new Modifier(7, "bbq"); const modifier8 = new Modifier(8, "mustard")
const modifier9 = new Modifier(9, "Coca Cola"); const modifier10 = new Modifier(10, "Coca Cola Zero")
const modifier11 = new Modifier(11, "Sprite"); const modifier12 = new Modifier(12, "Sprite Zero")
const modifier13 = new Modifier(13, "Fanta-Orange"); const modifier14 = new Modifier(14, "Fanta-Orange Zero")
const modifier15 = new Modifier(15, "Strawberry"); const modifier16 = new Modifier(16, "Vanilla")
const modifier17 = new Modifier(17, "Chocolate");
//-----------------------------------------------------------------------------------------------------------------
//Variables
let nameUser
let listProducts = "Select your products:"
let userSelectionProduct
let listRemoveIngredients = "Do you want to remove any ingredient?"
let listRemoveMoreIngredients = "Do you want to remove more ingredients?"
let userRemoveIngredient
let withoutTheIngredients = "without "
let listFlavorsDrink = "Choose the flavor you like best for your drink"
let userSelectionFlavorDrink
let listFlavorsDessert = "Choose the flavor you like best for your dessert"
let userSelectionFlavorDessert
let orderDetail = `Your order is: `
let priceTotal = 0
let paymentMethod
let nameUserCard
let numberCard
let cardExpiration
let cvv
//-----------------------------------------------------------------------------------------------------------------
//Arrays
const stockProducts = []
stockProducts.push(product1, product2, product3, product4, product5, product6)
const modifiersProduct1 = []
modifiersProduct1.push(modifier1, modifier2, modifier3, modifier4)
const modifiersProduct2 = []
modifiersProduct2.push(modifier1, modifier2, modifier3, modifier4, modifier5, modifier6, modifier7, modifier8)
const modifiersProduct5 = []
modifiersProduct5.push(modifier9, modifier10, modifier11, modifier12, modifier13, modifier14)
const modifiersProduct6 = []
modifiersProduct6.push(modifier15, modifier16, modifier17)
const ingredientsRemoved = []
const selectedDrinkFlavor = []
const selectedDessertFlavor = []
const cart = []
//----------------------------------------------------------------------------------------------------------------- 
//Functions
function selectProduct() {
    for (item of stockProducts) {
        listProducts += `\n\n ${item.id}. ${item.nameProduct} >> $${item.price}:\n${item.descriptionProduct}`
    }
    do {
        userSelectionProduct = parseInt(prompt(listProducts))
    } while (userSelectionProduct > stockProducts.length||userSelectionProduct < 1||userSelectionProduct == " "||isNaN(userSelectionProduct));
    cart.push(stockProducts[userSelectionProduct-1])
}
function selectIngredientRemove(parameter1){
    for (item of parameter1) {
        listRemoveIngredients += `\n${item.id}. ${item.nameModifier}`
    }
    listRemoveIngredients += `\n\nEnter ingredient number to delete or 0 to advance`
    do {
        userRemoveIngredient = parseInt(prompt(listRemoveIngredients))
    } while (userRemoveIngredient < 0||userRemoveIngredient > parameter1.length||isNaN(userRemoveIngredient));
    if (userRemoveIngredient == 0) {
        alert("You have not removed ingredients")
    } else if (userRemoveIngredient < parameter1.length||userRemoveIngredient > 0){
        ingredientsRemoved.push(parameter1[userRemoveIngredient-1].nameModifier)
        alert(`You removed the ingredient ${parameter1[userRemoveIngredient-1].nameModifier}`)
        selectOtherIngredientRemove(parameter1)
    }
}
function selectOtherIngredientRemove(parameter1) {
    for (item of parameter1) {
        listRemoveMoreIngredients += `\n${item.id}. ${item.nameModifier}`
    }
    listRemoveMoreIngredients += `\n\nEnter ingredient number to delete or 0 to advance`
    do {
        do {
            userRemoveIngredient = parseInt(prompt(listRemoveMoreIngredients))
        } while (userRemoveIngredient < 0||userRemoveIngredient > parameter1.length||isNaN(userRemoveIngredient));
        if (userRemoveIngredient == 0) {
            alert("You have not removed more ingredients")
        } else if (userRemoveIngredient < parameter1.length||userRemoveIngredient > 0){
            ingredientsRemoved.push(parameter1[userRemoveIngredient-1].nameModifier)
            alert(`You removed the ingredient ${parameter1[userRemoveIngredient-1].nameModifier}`)
        }
    } while (userRemoveIngredient !== 0);
}
function convertDeletedIngredientsToString() {
withoutTheIngredients += ingredientsRemoved.join((", "))
}
function selectFlavorDrink(parameter1) {
    for (item of parameter1) {
        listFlavorsDrink += `\n${item.id}. ${item.nameModifier}` 
    }
    listFlavorsDrink += `\n\nEnter the flavor number`
    do {
        userSelectionFlavorDrink = parseInt(prompt(listFlavorsDrink))
    } while (userSelectionFlavorDrink < parameter1[0].id||userSelectionFlavorDrink > parameter1[parameter1.length-1].id||isNaN(userSelectionFlavorDrink));
    if (userSelectionFlavorDrink == 9) {
        alert(`You have selected the flavor ${parameter1[0].nameModifier}`)
        selectedDrinkFlavor.push(parameter1[0].nameModifier)
    } else if (userSelectionFlavorDrink == 10) {
        alert(`You have selected the flavor ${parameter1[1].nameModifier}`)
        selectedDrinkFlavor.push(parameter1[1].nameModifier)
    } else if (userSelectionFlavorDrink == 11) {
        alert(`You have selected the flavor ${parameter1[2].nameModifier}`)
        selectedDrinkFlavor.push(parameter1[2].nameModifier)
    } else if (userSelectionFlavorDrink == 12) {
        alert(`You have selected the flavor ${parameter1[3].nameModifier}`)
        selectedDrinkFlavor.push(parameter1[3].nameModifier)
    } else if (userSelectionFlavorDrink == 13) {
        alert(`You have selected the flavor ${parameter1[4].nameModifier}`)
        selectedDrinkFlavor.push(parameter1[4].nameModifier)
    } else if (userSelectionFlavorDrink == 14) {
        alert(`You have selected the flavor ${parameter1[5].nameModifier}`)
        selectedDrinkFlavor.push(parameter1[5].nameModifier)
    }
}
function selectFlavorDessert(parameter1) {
    for (item of parameter1) {
        listFlavorsDessert += `\n${item.id}. ${item.nameModifier}` 
    }
    listFlavorsDessert += `\n\nEnter the flavor number`
    do {
        userSelectionFlavorDessert = parseInt(prompt(listFlavorsDessert))
    } while (userSelectionFlavorDessert < parameter1[0].id||userSelectionFlavorDessert > parameter1[parameter1.length-1].id||isNaN(userSelectionFlavorDessert));
    if (userSelectionFlavorDessert == 15) {
        alert(`You have selected the flavor ${parameter1[0].nameModifier}`)
        selectedDessertFlavor.push(parameter1[0].nameModifier)
    } else if (userSelectionFlavorDessert == 16) {
        alert(`You have selected the flavor ${parameter1[1].nameModifier}`)
        selectedDessertFlavor.push(parameter1[1].nameModifier)
    } else if (userSelectionFlavorDessert == 17) {
        alert(`You have selected the flavor ${parameter1[2].nameModifier}`)
        selectedDessertFlavor.push(parameter1[2].nameModifier)
    }
}
function addDrink(parameter1, parameter2) {
    do {
        userSelectAddDrink = parseInt(prompt(`Do you want to add drink?
        \n${parameter1.id}. ${parameter1.nameProduct} >> $${parameter1.price}:\n${parameter1.descriptionProduct}
        \nEnter the product number. If you do not want to add drink enter 0`))
    } while (userSelectAddDrink < 0||userSelectAddDrink == 1||userSelectAddDrink == 2||userSelectAddDrink == 3||
        userSelectAddDrink == 4||userSelectAddDrink > parameter1.id||isNaN(userSelectAddDrink));
    if (userSelectAddDrink == 0) {
        alert(`You haven't added drink`)
    } else {
        cart.push(stockProducts[userSelectAddDrink-1])
        selectFlavorDrink(parameter2)
    }
}
function addDessert(parameter1, parameter2) {
    do {
        userSelectAddDessert = parseInt(prompt(`Do you want to add dessert?
        \n${parameter1.id}. ${parameter1.nameProduct} >> $${parameter1.price}:\n${parameter1.descriptionProduct}
        \nEnter the product number. If you do not want to add dessert enter 0`))
    } while (userSelectAddDessert < 0||userSelectAddDessert == 1||userSelectAddDessert == 2||userSelectAddDessert == 3||
        userSelectAddDessert == 4||userSelectAddDessert == 5||userSelectAddDessert > parameter1.id||isNaN(userSelectAddDessert));
    if (userSelectAddDessert == 0) {
        alert(`You haven't added dessert`)
    } else {
        cart.push(stockProducts[userSelectAddDessert-1])
        selectFlavorDessert(parameter2)
    }
}
function possibleNotes(parameter1) {
    if (parameter1 == 1) {
        if (ingredientsRemoved.length !== 0 && userSelectAddDrink == 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}\nYour ${cart[2].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length !== 0 && userSelectAddDrink == 5 && userSelectAddDessert !== 6){
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        } else if (ingredientsRemoved.length !== 0 && userSelectAddDrink !== 5 && userSelectAddDessert == 6){
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}\nYour ${cart[1].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length !== 0 && userSelectAddDrink !== 5 && userSelectAddDessert !== 6){
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink == 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}\nYour ${cart[2].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink == 5 && userSelectAddDessert !== 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink !== 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink !== 5 && userSelectAddDessert !== 6) {
        }
    } else if (parameter1 == 2){
        if (ingredientsRemoved.length !== 0 && userSelectAddDrink == 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}\nYour ${cart[2].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length !== 0 && userSelectAddDrink == 5 && userSelectAddDessert !== 6){
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        } else if (ingredientsRemoved.length !== 0 && userSelectAddDrink !== 5 && userSelectAddDessert == 6){
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}\nYour ${cart[1].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length !== 0 && userSelectAddDrink !== 5 && userSelectAddDessert !== 6){
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} ${withoutTheIngredients}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink == 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}\nYour ${cart[2].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink == 5 && userSelectAddDessert !== 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink !== 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (ingredientsRemoved.length == 0 && userSelectAddDrink !== 5 && userSelectAddDessert !== 6) {
        }
    } else if (parameter1 == 3){
        if (userSelectAddDrink == 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}\nYour ${cart[2].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (userSelectAddDrink == 5 && userSelectAddDessert !== 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        } else if (userSelectAddDrink !== 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (userSelectAddDrink !== 5 && userSelectAddDessert !== 6) {
        }
    } else if (parameter1 == 4){
        if (userSelectAddDrink == 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}\nYour ${cart[2].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (userSelectAddDrink == 5 && userSelectAddDessert !== 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        } else if (userSelectAddDrink !== 5 && userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[1].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (userSelectAddDrink !== 5 && userSelectAddDessert !== 6) {
        }  
    } else if (parameter1 == 5) {
        if (userSelectAddDessert == 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} flavor ${selectedDrinkFlavor[0]}\nYour ${cart[1].nameProduct} flavor ${selectedDessertFlavor[0]}`
        } else if (userSelectAddDessert !== 6) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        }
    } else if (parameter1 == 6) {
        if (userSelectAddDrink == 5) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} flavor ${selectedDessertFlavor[0]}\nYour ${cart[1].nameProduct} flavor ${selectedDrinkFlavor[0]}`
        } else if (userSelectAddDrink !== 5) {
            orderDetail +=`\n\nNOTE:\nYour ${cart[0].nameProduct} flavor ${selectedDessertFlavor[0]}`
        }
    }
}
function selectPaymentMethod(parameter1){
    do {
        parameter1 = parseInt(prompt("How would you like to pay? \n1-Credit Card\n2-Cash"))
    } while (parameter1 < 1||parameter1 == " "||parameter1 > 2||isNaN(parameter1));
    if (parameter1 == 1) {
        alert(`You have selected the card payment method.`); console.log(`You have selected the card payment method`)
        nameUserCard = prompt("Enter the name that appears on your card")
        numberCard = parseInt(prompt("Enter your card number")) 
        cardExpiration = parseInt(prompt("Enter the expiration of your card"))
        cvv = parseInt(prompt("Enter the cvv code of your card"))
        if (nameUserCard == " "||numberCard == " "||cardExpiration == " "||cvv == " "||isNaN(numberCard)||isNaN(cvv)||isNaN(cardExpiration)){
            while (nameUserCard == " "||numberCard == " "||cardExpiration == " "||cvv == " "||isNaN(numberCard)||isNaN(cvv)||isNaN(cardExpiration)){
                alert("You have entered incorrect data, please try again")
                console.log("You have entered incorrect data, please try again")
                nameUserCard = prompt("Enter the name that appears on your card")
                numberCard = parseInt(prompt("Enter your card number"))
                cardExpiration = parseInt(prompt("Enter the expiration of your card (mmyy)"))
                cvv = parseInt(prompt("Enter the cvv code of your card"))
            }
        } else {
            alert ("Your data has been validated, payment completed")
            console.log ("Your data has been validated, payment completed")
        }
    } else if (parameter1 == 2) {
        alert(`You have selected cash payment method.`); console.log(`You have selected cash payment method`)
    }
}
function checkout(parameter1, parameter2) {
    for (item of cart) {
        orderDetail += `\n1. ${item.nameProduct} >> $${item.price}`
        priceTotal += (item.price)
    }
    possibleNotes(parameter1)
    alert(`${orderDetail}\n\nTOTAL: $${priceTotal}`); console.log(`${orderDetail}\n\nTOTAL: $${priceTotal}`)
    selectPaymentMethod(parameter2)
}
//-----------------------------------------------------------------------------------------------------------------
//Program Start
alert("¡Hi, your welcome to MagicStore!"); console.log("Hi, your welcome to MagicStore")
nameUser = prompt(`Enter your name to see the products`); console.log(`Enter your name to see the products`); console.log(`The name entered is ${nameUser}`)
alert(`Thanks ${nameUser}, you can now place your order!`); console.log(`Thanks ${nameUser}, you can now place your order!`)
selectProduct()
if (userSelectionProduct == 1) {
    selectIngredientRemove(modifiersProduct1)
    convertDeletedIngredientsToString()
    addDrink(product5,modifiersProduct5)
    addDessert(product6,modifiersProduct6)  
} else if(userSelectionProduct == 2) {
    selectIngredientRemove(modifiersProduct2)
    convertDeletedIngredientsToString()
    addDrink(product5,modifiersProduct5)
    addDessert(product6,modifiersProduct6)
} else if(userSelectionProduct == 3) {
    addDrink(product5,modifiersProduct5)
    addDessert(product6,modifiersProduct6)
} else if(userSelectionProduct == 4) {
    addDrink(product5,modifiersProduct5)
    addDessert(product6,modifiersProduct6)
} else if(userSelectionProduct == 5) {
    selectFlavorDrink(modifiersProduct5)
    addDessert(product6,modifiersProduct6)
} else if(userSelectionProduct == 6) {
    selectFlavorDessert(modifiersProduct6)
    addDrink(product5,modifiersProduct5)
}
checkout(userSelectionProduct, paymentMethod)
alert(`Thank you very much for your purchase ${nameUser}. ¡Enjoy your order!`)
console.log(`Thank you very much for your purchase ${nameUser}. ¡Enjoy your order!`)
//END