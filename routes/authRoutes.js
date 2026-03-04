const express = require('express')
const authRouter = express.Router()

const { registerUser, loginUser, registerAdmin } = require('../controllers/authControllers')

authRouter.post('/admin', registerAdmin)
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)

module.exports= authRouter