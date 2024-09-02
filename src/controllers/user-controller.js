const userService = require('../services/user-service')


const createUser = async(req,res)=>{

    try {
        
        // object destructure
        const {firstName ,lastName ,email ,password} = req.body

        const newUser = await userService.createUser({firstName ,lastName ,email ,password})

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
          
        return res.status(200).send("Welcome "+user.firstName)

    } catch (error) {
      
        if (error.message === 'Login failed: This email is not exist') {
            return res.status(401).json({ error: 'This email is not exist' });
          }
        if (error.message === 'Login failed: Wrong password') {
            return res.status(401).json({ error: 'Wrong password' });
          }
        return res.status(500).json({ error: 'Failed to find user' });
        
    }
}

module.exports ={
    createUser,
    logIn
}