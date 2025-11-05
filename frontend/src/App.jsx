import { useEffect, useState } from 'react';
import { getTasks } from './api';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  // cont [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      // Paste your valid access token here temporarily
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYyMzc4ODY4LCJpYXQiOjE3NjIzNzg1NjksImp0aSI6IjVmNGUyY2Y0OGZiNzQzOGZhODgwZjcyNjlkZTU3Y2JiIiwidXNlcl9pZCI6IjEifQ.i_uQHGH-vUoLN1C8AB4olZMh8lfz9jRIGesCgASwXbk";

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

  return (
 <div style={{ padding: "20px" }}>
      <h1>My Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
