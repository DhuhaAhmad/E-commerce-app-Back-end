const express = require('express');
const app = express();

const sequelize = require('./src/config/db')
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, I\'m working');
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = app;
