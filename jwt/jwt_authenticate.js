const jwt = require('jsonwebtoken');

require('dotenv').config()
const SECRET = process.env.TOKEN_SECRET

exports.authenticateToken=(req,res,next)=>{
    const token = req.headers['authorization']
    console.log(token)
    if(token === null){
        res.sendStatus(401)
    }

    jwt.verify(token,SECRET,(err,user)=>{
        if(err){
            res.sendStatus(403)
        }
        next()
    })
}