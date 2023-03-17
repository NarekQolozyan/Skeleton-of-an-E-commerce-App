const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 5000
app.use(express.json())
const cors = require('cors')
app.use(cors())
const user_router= require("./routes/users_route")
const product_router= require("./routes/products_route")

const db = new sqlite.Database("database.db", (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log("Ok")
    }
})

user_router.userRoutes(app)
product_router.productsRoutes(app)

app.listen(port)
