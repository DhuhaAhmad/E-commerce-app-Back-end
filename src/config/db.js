const {Sequelize} = require('sequelize')


// connect using Sequelize
const sequelize = new Sequelize('e-commerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' // Specify your dialect here
  });


  module.exports = sequelize