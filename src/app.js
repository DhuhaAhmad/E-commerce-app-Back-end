// app.js
const express = require('express');
const app = express();

// Corrected this line: it should be `app.use`, not `app.request`
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, I\'m working');
});

module.exports = app;
