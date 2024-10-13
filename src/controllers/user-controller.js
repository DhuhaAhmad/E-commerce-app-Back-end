require('dotenv').config()
const userService = require('../services/user-service')
const jwt = require('jsonwebtoken')

const createUser = async(req,res)=>{

    try {
        
        // object destructure
        const {firstName ,lastName ,email ,password} = req.body

        const newUser = await userService.createUser(firstName ,lastName ,email ,password)

        return res.status(201).json(newUser)

    } catch (error) {
        console.log(error)
        if(error.name === 'SequelizeValidationError'){
            // Extract validation error msg
            const validationErrorMsg = error.errors.map(err => err.message)
            return res.status(400).json({errors: validationErrorMsg})
        }
        return res.status(500).json({ error: 'Failed to create user' });
        
    }
}
const logIn = async(req,res)=>{

    try {
        
        // object destructure
        const {email ,password} = req.body

        const user = await userService.logIn(email ,password)
          
        const token = jwt.sign({email:user.email}, process.env.JWT_SECRET_KEY, {expiresIn:'2h'})
        // return res.status(200).send("Welcome "+user.firstName)
        return res.status(200).json({token:token})
        


    } catch (error) {

        console.log(39,error.message)
        if (error.message === 'Login failed: This email is not exist') {
            return res.status(401).json({ error: 'This email is not exist' });
          }
        if (error.message === 'Login failed: Wrong password') {
            return res.status(401).json({ error: 'Wrong password' });
          }
        return res.status(500).json({ error: 'Failed to find user' });
        
    }
}

const logOut = async(req,res)=>{

    const token = req.header('Authorization')?.split(' ')[1]
    console.log(token)

    const result = await userService.logOut(token)
    console.log(result)

    if (result.success) {
        return res.status(200).json({ msg: result.msg });
    } else {
        return res.status(400).json({ msg: result.msg });
    }
}

const protected = async(req,res)=>{
   return res.json({msg:"protected"})
}

module.exports ={
    createUser,
    logIn,
    logOut,
    protected
}