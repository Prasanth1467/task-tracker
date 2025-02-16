const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await new Promise((resolve, reject) => {
      User.findByEmail(email, (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

module.exports = router;
