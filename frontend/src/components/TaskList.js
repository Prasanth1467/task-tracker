import React from "react";

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Your Tasks</h5>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td>{task.due_date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
