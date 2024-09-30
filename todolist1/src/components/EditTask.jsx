import axios from "axios"; // Importing axios for making HTTP requests
import { useEffect, useState } from "react"; // Importing React hooks
import { Link, useNavigate, useParams } from "react-router-dom"; // Importing Link and navigation hooks from React Router

function EditTask() {
  const params = useParams(); // Extracting the task ID from the URL parameters
  const [initialData, setInitialData] = useState({
    // State to hold the initial task data
    assignedTo: "",
    status: "",
    dueDate: "",
    priority: "",
    description: "",
  });

  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Function to fetch task data based on the ID from the URL
  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/tasks/${params.id}`
      ); // GET request to fetch task data
      // console.log(response.data); // Log the fetched task data
      setInitialData(response.data); // Set the state with the fetched data
    } catch (error) {
      console.log(error); // Log any errors encountered during the fetch
    }
  };

  useEffect(() => {
    getTasks(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  // Function to format date for the input field
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return empty if date is invalid or missing
    const date = new Date(dateString); // Create a new date object
    return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD for input
  };

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
      // Send a PATCH request to update the task
      const response = await axios.patch(
        `http://localhost:4000/tasks/${params.id}`,
        task
      );
      // console.log(response.data); // Log the response data
      navigate("/home"); // Navigate back to the home page upon successful update
    } catch (error) {
      alert("unable to update the task"); // Alert if there's an error with the request
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
                <h2 className="mb-0">Edit Task</h2> {/* Title of the form */}
              </div>
              <div className="card-body">
                {" "}
                {/* Body of the card containing the form */}
                {initialData && ( // Ensure initialData is set before rendering the form
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
                      <select
                        className="form-select"
                        name="assignedTo"
                        value={initialData.assignedTo} // Set the selected value from state
                        onChange={(
                          e // Update state on change
                        ) =>
                          setInitialData({
                            ...initialData,
                            assignedTo: e.target.value,
                          })
                        }
                      >
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
                      <select
                        className="form-select"
                        name="status"
                        value={initialData.status} // Set the selected value from state
                        onChange={(
                          e // Update state on change
                        ) =>
                          setInitialData({
                            ...initialData,
                            status: e.target.value,
                          })
                        }
                      >
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
                        value={formatDate(initialData.dueDate)} // Format date for input
                        onChange={(
                          e // Update state on change
                        ) =>
                          setInitialData({
                            ...initialData,
                            dueDate: e.target.value,
                          })
                        }
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
                      <select
                        className="form-select"
                        name="priority"
                        value={initialData.priority} // Set the selected value from state
                        onChange={(
                          e // Update state on change
                        ) =>
                          setInitialData({
                            ...initialData,
                            priority: e.target.value,
                          })
                        }
                      >
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
                        className="form-control"
                        name="description"
                        rows="4" // Sets the height of the text area
                        value={initialData.description} // Set the value from state
                        onChange={(
                          e // Update state on change
                        ) =>
                          setInitialData({
                            ...initialData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      {" "}
                      {/* Flexbox for button alignment */}
                      <button className="btn btn-primary" type="submit">
                        {" "}
                        {/* Submit button */}
                        Update Task
                      </button>
                      <Link to="/home" className="btn btn-warning">
                        {" "}
                        {/* Cancel button linking back to home */}
                        Cancel
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTask; // Exporting the component for use in other parts of the application
