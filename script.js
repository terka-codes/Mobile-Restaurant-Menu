const orderSummary = document.getElementById("order-summary")
const paymentInfo = document.getElementById("payment-info")

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

// Handle the form submission
paymentInfo.addEventListener("submit", function(e){
    e.preventDefault()

    const formData = new FormData(paymentInfo)
    const firstName = formData.get("full-name").split(" ")[0] // get the first name
    renderThankYouAlert(firstName, pizza, hamburger, beer, pizza * 14 + (hamburger + beer) * 12)
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

    // render the order items if the quantity is greater than 0 for each item
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

    // render the order summary
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
    // if the order is empty, remove the order summary
    if(pizza + hamburger + beer === 0){
        orderSummary.innerHTML = ""
    }
    
}

// render the order items one by one
function renderOrderItems(name, quantity, price) {
    item = `
    <div class="item-container flex space-between">
        <h4 class="item-name">${name}</h4>
        <div class="item-container-price flex">
            <p class="quantity">${quantity}x</p>
            <p class="remove" id="remove-${name}">remove</p>
            <h4 class="price">$${price * quantity}</h4>
        </div>
    </div>`
    return item
}

// render the payment window
function renderPaymentWindow(price) {
    const paymentInfo = document.getElementById("payment-info")
  
    // toggle the visibility of the payment window
    paymentInfo.classList.remove("hidden")
  
    // if the payment window is visible, add a click listener to hide it when the user clicks outside
    if (!paymentInfo.classList.contains("hidden")) {
      document.addEventListener("click", function handleClickOutside(e) {
        if (!e.target.closest("#payment-info")) {
          paymentInfo.classList.add("hidden")

          // clear the input fields
          const inputFields = document.querySelectorAll("#payment-info input")
          for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].value = "";
          }
  
          // remove the click listener once the payment window is hidden
          document.removeEventListener("click", handleClickOutside)
        }
      })
    }
  
    // add the button to the payment window
    document.getElementById("pay-button").innerHTML = `
      <button type="submit">Pay $${price}</button>
    `
}

// render the thank you alert
function renderThankYouAlert(name, pizza, hamburger, beer, total){
    document.getElementById("orders").classList.add("hidden")
    document.getElementById("order-summary").classList.add("hidden")
    paymentInfo.classList.add("hidden")

    // render the order items if the quantity is greater than 0 for each item
    if(pizza > 0){
        pizzaItem = renderSummaryItems("Pizza", pizza, 14)
    } else {
        pizzaItem = ""
    }
    if(hamburger > 0){
        hamburgerItem = renderSummaryItems("Hamburger", hamburger, 12)
    } else {
        hamburgerItem = ""
    }
    if(beer > 0){
        beerItem = renderSummaryItems("Beer", beer, 12)
    } else {
        beerItem = ""
    }

    // render the thank you alert into the DOM
    document.getElementById("thank-you-alert").innerHTML = `
        <div class="message" id="message">
            <div class="green-box">
                <h2>Thank you, ${name}!<br>Your order is on its way.</h2>
            </div>
            <h3>Order summary:</h3>
            ${pizzaItem}
            ${hamburgerItem}
            ${beerItem}  
            <hr>
            <div class="price-summary-text flex space-between">
                <h3>Total price:</h3>
                <h3>$${total}</h3>
            </div>
        </div>
    `
}

// render the order items one by one
function renderSummaryItems(name, quantity, price) {
item = `
<div class="item-container flex space-between">
    <h4 class="item-name">${name}</h4>
    <div class="item-container-price flex">
        <p class="quantity">${quantity}x</p>
        <h4 class="price">$${price * quantity}</h4>
    </div>
</div>`
return item
}
  