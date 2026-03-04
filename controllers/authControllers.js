const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')

function generateAccessToken(user){
    return jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET,{expiresIn:'15m'})
}

//REGISTER ADMIN
async function registerAdmin(req,res,next) {
    try {
        const{username, email, password, isAdmin}= req.body
    if(!(username&& email && password)) return res.status(400).json({message: "All fields are required"})
        //Check if required admin status is set to true 
    if(!isAdmin) return res.status(400).json({message:'Set admin status to true'})
         const formattedEmail= email.trim().toLowerCase()

    const admin = await User.create({
        username,
        email: formattedEmail,
        password,
        isAdmin: true
    })
    res.status(201).json(admin)

    } catch (error) {
        next(error)
    }
}


//REGISTER NEW USER
async function registerUser(req, res, next){
    try {
        const {username , email , password} = req.body
//check if required field are provided
        if(!(username && email && password)) return res.status(400).json(error)

           //format email
           const formattedEmail = email.trim().toLowerCase()
           
           //create new user
           const user = await User.create({
            username,
            email: formattedEmail,
            password
           })
           
           res.status(201).json({user})
    } catch (error) {
        next(error)
    }
}

async function loginUser(req, res, next){
    try {
        const {email, password} = req.body
        if(!(email && password)) return res.status(400).json(error)
      
            let user
    if(email){
        const formattedEmail = email.trim().toLowerCase()
        user= await User.findOne({email: formattedEmail})
    }

    if(!user) return res.status(401).json(error)
    
        //compare password
    const auth =  await bcrypt.compare(password, user.password)
    
    if(!auth) return res.status(401).json(error)

        //generate and sign access token
        const accessToken = generateAccessToken(user)

        res.status(200).json({accessToken})
    } catch (error) {
        next(error)
    }
}


module.exports= {
    registerAdmin,
    registerUser,
    loginUser
}