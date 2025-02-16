const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/database.sqlite");

const User = {
  findByEmail: (email, callback) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      callback(err, row);
    });
  },

  create: (user, callback) => {
    const { name, email, password } = user;
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: this.lastID, ...user });
        }
      }
    );
  },
};

module.exports = User;
