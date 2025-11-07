import { useEffect, useState } from 'react';
import { createTask } from './api';
import { getTasks } from './api';
import axios from 'axios';
import axiosInstance from './axiosInstance';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // cont [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTasks = async () => {
    try {
        const response = await axiosInstance.get("plan/");

      console.log("API response:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks(); // Call the async function
}, []);

//Handle Add Task
const handleAddTask = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  try{
        const response = await axiosInstance.post(
        "plan/",
        {
          title,
          description},
      );

      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      console.log("Task added:", response.data);
  }
  catch (error){
    console.error("Error adding task:", error);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  try{
    await axiosInstance.delete(`plan/${id}/`);

    //Remove the deleted task from UI
    setTasks(tasks.filter((task) => task.id !== id));
    console.log(`Task ${id} deleted successfully`)
} 
catch (error){
console.error("Error deleting task:", error);
}
};

const handleToggleComplete = async (task) => {
  try{
    const response = await axios.patch(
      `http://127.0.0.1:8000/api/plan/${task.id}/`,
      { completed: !task.completed },
    );
  
    //Update state without referencing all tasks
    setTasks(tasks.map(t => t.id === task.id ? response.data : t));
  }
  catch (error) {
    console.error("Error updating task:", error);
    }
  
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Tasks</h1>

      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", width: "100%" }}>
          Add Task
        </button>
         </form>

        {tasks.length === 0 ? (
        <p>No tasks found.</p>
        ) : (
          <ul>
           {tasks.map((task) => (

              <li key={task.id}>
              <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </strong>{ " " } - {task.description}

              <button
              onClick = {() => handleToggleComplete(task)}
              style = {{ 
                  marginLeft: "10px",
                  background: task.completed ? "gray" : "green",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
               }}
              >
                {task.completed ? "Undo" : "Mark Complete"}
              </button>

               <button
                onClick={()=> handleDelete(task.id)}
                style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  >Delete
                  </button>
                   </li>

          ))}

        </ul>
      )}
    </div>
  );
}

export default App
