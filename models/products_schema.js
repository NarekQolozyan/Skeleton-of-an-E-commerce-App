exports.products_table=(db)=>{
  db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT, price TEXT)')
}
