const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.TOKEN_SECRET

module.exports.authenticateTokenAdmin = (req, res, next) => {
  const token = req.headers.authorization;

    if (token === null) return res.sendStatus(401) 
    jwt.verify(token, SECRET, (err, row) => {
       
      if (err || row.role==="user"){
        return res.sendStatus(403) 
      } 
      if(row.role==="admin"){
      next()
    }
    })
  }


