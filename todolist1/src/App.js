import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
