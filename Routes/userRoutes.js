const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login } = userController
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login )

module.exports = router