// app.js
const express = require('express');
const app = express();

const db = require('./config/db')

// Corrected this line: it should be `app.use`, not `app.request`
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, I\'m working');
});

// Testing get method
app.get('/test', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM rating');
        console.log("/test");
        res.send(rows);
    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = app;
