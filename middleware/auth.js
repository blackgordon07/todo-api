const jwt = require ('jsonwebtoken')

async function authenticateToken(req,res,next) {
    try {
        const authHeader = req.headers['authorization']
        // check if authheader exists
       if(!authHeader) return res.status(401).json({message: "No token provided"})
        
        const token = authHeader && authHeader.split(' ')[1]

        if(!token) return res.status(401).json({message: "Token missing"})

       const decoded =  jwt.verify(token, process.env.JWT_SECRET)
     
        req.user = {
            id: decoded.id,
            isAdmin: decoded.isAdmin
        }
        next()
    } catch (error) {
       return res.status(403).json({message: "Invalid or expired token"})
    }
}

async function authAdmin(req,res,next) {
    
        if(!req.user.isAdmin) return res.status(403).json({message: "Access Denied"})
    next()
}

module.exports = {
    authAdmin,
    authenticateToken
}