const db = require("../db/database");

class Task {
  static getAll(userId, callback) {
    const sql = `SELECT * FROM tasks WHERE user_id = ?`;
    db.all(sql, [userId], callback);
  }

  static create(task, callback) {
    const sql = `INSERT INTO tasks (title, description, status, due_date, user_id) VALUES (?, ?, ?, ?, ?)`;
    db.run(
      sql,
      [task.title, task.description, task.status, task.dueDate, task.userId],
      callback
    );
  }

  static update(id, task, callback) {
    const sql = `UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ? AND user_id = ?`;
    db.run(
      sql,
      [
        task.title,
        task.description,
        task.status,
        task.dueDate,
        id,
        task.userId,
      ],
      callback
    );
  }

  static delete(id, userId, callback) {
    const sql = `DELETE FROM tasks WHERE id = ? AND user_id = ?`;
    db.run(sql, [id, userId], callback);
  }
}

module.exports = Task;
