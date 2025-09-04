import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Meals from "./pages/Meals";
import Workouts from "./pages/Workouts";
import Goals from "./pages/Goals";
import Wearable from "./pages/Wearable";
import Recommendations from "./pages/Recommendations";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/wearable" element={<Wearable />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
