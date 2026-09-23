fetch("http://localhost:3000/orders")
    .then(response => response.json())
    .then(data => {

        let ordersDiv = document.getElementById("orders");

        ordersDiv.innerHTML = "";

        if (data.length == 0) {
            ordersDiv.innerHTML = "<p>No orders yet.</p>";
            return;
        }

        for (let i = 0; i < data.length; i++) {

            let order = data[i];

            let orderBox = document.createElement("div");
            orderBox.className = "order";

            let items = "";

            for (let j = 0; j < order.items.length; j++) {

                items += `
                    <p>
                        ${order.items[j].name} × ${order.items[j].quantity}
                        - ₹${order.items[j].price * order.items[j].quantity}
                    </p>
                `;
            }

            orderBox.innerHTML = `
                <h2>Order ${order.id}</h2>

                ${items}

                <p>Status: <strong>${order.status}</strong></p>

                <button onclick="changeStatus(${order.id}, this)">
                    ${order.status}
                </button>
            `;

            ordersDiv.appendChild(orderBox);
        }

    })
    .catch(error => {
        console.log("Error:", error);
    });


function changeStatus(id, button) {

    let newStatus;

    if (button.innerText == "Preparing") {
        newStatus = "Ready";
    }
    else if (button.innerText == "Ready") {
        newStatus = "Completed";
    }
    else {
        return;
    }

    fetch("http://localhost:3000/orders/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            status: newStatus
        })

    })
    .then(response => response.json())
    .then(data => {

        if (data.order) {

            button.innerText = data.order.status;

            button.previousElementSibling.innerHTML =
                "Status: <strong>" + data.order.status + "</strong>";

        }

    })
    .catch(error => {
        console.log("Status update error:", error);
    });

}