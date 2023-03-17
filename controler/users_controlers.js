exports.getUsers=(req,res) => {
        db.all("SELECT * FROM users", [], (err,data)=>{
                res.send(data)
        })
    }
