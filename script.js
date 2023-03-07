const orderSummary = document.getElementById("order-summary")

let pizza = 0
let hamburger = 0
let beer = 0

document.addEventListener("click", function(e){
    if(e.target.id === "pizza-plus-btn" 
    || e.target.id === "hamburger-plus-btn"
    || e.target.id === "beer-plus-btn"){
        handlePlusItem(e.target.id)
    } else if(e.target.id === "remove-Pizza"){
        pizza = 0
        renderTotalPrice()
    } else if(e.target.id === "remove-Hamburger"){
        hamburger = 0
        renderTotalPrice()
    } else if(e.target.id === "remove-Beer"){
        beer = 0
        renderTotalPrice()
    } else if(e.target.id === "complete-order-btn"){
        renderPaymentWindow(pizza * 14 + (hamburger + beer) * 12)
    }

})

function handlePlusItem(itemId){
    if(itemId === "pizza-plus-btn"){
        pizza++
    } else if(itemId === "hamburger-plus-btn"){
        hamburger++
    } else if(itemId === "beer-plus-btn"){
        beer++
    }
    renderTotalPrice()
}

function renderTotalPrice(){
    let pizzaItem
    let hamburgerItem
    let beerItem

    if(pizza > 0){
        pizzaItem = renderOrderItems("Pizza", pizza, 14)
    } else {
        pizzaItem = ""
    }
    if(hamburger > 0){
        hamburgerItem = renderOrderItems("Hamburger", hamburger, 12)
    } else {
        hamburgerItem = ""
    }
    if(beer > 0){
        beerItem = renderOrderItems("Beer", beer, 12)
    } else {
        beerItem = ""
    }


    orderSummary.innerHTML = `
        <h2>Your order:</h2>
        ${pizzaItem}
        ${hamburgerItem}
        ${beerItem}
        <hr>
        <div class="price-summary">
            <div class="price-summary-text flex space-between">
                <h3>Total price:</h3>
                <h3>$${pizza * 14 + (hamburger + beer) * 12}</h3>
            </div>
            <button id="complete-order-btn">Complete order</button>
        </div>
    `

    if(pizza + hamburger + beer === 0){
        orderSummary.innerHTML = ""
    }
    
}

function renderOrderItems(name, quantity, price) {
    item = `
    <div class="item-container flex space-between">
        <h4 class="item-name">${name}</h4>
        <div class="item-container-price flex">
            <p class="quantiti">${quantity}x</p>
            <p class="remove" id="remove-${name}">remove</p>
            <h4 class="price">$${price * quantity}</h4>
        </div>
    </div>`
    return item
}

function renderPaymentWindow(price){
    console.log("Payment window", price)
}
