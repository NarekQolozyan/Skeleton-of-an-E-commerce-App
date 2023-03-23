const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

exports.authenticateTokenUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
    if (token === null) return res.sendStatus(401); 
    
    jwt.verify(token, SECRET, (err, row) => {
      if (err){
        return res.sendStatus(403) 
      } 
      if(row.role==="user"){
      next()
    }
    })
  }
