import React from "react";
import { BrowserRouter, Routes, Route, StaticRouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import Signup from "./Signup";
import TaskPage from "./TaskPage";

function App() {
  return (
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plan" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>



  );
}

export default App;
