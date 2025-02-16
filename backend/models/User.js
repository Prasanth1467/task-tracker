const db = require("../db/database");
const bcrypt = require("bcryptjs");

class User {
  static create(name, email, password, callback) {
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, hashedPassword], callback);
  }

  static findByEmail(email, callback) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], callback);
  }
}

module.exports = User;
