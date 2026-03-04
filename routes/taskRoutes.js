const express = require ('express')
const taskRouter = express.Router()
const { createTask, getTasks, toggleTask }= require('../controllers/taskController')
const {authenticateToken} = require('../middleware/auth')

taskRouter.post('/create', authenticateToken,createTask)
taskRouter.get('/', authenticateToken,getTasks)
taskRouter.patch('/:id/toggle', authenticateToken, toggleTask)



module.exports = taskRouter