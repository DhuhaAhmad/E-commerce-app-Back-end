const {Sequelize} = require('sequelize')


// connect using Sequelize
const sequelize = new Sequelize('e-commerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Specify your dialect here
    logging: console.log, // Enable default logging to the console

  });


  module.exports = sequelize