const express = require('express')
const userRouter = express.Router()
const { getUsers, getUserByID } = require('../controllers/userControllers')
const {authenticateToken,authAdmin} = require('../middleware/auth.js')

userRouter.get('/',authenticateToken, authAdmin,getUsers)
userRouter.get('/:id',authenticateToken,authAdmin,getUserByID)

module.exports = userRouter

