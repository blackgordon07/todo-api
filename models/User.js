const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        maxlength: [15, 'Please username must not exceed 15 characters'],
        unique: [true, 'Username already exists'],
        lowercase: true,
        trim:true,
        set: value => {
            if(value) return value.replace(/\s/g, '')
             return value   
        }
    },
    email:{
        type: String,
        required: [true , 'Email is required'],
        unique: [true, 'Email already exists'],
        lowercase: true,
        trim: true
    },
    password:{
        type:String,
        required: [true, 'Email is required'],
        trim: true,
        minlength: [6, 'Enter at least 8 characters']
    },
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        console.error(error)
    }
})

module.exports = mongoose.model('User', UserSchema)