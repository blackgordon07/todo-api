const Task = require('../models/Tasks')
const User = require('../models/User')
async function createTask(req,res,next) {

    try {
        const title = req.body.title

    if(!title) return res.status(400).json({message: "Input task"})

        const task = await Task.create({
            title: title,
            user: req.user.id
        })
        res.status(201).json({task})
    } catch (error) {
        next(error)
    }
    
}

async function getTasks(req,res,next) {
    try {

        const filter = {user: req.user.id, active: true}
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const skip = (page - 1)*limit

        if(req.query.completed){
            filter.completed = req.query.completed === "true"
        }
 
        const tasks = await Task.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1})
      

        const total = await Task.countDocuments(filter)
        
        res.json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalTasks: total,
            tasks
        })
        
    } catch (error) {
        next(error)
    }
}

const toggleTask = async (req,res,next)=>{
   try {
    const {id} = req.params

    const task = await Task.findOne({
        _id:id,
        user: req.user.id
    })

    if(!task) return res.status(404).json({message: 'Task not found'})
        console.log("Before:", task.completed)

task.completed = !task.completed

console.log("After:", task.completed)
    await task.save()

    res.status(200).json(task)
   } catch (error) {
    next(error)
   } 
   
}





module.exports = {
    createTask,
    getTasks,
    toggleTask
   
}