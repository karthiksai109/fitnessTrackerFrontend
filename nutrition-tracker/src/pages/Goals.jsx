import React, { useState, useEffect } from "react";
import api from "../utils/api";

function Goals() {
  const [goal, setGoal] = useState({});
  const [form, setForm] = useState({ targetWeight: "", dailyCalories: "", activityTarget: "" });

  useEffect(() => {
    fetchGoal();
  }, []);

  const fetchGoal = async () => {
    try {
      const res = await api.get("/goals");
      setGoal(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/goals", form);
      fetchGoal();
    } catch (err) {
      console.error(err);
      alert("Failed to save goal");
    }
  };

  return (
    <div className="p-6">
      <h1 className="page-title">Goals</h1>
      <form onSubmit={handleSubmit} className="card mb-6">
        <input placeholder="Target Weight" value={form.targetWeight} onChange={(e) => setForm({ ...form, targetWeight: e.target.value })} className="input mb-2" />
        <input placeholder="Daily Calories" value={form.dailyCalories} onChange={(e) => setForm({ ...form, dailyCalories: e.target.value })} className="input mb-2" />
        <input placeholder="Activity Target" value={form.activityTarget} onChange={(e) => setForm({ ...form, activityTarget: e.target.value })} className="input mb-2" />
        <button type="submit" className="btn btn-primary">Save Goal</button>
      </form>

      {goal && goal.dailyCalories && (
        <div className="card">
          <p>Target Weight: {goal.targetWeight}</p>
          <p>Daily Calories: {goal.dailyCalories}</p>
          <p>Activity Target: {goal.activityTarget}</p>
        </div>
      )}
    </div>
  );
}

export default Goals;
