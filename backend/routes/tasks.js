const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authenticate = require("../middleware/auth");

// GET /api/tasks - Fetch all tasks for a user
router.get("/", authenticate, async (req, res) => {
  const userId = req.user.id; // Get user ID from the token

  try {
    const tasks = await new Promise((resolve, reject) => {
      Task.getAll(userId, (err, tasks) => {
        if (err) reject(err);
        else resolve(tasks);
      });
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// POST /api/tasks - Create a new task
router.post("/", authenticate, async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const userId = req.user.id; // Get user ID from the token

  try {
    await new Promise((resolve, reject) => {
      Task.create({ title, description, status, dueDate, userId }, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating task" });
  }
});

// PUT /api/tasks/:id - Update a task
router.put("/:id", authenticate, async (req, res) => {
  const taskId = req.params.id;
  const { title, description, status, dueDate } = req.body;
  const userId = req.user.id; // Get user ID from the token

  try {
    await new Promise((resolve, reject) => {
      Task.update(
        taskId,
        { title, description, status, dueDate, userId },
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating task" });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete("/:id", authenticate, async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id; // Get user ID from the token

  try {
    await new Promise((resolve, reject) => {
      Task.delete(taskId, userId, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
