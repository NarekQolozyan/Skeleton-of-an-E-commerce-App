const CryptoJS = require('crypto-js')
const sqlite = require('sqlite3').verbose()
const generate = require('../middlewares/jwt_authenticate')

const db = new sqlite.Database("database.db")
exports.get_user=(req,res) => {
    db.all("SELECT * FROM users", [], (err,data)=>{
        res.send(data)
    })
}


exports.get_id=(req,res)=>{
    const id = req.params.id   
    db.all("SELECT * FROM users WHERE id=?",[id],(err,data)=>{
            if(err){
                console.log(err)
            }
            else{
                res.send(data)
            }
        })
}
    
exports.create_user = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    
    let sql = "INSERT INTO users (username,password,role) VALUES (?, ?, ?)"
    db.run(sql, [username,hashed_password,"user"], (err) => {
        if(err || username === "Admin"){
            res.send(JSON.stringify({status: "Error Reigstering"}))
        }
        res.send(JSON.stringify({status: "User Created"}))
    }) 
}



exports.login_user = (req, res) => {
    const {username, password}  = req.body;
    const hashed_password = CryptoJS.SHA256(password).toString();

    db.get('SELECT * FROM users WHERE username=?',[username],(err,row)=>{
        if(username === row.username && hashed_password === row.password){
        const token = generate.generateAccessToken(username,row.role);
            res.send({status:'Logged in', jwt: token});
       }else{
           res.send({status:'Wrong credentials'});
       }
    })
    }
      
exports.update_user = (req, res) => {
    const update_id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
      
        db.run(
          "UPDATE users SET username=?, password=?, role=? WHERE id=?",
          [username, password, role, update_id],
          (err) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.send('User updated successfully!');
            }
          }
        );
      };
      
exports.delete_user=(req,res) =>{
    const users_id = req.params.id
    
        db.run("DELETE FROM users WHERE id=?",[users_id],(err)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send("Secsessfuly deleted")
            }
        })
    }