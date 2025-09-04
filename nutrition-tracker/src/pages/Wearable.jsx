import React, { useState, useEffect } from "react";
import api from "../utils/api";

function Wearable() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ steps: "", heartRate: "", sleepHours: "", caloriesBurned: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/wearable");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/wearable", form);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to save wearable data");
    }
  };

  return (
    <div className="p-6">
      <h1 className="page-title">Wearable Data</h1>
      <form onSubmit={handleSubmit} className="card mb-6">
        <input name="steps" placeholder="Steps" value={form.steps} onChange={(e) => setForm({ ...form, steps: e.target.value })} className="input mb-2" />
        <input name="heartRate" placeholder="Heart Rate" value={form.heartRate} onChange={(e) => setForm({ ...form, heartRate: e.target.value })} className="input mb-2" />
        <input name="sleepHours" placeholder="Sleep Hours" value={form.sleepHours} onChange={(e) => setForm({ ...form, sleepHours: e.target.value })} className="input mb-2" />
        <input name="caloriesBurned" placeholder="Calories Burned" value={form.caloriesBurned} onChange={(e) => setForm({ ...form, caloriesBurned: e.target.value })} className="input mb-2" />
        <button type="submit" className="btn btn-primary">Save Record</button>
      </form>

      <ul>
        {records.map((r) => (
          <li key={r._id} className="card mb-2">
            <p>Steps: {r.steps}</p>
            <p>Heart Rate: {r.heartRate}</p>
            <p>Sleep: {r.sleepHours} hrs</p>
            <p>Calories Burned: {r.caloriesBurned}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wearable;
