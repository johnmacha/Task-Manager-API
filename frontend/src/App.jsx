import { useEffect, useState } from 'react';
import { createTask } from './api';
import { getTasks } from './api';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

// Paste your valid access token here temporarily
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyNDYwNTEzLCJpYXQiOjE3NjI0NjAyMTMsImp0aSI6IjJlZmE3ZDRlYTQzMTQxNDlhYzkyNDdiNGYyMjMwOWVlIiwidXNlcl9pZCI6IjEifQ.6rhnue3NBZabtCI7JE_Cq6so2-bNsenZbXByYxe7iOY";

  // cont [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTasks = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/plan/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        const response = await axios.post(
        "http://127.0.0.1:8000/api/plan/",
        {
          title,
          description},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
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
  if (!window.confirm("Areyou sure you want to delete this task?")) return;

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyNDYwNTEzLCJpYXQiOjE3NjI0NjAyMTMsImp0aSI6IjJlZmE3ZDRlYTQzMTQxNDlhYzkyNDdiNGYyMjMwOWVlIiwidXNlcl9pZCI6IjEifQ.6rhnue3NBZabtCI7JE_Cq6so2-bNsenZbXByYxe7iOY";
  try{
    await axios.delete(`http://127.0.0.1:8000/api/plan/${id}/`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //Remove the deleted task from UI
    setTasks(tasks.filter((task) => task.id !== id));
    console.log(`Task ${id} deleted successfully`)
} 
catch (error){
console.error("Error deleting task:", error);
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
        <button type="submit" style={{ passing: "10px", width: "100%" }}>
          Add Task
        </button>
         </form>

        {tasks.length === 0 ? (
        <p>No tasks found.</p>
        ) : (
          <ul>
           {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description}
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
