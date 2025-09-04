import React, { useState, useEffect } from "react";
import api from "../utils/api";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    type: "strength",
    exercises: [
      {
        name: "",
        muscleGroup: "chest-triceps",
        sets: 0,
        reps: 0,
        weight: 0,
        duration: 0,
        caloriesBurned: 0,
      },
    ],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await api.get("/workouts");
      setWorkouts(res.data);
    } catch (err) {
      console.error("⚠️ Fetch workouts error:", err.response?.data || err.message);
    }
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...form.exercises];
    updated[index][field] = value;
    setForm({ ...form, exercises: updated });
  };

  const addExercise = () => {
    setForm({
      ...form,
      exercises: [
        ...form.exercises,
        {
          name: "",
          muscleGroup: "chest-triceps",
          sets: 0,
          reps: 0,
          weight: 0,
          duration: 0,
          caloriesBurned: 0,
        },
      ],
    });
  };

  const resetForm = () => {
    setForm({
      type: "strength",
      exercises: [
        {
          name: "",
          muscleGroup: "chest-triceps",
          sets: 0,
          reps: 0,
          weight: 0,
          duration: 0,
          caloriesBurned: 0,
        },
      ],
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/workouts/${editingId}`, form);
      } else {
        await api.post("/workouts", form);
      }
      fetchWorkouts();
      resetForm();
    } catch (err) {
      console.error("⚠️ Save workout error:", err.response?.data || err.message);
      alert("Failed to save workout");
    }
  };

  const handleEdit = (workout) => {
    setEditingId(workout._id);
    setForm({
      type: workout.type,
      exercises: workout.exercises.length
        ? workout.exercises
        : [
            {
              name: "",
              muscleGroup: "chest-triceps",
              sets: 0,
              reps: 0,
              weight: 0,
              duration: 0,
              caloriesBurned: 0,
            },
          ],
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workout?")) return;
    try {
      await api.delete(`/workouts/${id}`);
      fetchWorkouts();
    } catch (err) {
      console.error("⚠️ Delete workout error:", err.response?.data || err.message);
      alert("Failed to delete workout");
    }
  };

  return (
    <div className="p-6">
      <h1 className="page-title">{editingId ? "Edit Workout" : "Workouts"}</h1>
      <form onSubmit={handleSubmit} className="card mb-6 p-4">
        <label className="block mb-2">Workout Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="input mb-4"
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
          <option value="mixed">Mixed</option>
        </select>

        {form.exercises.map((ex, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 mb-2">
            <input
              type="text"
              placeholder="Exercise Name"
              value={ex.name}
              onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
              className="input"
            />
            <select
              value={ex.muscleGroup}
              onChange={(e) =>
                handleExerciseChange(index, "muscleGroup", e.target.value)
              }
              className="input"
            >
              <option value="chest-triceps">Chest/Triceps</option>
              <option value="back-biceps">Back/Biceps</option>
              <option value="legs">Legs</option>
              <option value="shoulders">Shoulders</option>
              <option value="core">Core</option>
              <option value="cardio">Cardio</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              placeholder="Sets"
              value={ex.sets}
              onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Reps"
              value={ex.reps}
              onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={ex.weight}
              onChange={(e) =>
                handleExerciseChange(index, "weight", e.target.value)
              }
              className="input"
            />
            <input
              type="number"
              placeholder="Calories Burned"
              value={ex.caloriesBurned}
              onChange={(e) =>
                handleExerciseChange(index, "caloriesBurned", e.target.value)
              }
              className="input"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addExercise}
          className="btn btn-secondary mb-2"
        >
          ➕ Add Exercise
        </button>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update Workout" : "Save Workout"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul>
        {workouts.map((w) => (
          <li key={w._id} className="card mb-2 p-2">
            <div className="flex justify-between items-start">
              <div>
                <strong>{w.type}</strong> — {new Date(w.date).toLocaleDateString()}
                <ul className="ml-4 text-sm mt-1">
                  {w.exercises.map((ex, i) => (
                    <li key={i}>
                      {ex.name} ({ex.muscleGroup}) — {ex.sets}x{ex.reps} @{" "}
                      {ex.weight}kg → {ex.caloriesBurned} cal
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(w)} className="btn btn-secondary">
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(w._id)}
                  className="btn btn-danger"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
