const CryptoJS = require('crypto-js')
require('dotenv').config()

exports.users_table = (db) => {
  db.run(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,username TEXT, password TEXT ,role TEXT DEFAULT "user")`, (error) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('users table created successfully!');
      // Call insertAdmin function here
      insertAdmin(db);
    }
  });
}

function insertAdmin(db) {
  const password = process.env.admin_password
  const hashed_admin_password = CryptoJS.SHA256(password).toString();
  db.get(`SELECT * FROM users WHERE username = 'Admin'`, (error, row) => {
    if (error) {
      console.error(error.message);
    } else if (!row) {
      db.run(`INSERT INTO users(username,password,role) VALUES( ?, ?, ?)`,["Admin",hashed_admin_password,'admin'], (error) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log('Admin user inserted successfully!');
        }
      });
    } else {
      console.log('Admin user already exists!');
    }
  });
}