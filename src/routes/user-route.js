const express = require('express')
const userController = require('../controllers/user-controller')
const { checkBlacklist } = require('../middlewares/checkBlackList')
const authMiddleware = require('../middlewares/auth')


const router = express.Router()

router.post('/auth/register', userController.createUser)
router.post('/auth/login', userController.logIn)
router.post('/auth/logout', userController.logOut)
router.get('/protected', authMiddleware ,userController.protected)

module.exports=router