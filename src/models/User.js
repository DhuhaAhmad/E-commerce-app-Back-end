const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
   // Built-in validators
   notNull: {
    msg: 'First Name is required'
}
    }
   
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
    
        notNull: {
         msg: 'Last Name is required'
     }
         }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
    validate: {
        notNull: {
            msg: 'Email is required'
        }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        isValidPassword(value){

            if(value.length < 8){
                throw new Error('Password must be at least 8 characters') 
            }
            // if(value.length < 8){
            //     throw new Error('Password must be at least 8 characters') 
            // }
        }
    }
  }
}, {
  timestamps: true,
  tableName: 'users'
});

// Sync the model with the database
sequelize.sync();

module.exports = User;
