const sqlite = require('sqlite3')

const db = new sqlite.Database("database.db", (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log("Ok")
    }
})

exports.get_product=(req,res) => {
    db.all("SELECT * FROM products", [], (err,data)=>{
            res.send(data)
    })
}

exports.get_id=(req,res)=>{
    const id = req.params.id

    db.all("SELECT * FROM products WHERE id=?",[id],(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
}

exports.create_product =(req, res) => {
  const name = req.body.name;
  const price = req.body.price;

       db.run(
        'INSERT INTO products(name, price) VALUES (?, ?)',
        [name, price],
        (err) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error inserting product');
          } else {
            res.send('Product inserted successfully');
          }
        }
      );
    }

exports.update_product = (req, res) => {
    const update_id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
  
    db.run(
      "UPDATE products SET name=?, price=? WHERE id=?",
      [name, price, update_id],
      (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send('User updated successfully!');
        }
      }
    );
  };
  
exports.delete_product=(req,res) =>{

    const product_id = req.params.id

    db.run("DELETE FROM products WHERE id=?",[product_id],(err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("Secsessfuly deleted")
        }
    })
}
