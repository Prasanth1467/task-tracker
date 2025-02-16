import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login"); // Redirect to login if token is invalid
      }
    };

    fetchTasks();
  }, [navigate]);

  // Handle task creation or update
  const handleTaskSubmit = async (task) => {
    const token = localStorage.getItem("token");
    try {
      if (editingTask && editingTask.id) {
        // Update task
        await axios.put(
          `http://localhost:5000/api/tasks/${editingTask.id}`,
          { ...task, userId: editingTask.userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create task
        await axios.post("http://localhost:5000/api/tasks", task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Refresh tasks
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
      setEditingTask(null); // Reset editing task
    } catch (err) {
      console.error(err);
    }
  };

  // Handle task deletion
  const handleTaskDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh tasks
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle task status update
  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh tasks
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Dashboard</h1>
        <button
          className="btn btn-primary mb-3"
          onClick={() => setEditingTask({})}
        >
          Add Task
        </button>
        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onCancel={() => setEditingTask(null)}
          />
        )}
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleTaskDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
