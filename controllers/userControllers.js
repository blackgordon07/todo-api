const mongoose = require ('mongoose')
const User =require('../models/User')

async function getUsers(req,res,next) {
    try {
        const users =  await User.find()
        res.json({users})
        .sort('-createdAt')
    } catch (error) {
        next(error)
    }
}

async function getUserByID(req,res,next) {
    try {
        const user = await User.findById(req.params.id)

        if(!user) return res.status(400).json({message: 'User not found'})
            res.json({user})
        
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUserByID,
    getUsers
}
