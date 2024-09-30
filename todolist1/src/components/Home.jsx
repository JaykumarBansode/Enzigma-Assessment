import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [searchPriority, setSearchPriority] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Number of tasks per page

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
    if (Object.keys(checkedTasks).length === filteredTasks.length) {
      setCheckedTasks({});
    } else {
      const allSelected = {};
      filteredTasks.forEach((task) => {
        allSelected[task.id] = true;
      });
      setCheckedTasks(allSelected);
    }
  };

  // Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.priority.toLowerCase().includes(searchPriority.toLowerCase())
  );

  // Calculate current tasks for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Pagination buttons
  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`btn btn-sm ${
            i === currentPage ? "btn-primary" : "btn-secondary"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
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

          {/* Search Input */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search by priority"
              className="form-control"
              value={searchPriority}
              onChange={(e) => setSearchPriority(e.target.value)}
            />
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
                          Object.keys(checkedTasks).length ===
                            currentTasks.length && currentTasks.length > 0
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
                  {currentTasks.map((task) => (
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

              {/* Pagination Controls */}
              <div className="pagination mt-3">{renderPagination()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
