import axios from "axios"; // Importing axios for making HTTP requests
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate for routing

function AddTask() {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(e.target); // Create FormData object from the form
    const task = Object.fromEntries(formData.entries()); // Convert FormData to an object

    // Validate form inputs
    if (
      !task.assignedTo ||
      !task.status ||
      !task.dueDate ||
      !task.priority ||
      !task.description
    ) {
      alert("please fill all the fields"); // Alert if any fields are empty
      return; // Exit the function early
    }
    try {
      // Send a POST request to add the new task
      const response = await axios.post("http://localhost:4000/tasks", task);
      console.log(response.data); // Log the response data
      navigate("/home"); // Navigate back to the home page upon successful submission
    } catch (error) {
      alert("unable to connect to server"); // Alert if there's an error with the request
    }
  };

  return (
    <>
      <div className="container mt-5">
        {" "}
        {/* Bootstrap container for layout */}
        <div className="row justify-content-center">
          {" "}
          {/* Center the row */}
          <div className="col-lg-8">
            {" "}
            {/* Define the width of the column */}
            <div className="card shadow-lg">
              {" "}
              {/* Bootstrap card for better styling */}
              <div className="card-header text-center bg-primary text-white">
                {" "}
                {/* Header with styling */}
                <h2 className="mb-0">Add Task</h2> {/* Title of the form */}
              </div>
              <div className="card-body">
                {" "}
                {/* Body of the card containing the form */}
                <form onSubmit={handleSubmit}>
                  {" "}
                  {/* Form with submit handler */}
                  <div className="mb-3">
                    {" "}
                    {/* Spacing for form elements */}
                    <label htmlFor="assignedTo" className="form-label">
                      {" "}
                      {/* Label for assignedTo */}
                      Assigned To
                    </label>
                    <select className="form-select" name="assignedTo">
                      {" "}
                      {/* Dropdown for selecting user */}
                      <option value="">Select Person</option>
                      <option value="User 1">User 1</option>
                      <option value="User 2">User 2</option>
                      <option value="User 3">User 3</option>
                      <option value="User 3">User 4</option>
                      <option value="User 3">User 5</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    {" "}
                    {/* Spacing for form elements */}
                    <label htmlFor="status" className="form-label">
                      {" "}
                      {/* Label for status */}
                      Status
                    </label>
                    <select className="form-select" name="status">
                      {" "}
                      {/* Dropdown for selecting task status */}
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    {" "}
                    {/* Spacing for form elements */}
                    <label htmlFor="dueDate" className="form-label">
                      {" "}
                      {/* Label for due date */}
                      Due Date
                    </label>
                    <input
                      type="date" // Input for selecting a date
                      className="form-control"
                      name="dueDate"
                    />
                  </div>
                  <div className="mb-3">
                    {" "}
                    {/* Spacing for form elements */}
                    <label htmlFor="priority" className="form-label">
                      {" "}
                      {/* Label for priority */}
                      Priority
                    </label>
                    <select className="form-select" name="priority">
                      {" "}
                      {/* Dropdown for selecting priority */}
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    {" "}
                    {/* Spacing for form elements */}
                    <label htmlFor="description" className="form-label">
                      {" "}
                      {/* Label for description */}
                      Description
                    </label>
                    <textarea
                      className="form-control" // Text area for task description
                      name="description"
                      rows="4" // Sets the height of the text area
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    {" "}
                    {/* Flexbox for button alignment */}
                    <button className="btn btn-primary" type="submit">
                      {" "}
                      {/* Submit button */}
                      Add Task
                    </button>
                    <Link to="/home" className="btn btn-warning">
                      {" "}
                      {/* Cancel button linking back to home */}
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTask; // Exporting the component for use in other parts of the application
