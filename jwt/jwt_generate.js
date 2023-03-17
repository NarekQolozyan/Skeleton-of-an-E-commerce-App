const jwt = require('jsonwebtoken');

require('dotenv').config()
const SECRET = process.env.TOKEN_SECRET

exports.generateAccessToken=(username) => {
    return jwt.sign({ username }, SECRET, { expiresIn: "36000s" });
}