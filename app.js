const express = require('express');
const app = express();
const {checkBlacklist} = require('./src/middlewares/checkBlackList')

const userRoute = require('./src/routes/user-route')

const sequelize = require('./src/config/db');


app.use(express.json());
app.use(checkBlacklist)
app.use(userRoute)


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = app;
