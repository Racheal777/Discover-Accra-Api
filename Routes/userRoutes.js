const express = require('express')
const userController = require('../Controllers/userController')
const { signup } = userController
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
router.post('/signup', userAuth.saveUser, signup)

module.exports = router