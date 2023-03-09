const orderSummary = document.getElementById("order-summary")
const paymentInfo = document.getElementById("payment-info")

let pizzaCount = 0
let hamburgerCount = 0
let beerCount = 0

document.addEventListener("click", function(e){
    if(e.target.id === "pizza-plus-btn" 
    || e.target.id === "hamburger-plus-btn"
    || e.target.id === "beer-plus-btn"){
        handlePlusItem(e.target.id)
    } else if(e.target.id === "remove-Pizza"
    || e.target.id === "remove-Hamburger"
    || e.target.id === "remove-Beer"){
        removeItem(e.target.id)
    } else if(e.target.id === "complete-order-btn"){
        renderPaymentWindow(pizzaCount * 14 + (hamburgerCount + beerCount) * 12)
    }
})

// Handle the form submission
paymentInfo.addEventListener("submit", function(e){
    e.preventDefault()

    const formData = new FormData(paymentInfo)
    const firstName = formData.get("full-name").split(" ")[0] // get the first name
    renderThankYouAlert(firstName, pizzaCount, hamburgerCount, beerCount, pizzaCount * 14 + (hamburgerCount + beerCount) * 12)
})

function handlePlusItem(itemId){
    if(itemId === "pizza-plus-btn"){
        pizzaCount++
    } else if(itemId === "hamburger-plus-btn"){
        hamburgerCount++
    } else if(itemId === "beer-plus-btn"){
        beerCount++
    }
    renderTotalPrice()
}

function removeItem(itemId){
    if(itemId === "remove-Pizza"){
        pizzaCount = 0
    } else if(itemId === "remove-Hamburger"){
        hamburgerCount = 0
    } else if(itemId === "remove-Beer"){
        beerCount = 0
    }
    renderTotalPrice()
}

function renderTotalPrice(){
    // render the order items
    let pizzaItem = renderOrderItems("Pizza", pizzaCount, 14)
    let hamburgerItem = renderOrderItems("Hamburger", hamburgerCount, 12)
    let beerItem = renderOrderItems("Beer", beerCount, 12)


   /*  // render the order summary
    orderSummary.innerHTML = `
        <h2>Your order:</h2>
        ${pizzaItem}
        ${hamburgerItem}
        ${beerItem}
        <hr>
        <div class="price-summary">
            <div class="price-summary-text flex space-between">
                <h3>Total price:</h3>
                <h3>$${pizzaCount * 14 + (hamburgerCount + beerCount) * 12}</h3>
            </div>
            <button id="complete-order-btn">Complete order</button>
        </div>
    ` */

    document.getElementById("pizza-item").innerHTML = `${pizzaItem}`
    document.getElementById("hamburger-item").innerHTML = `${hamburgerItem}`
    document.getElementById("beer-item").innerHTML = `${beerItem}`
    document.getElementById("total-price").innerHTML = `$${pizzaCount * 14 + (hamburgerCount + beerCount) * 12}`

    orderSummary.classList.remove("hidden")

    // if the order is empty, remove the order summary
    if(pizzaCount + hamburgerCount + beerCount === 0){
        orderSummary.classList.add("hidden")
    }
    
}

// render the order items one by one
function renderOrderItems(name, quantity, price) {
    if(quantity > 0){
        return `
        <div class="item-container flex space-between">
            <h4 class="item-name">${name}</h4>
            <div class="item-container-price flex">
                <p class="quantity">${quantity}x</p>
                <p class="remove" id="remove-${name}">remove</p>
                <h4 class="price">$${price * quantity}</h4>
            </div>
        </div>`
    } else {
        return ""
    }
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

    // render the order items
    let pizzaItem = renderSummaryItems("Pizza", pizzaCount, 14)
    let hamburgerItem = renderSummaryItems("Hamburger", hamburgerCount, 12)
    let beerItem = renderSummaryItems("Beer", beerCount, 12)

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
  