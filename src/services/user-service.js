const User = require('../models/User')
const bcrypt = require('bcryptjs')


const createUser = async(firstName,lastName,email,password)=>{

    try {
        const existingUser  = await User.findOne({where: {email}}) 
        if(existingUser){
            throw new Error('User is already Exist')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10) //generate random string of data 
        hashedPassword = await bcrypt.hash(password,salt)

        const newUser = User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        return newUser
    } catch (error) {
        
        throw new Error('Error creating user', error)
    }
}

const logIn = async(email,password) =>{

    try {
       const user = await User.findOne({where: {email}}) 

       if(!user){
         throw new NotExistEmailError('This email is not exist')
       }

       const isPasswordValid = await bcrypt.compare(password,user.password)
       if(!isPasswordValid){
        throw new WrongPasswordError('Wrong password')

        
       }
       return user



    } catch (error) {
       
        throw new Error('Login failed: ' + error.message);

    }
}


class NotExistEmailError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotExistEmailError';
    }
}
class WrongPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongPasswordError';
    }
}

module.exports={
  createUser,
  logIn
}