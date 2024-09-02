const User = require('../models/User')


const createUser = (userData)=>{

    try {
        const newUser = User.create(userData)
        return newUser
    } catch (error) {
        
        throw new Error('Error crwating user', error)
    }
}

const logIn = async(email,password) =>{

    try {
       const user = await User.findOne({where: {email}}) 

       if(!user){
         throw new NotExistEmailError('This email is not exist')
       }

       const isPasswordValid = await password === user.password
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