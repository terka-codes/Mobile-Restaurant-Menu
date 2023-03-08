# Mobile Restaurant Menu 📱

## Welcome! 👋

Hey there! I'm a junior developer and this is my latest project: a mobile restaurant menu built with Vanilla JavaScript from scratch. The challenge was provided by Scrimba, but I customized the design to my liking.

👉 [LIVE SITE](https://wondrous-kleicha-70a057.netlify.app/) 👈

## Quick video demonstration 👩‍💻

Check out this demo video of my project in action:

https://user-images.githubusercontent.com/107133029/223716388-b34006d8-546d-45e9-8daa-da193b208deb.mov

## Table of contents

- [Overview](#overview)
  - [Functionality](#functionality)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Lessons to remember](#lessons-to-remember)
- [Author](#author)

## Overview

### Functionality

My mobile restaurant menu is built using HTML, CSS, and Vanilla JS. When users visit the site, they are greeted with the menu. When they click on the "+" button for each menu item, a function is triggered that displays the total order, including the items, amounts, and price.
Users can also remove items from the list. Once users have selected their desired items, they can click on the "complete order" button to proceed to payment. A payment form is displayed, prompting users to enter their name and card information. 
If all fields are filled in, users can pay the displayed amount by clicking on the "pay" button. Once the payment is complete, a thank you message with the user's first name appears, along with a summary of the order for a better user experience.

## My process

### Built with

- HTML & CSS
- Vanilla JS
- Figma design and help of the internet

### What I learned

I am so excited to showcase my skills with this from-scratch project. While the Scrimba challenge provided some design and basic requirements, I had to figure out everything on my own.

Practicing the HTML and CSS layout was fun, and it helped me to remember all the HTML tags and write cleaner code. For the JS part, I learned a lot of new things that I'm more than happy to implement in my future projects.

When starting a new project, it can be overwhelming to think about everything that needs to be done. But I found it easier to divide the problem into smaller chunks, which made it more manageable. For example, I started by creating the HTML and CSS design and then coded each functional segment one at a time. When a bug occurred, I tried to correct it immediately and make sure everything was functional every step of the way.

I learned how to extract a user's name from the input and display it in an alert message:

```JavaScript
// Handle the form submission
paymentInfo.addEventListener("submit", function(e){
    e.preventDefault()

    const formData = new FormData(paymentInfo)
    const firstName = formData.get("full-name").split(" ")[0] // get the first name
    renderThankYouAlert(firstName, pizza, hamburger, beer, pizza * 14 + (hamburger + beer) * 12)
})
```

I also learned how to close elements by clicking outside of them, which was something I struggled with for a while. I had issues with it either working only once or by clicking on the div itself. But I'm glad I figured it out and will hopefully never forget it!

```JavaScript
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
```

I also practiced reusing components. 🔄 Which I think is really good practice in coding world. Just try to be as DRY as you can.

```JavaScript
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
```
```JavaScript
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
```

### Lessons to remember

- Coding is easier than it seems! 😎
- DRY code and reusable components are friends 🤝
- Coding an element which can be closed by clicking outside of it doesn't have to be a nightmare 😴💤

## Author

- Twitter: [@TerkaCodes](https://twitter.com/TerkaCodes)
