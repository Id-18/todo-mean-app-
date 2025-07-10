// backend/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // default for XAMPP
  password: '',          // default is empty
  database: 'todo_db'    // ✅ make sure this matches
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL');
  }
});

module.exports = db;
