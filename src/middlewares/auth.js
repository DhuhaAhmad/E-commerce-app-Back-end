const jwt = require('jsonwebtoken')
const { blacklist } = require('./checkBlackList');


const authMiddleware = (req,res,next)=>{

    const authHeader = req.header('Authorization')
    console.log('authHeader', authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        console.log(11)
        return res.status(401).json({msg: 'No Token provided'})
    }



    const token = authHeader.split(' ')[1]
console.log(18,token)
    if(blacklist.has(token)){
        return res.status(401).json({ msg: 'Token has been blacklisted, please log in again' });

    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log("Decoded token:", decoded);
        // req.email = decoded.email
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ msg: 'Token is not valid' });

    }
}

module.exports = authMiddleware

