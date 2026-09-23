const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());


// PostgreSQL connection

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


pool.connect()
    .then(() => {
        console.log("PostgreSQL connected!");
    })
    .catch((error) => {
        console.log("PostgreSQL connection failed:", error.message);
    });


// Home

app.get("/", (req, res) => {

    res.send("DineDesk Backend is working!");

});


// Menu

app.get("/menu", (req, res) => {

    const menu = [
        { name: "Pizza", price: 250 },
        { name: "Burger", price: 180 },
        { name: "Pasta", price: 220 },
        { name: "Sandwich", price: 280 }
    ];

    res.json(menu);

});


// Create order

app.post("/orders", async (req, res) => {

    const items = req.body;

    try {

        const result = await pool.query(
            "INSERT INTO orders (items) VALUES ($1) RETURNING *",
            [JSON.stringify(items)]
        );

        console.log("New order:", result.rows[0]);

        res.json({
            message: "Order received successfully",
            order: result.rows[0]
        });

    } catch (error) {

        console.log("Order error:", error.message);

        res.status(500).json({
            message: "Failed to save order"
        });

    }

});


// Get all orders

app.get("/orders", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM orders ORDER BY id"
        );

        res.json(result.rows);

    } catch (error) {

        console.log("Order error:", error.message);

        res.status(500).json({
            message: "Failed to get orders"
        });

    }

});


// Update order status

app.put("/orders/:id", async (req, res) => {

    const id = req.params.id;
    const status = req.body.status;

    try {

        const result = await pool.query(
            "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );

        if (result.rows.length == 0) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        console.log("Order status updated:", result.rows[0]);

        res.json({
            message: "Order status updated",
            order: result.rows[0]
        });

    } catch (error) {

        console.log("Status update error:", error.message);

        res.status(500).json({
            message: "Failed to update order"
        });

    }

});


// Create reservation

app.post("/reservations", async (req, res) => {

    const { name, people, date, time } = req.body;

    try {

        const result = await pool.query(
            `INSERT INTO reservations
            (name, people, date, time)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [name, people, date, time]
        );

        console.log("New reservation:", result.rows[0]);

        res.json({
            message: "Table reserved successfully",
            reservation: result.rows[0]
        });

    } catch (error) {

        console.log("Reservation error:", error.message);

        res.status(500).json({
            message: "Failed to save reservation"
        });

    }

});


// Start server

app.listen(3000, () => {

    console.log("Server started!");
    console.log("http://localhost:3000");

});