let cart = [];

function addToCart(food, price) {

    let found = false;

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].name == food) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found == false) {

        cart.push({
            name: food,
            price: price,
            quantity: 1
        });
    }

    alert(food + " added to cart!");
}


function showCart() {

    let cartBox = document.getElementById("cart-box");
    let items = document.getElementById("cart-items");

    cartBox.style.display = "block";
    items.innerHTML = "";

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        let itemTotal = cart[i].price * cart[i].quantity;

        items.innerHTML += `
            <div class="cart-item">

                <span>${cart[i].name}</span>

                <div>
                    <button onclick="decreaseItem(${i})">−</button>

                    <span>${cart[i].quantity}</span>

                    <button onclick="increaseItem(${i})">+</button>
                </div>

                <strong>₹${itemTotal}</strong>

            </div>
        `;

        total = total + itemTotal;
    }

    if (cart.length == 0) {
        items.innerHTML = "Cart is empty";
    }

    document.getElementById("cart-total").innerText = total;
}


function increaseItem(index) {

    cart[index].quantity++;

    showCart();
}


function decreaseItem(index) {

    cart[index].quantity--;

    if (cart[index].quantity == 0) {
        cart.splice(index, 1);
    }

    showCart();
}


function closeCart() {

    document.getElementById("cart-box").style.display = "none";

}

function reserveTable() {

    let name = document.getElementById("name").value;
    let people = document.getElementById("people").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    if (name == "" || people == "" || date == "" || time == "") {
        alert("Please fill all the details");
        return;
    }

    let reservation = {
        name: name,
        people: people,
        date: date,
        time: time
    };

    fetch("http://localhost:3000/reservations", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(reservation)

    })
    .then(response => response.json())
    .then(data => {

        document.getElementById("message").innerText =
            data.message;

    });

}

function placeOrder() {

    if (cart.length == 0) {
        alert("Cart is empty");
        return;
    }

    fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        cart = [];

        closeCart();
    });
}
