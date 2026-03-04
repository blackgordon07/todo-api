const app = require('./app')
require('dotenv').config()
const connectMongoose = require('./config/mongoose.js')

const PORT = process.env.PORT

connectMongoose().then(()=>{
    app.listen( PORT, ()=>{
        console.log(`👾 SERVER IS RUNNING ON PORT ${PORT}`)
    })
})

