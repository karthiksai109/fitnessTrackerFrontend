import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-600 p-4 text-white shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">Health Tracker</h1>
        <div className="flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/meals">Meals</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/wearable">Wearable</Link>
          <Link to="/recommendations">AI Advice</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
