const sqlite = require('sqlite3')
const bcrypt = require('bcrypt')
const authToken = require('../jwt/jwt_generate')
const db = new sqlite.Database("database.db", (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log("Ok")
    }
})

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

exports.create_user = async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error hashing password');
    } else {
      db.run(
        'INSERT INTO users(username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error inserting user');
          } else {
            res.send('User registered successfully');
          }
        }
      );
    }
  });
};


exports.login_user = async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;

      db.get("SELECT * FROM users WHERE username = ?", [username], function (err, row) {
      if (err) {
        return res.sendStatus(500);
      }
      bcrypt.compare(password,(err,data)=>{
        console.log(data)
        if(!data){
         return res.sendStatus(401)
        }
        let token = authToken.generateAccessToken(username);
        res.send({ status: "Logged in", token: token });
      })
    }
  )

      
//   console.log(username,password)
//   await (password, 10, (err, hashedPassword) => {
//     if (err) {
//       return res.status(500).send({ status: "Error hashing password" });
//     }
//     console.log(hashedPassword)
    
//     db.get("SELECT * FROM users WHERE username = ?", [username], function (err, row) {
//       if (err) {
//         return res.sendStatus(500);
//       }
//       console.log(row,hashedPassword)
// console.log(row.password)
//       if (row && hashedPassword == row.password) {
        
//         let token = authToken.generateAccessToken(username);
//         res.send({ status: "Logged in", token: token });
//       } else {
//         res.send({ status: "Wrong credentials" });
//       }
//     });
//   });

};



exports.update_user = (req, res) => {
    const update_id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
  
    db.run(
      "UPDATE users SET username=?, password=? WHERE id=?",
      [username, password, update_id],
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
