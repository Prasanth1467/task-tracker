require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/database");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks"); // Import tasks routes

const app = express();
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // Mount tasks routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
