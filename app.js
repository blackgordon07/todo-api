const express = require('express')
const app = express()
const errorHandler = require('./middleware/errorHandler.js')
const authRouter = require('./routes/authRoutes')
const taskRouter = require('./routes/taskRoutes.js')
const userRouter = require('./routes/userRoutes')
app.use(express.json())


app.use('/auth', authRouter)
app.use('/task', taskRouter)
app.use('/user', userRouter)

app.use(errorHandler)

module.exports = app
