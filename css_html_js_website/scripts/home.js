//dict of items
var items = {};

function roundNum(num) {
    return Math.round(num * 100) / 100;
} 

function toggleCart() {
    if (localStorage.getItem('items') != null) {
        items = JSON.parse(localStorage.getItem('items'));
        updateCart();
    }
    var cartContainer = document.getElementById('cart-container');
    if (cartContainer.style.display === 'none') {
        closeCheckout();
    }
    cartContainer.style.display = 'none' ? 'block' : 'none';
}

function closeCart() {
    document.getElementById('cart-container').style.display = 'none';
}

function addToCart(itemName, price) {
    var i = 1
    if (itemName in items) {
        i = items[itemName][0] + 1;
    }
    items[itemName] = [i, price];
    updateCart();
}

function updateCart() {
    localStorage.setItem('items', JSON.stringify(items));
    var subtotalEl = document.getElementById('subtotal');
    var taxEl = document.getElementById('tax');
    var totalEl = document.getElementById('total');
    if (Object.keys(items).length > 0) {
        document.getElementById('checkout').style.display = 'initial';
        subtotalEl.style.display = 'initial';
        taxEl.style.display = 'initial';
        totalEl.style.display = 'initial';
    }
    else {
        document.getElementById('checkout').style.display = 'none';
        subtotalEl.style.display = 'none';
        taxEl.style.display = 'none';
        totalEl.style.display = 'none';
    }
    var cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    var total = 0;
    for (var itemName in items) {
        var newItem = document.createElement('p');
        var removeButton = document.createElement('button');
        removeButton.appendChild(document.createTextNode("X"));
        (function (item) {
            removeButton.onclick = function() {
                items[item][0] -= 1;
                if (items[item][0] == 0) {
                    delete items[item];
                }
                updateCart();
            }
        })(itemName);
        newItem.appendChild(removeButton);
        newItem.textContent = `${itemName} | $${items[itemName][1] * items[itemName][0]} | Quantity: ${items[itemName][0]}`;
        cartItemsElement.appendChild(newItem);
        cartItemsElement.appendChild(removeButton);
        total += items[itemName][1] * items[itemName][0];
    }
    var tax = roundNum(total * 0.13);
    document.getElementById('subtotal').textContent = "Subtotal: $" + roundNum(total);
    document.getElementById('tax').textContent = " | Tax: $" + tax;
    document.getElementById('total').textContent = " | Total: $" + roundNum(total + tax);
}

function checkout() {
    document.getElementById('checkout-form').style.display = 'block'
    closeCart();
}

function closeCheckout() {
    document.getElementById('checkout-form').style.display = 'none'
}

function submitCheckout() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;
    var cardNum = document.getElementById('card-number').value;
    var cardExp = document.getElementById('expiry-date').value;
    var cardCvv = document.getElementById('cvv').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNumRegex = /^[0-9]{16}$/;
    const cardExpRegex = /^[0-9]{2}\/[0-9]{2}$/;
    const cvvRegex = /^[0-9]{3}$/;

    if (name.trim() === "") {
        alert("Name must be filled out");
        return false;
    }

    if (email.trim() === "" && !emailRegex.test(email)) {
        alert("Email must be filled out");
        return false;
    }

    if (address.trim() === "") {
        alert("Address must be filled out");
        return false;
    }

    if (!cardNumRegex.test(cardNum)) {
        alert('Invalid card number');
        return;
    }
    if (!cardExpRegex.test(cardExp)) {
        alert('Invalid expiry date');
        return;
    }
    if (!cvvRegex.test(cardCvv)) {
        alert('Invalid CVV');
        return;
    }
    alert("Order submitted. Thank you for your purchase!")
    return true;
}