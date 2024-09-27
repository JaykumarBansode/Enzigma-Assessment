import axios from "axios"; // Importing axios for making HTTP requests
import { useEffect, useState } from "react"; // Importing React hooks
import { Link } from "react-router-dom"; // Importing Link from React Router for navigation

function Home() {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks

  // Function to fetch tasks from the server
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks"); // GET request to fetch tasks
      // console.log(response.data); // Log the fetched task data
      setTasks(response.data); // Update the state with the fetched tasks
    } catch (error) {
      console.log(error); // Log any errors encountered during the fetch
    }
  };

  // useEffect to fetch tasks when the component mounts
  useEffect(() => {
    getData(); // Fetch tasks on component mount
  }, []); // Empty dependency array ensures this runs only once

  // Function to delete a task by ID
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/tasks/${id}`); // DELETE request to remove the task
      // console.log(response.data); // Log the response from deletion
      getData(); // Refresh the task list after deletion
    } catch (error) {
      // console.log(error); // Log any errors encountered during deletion
      alert("Unable to delete the task."); // Alert user if deletion fails
    }
  };

  return (
    <>
      <div className="container mt-5">
        {" "}
        {/* Bootstrap container for layout */}
        <h2 className="page-header text-center mb-4">To Do List</h2>{" "}
        {/* Header for the page */}
        <div className="row justify-content-center">
          {" "}
          {/* Center the row */}
          <div className="col-lg-8">
            {" "}
            {/* Define the width of the column */}
            <div className="d-flex justify-content-between mb-3">
              {" "}
              {/* Flexbox for button alignment */}
              <Link to="/add-task" className="btn btn-success">
                {" "}
                {/* Link to add a new task */}
                Add New Task
              </Link>
              <button className="btn btn-info" onClick={getData}>
                {" "}
                {/* Button to refresh task list */}
                Refresh
              </button>
            </div>
            <div className="card shadow-sm">
              {" "}
              {/* Bootstrap card for better styling */}
              <div className="card-body">
                {" "}
                {/* Body of the card containing the table */}
                <table className="table table-bordered table-striped">
                  {" "}
                  {/* Bootstrap table */}
                  <thead className="thead-dark">
                    {" "}
                    {/* Table header with dark background */}
                    <tr>
                      <th>Assigned To</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Priority</th>
                      <th>Description</th>
                      <th>Actions</th> {/* Column for action buttons */}
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(
                      (
                        task,
                        index // Map through tasks to create table rows
                      ) => (
                        <tr key={index}>
                          {" "}
                          {/* Use index as key for rows */}
                          <td>{task.assignedTo}</td>{" "}
                          {/* Display assigned person */}
                          <td>{task.status}</td> {/* Display task status */}
                          <td>{task.dueDate}</td> {/* Display due date */}
                          <td>{task.priority}</td> {/* Display task priority */}
                          <td>{task.description}</td>{" "}
                          {/* Display task description */}
                          <td>
                            {" "}
                            {/* Column for action buttons */}
                            <div className="d-flex gap-2">
                              {" "}
                              {/* Flexbox for button alignment */}
                              <Link
                                className="btn btn-primary btn-sm" // Link to edit the task
                                to={"/edit-task/" + task.id} // Dynamic link based on task ID
                              >
                                Edit
                              </Link>
                              <button
                                className="btn btn-danger btn-sm" // Button to delete the task
                                onClick={() => onDelete(task.id)} // Call onDelete with task ID
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home; // Exporting the component for use in other parts of the application
