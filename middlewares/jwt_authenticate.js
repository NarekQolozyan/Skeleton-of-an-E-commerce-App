const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.TOKEN_SECRET
require('dotenv').config()


exports.generateAccessToken=(username,role)=>{
    return jwt.sign({ username,role }, JWT_SECRET , { expiresIn: "36000s" });
} 