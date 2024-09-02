const express = require('express')
const userController = require('../controllers/user-controller')


const router = express.Router()

router.post('/auth/register', userController.createUser)
router.post('/auth/login', userController.logIn)

module.exports=router