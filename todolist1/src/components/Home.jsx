import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      getData();
    } catch (error) {
      alert("Unable to delete the task.");
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectAll = () => {
    if (Object.keys(checkedTasks).length === tasks.length) {
      setCheckedTasks({});
    } else {
      const allSelected = {};
      tasks.forEach((task) => {
        allSelected[task.id] = true;
      });
      setCheckedTasks(allSelected);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="page-header text-center mb-4">To Do List</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between mb-3">
            <Link to="/add-task" className="btn btn-success">
              Add New Task
            </Link>
            <button className="btn btn-info" onClick={getData}>
              Refresh
            </button>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={handleSelectAll}
                        checked={
                          Object.keys(checkedTasks).length === tasks.length &&
                          tasks.length > 0
                        }
                      />
                    </th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className={checkedTasks[task.id] ? "strikethrough" : ""}
                    >
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={!!checkedTasks[task.id]}
                          onChange={() => handleCheckboxChange(task.id)}
                        />
                      </td>
                      <td>{task.assignedTo}</td>
                      <td>{task.status}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.priority}</td>
                      <td>{task.description}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {checkedTasks[task.id] ? (
                            <button className="btn btn-primary btn-sm" disabled>
                              Edit
                            </button>
                          ) : (
                            <Link
                              className="btn btn-primary btn-sm"
                              to={`/edit-task/${task.id}`}
                            >
                              Edit
                            </Link>
                          )}
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete(task.id)}
                            disabled={!!checkedTasks[task.id]} // Disable if checked
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
