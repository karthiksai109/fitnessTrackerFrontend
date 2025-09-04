import React, { useState, useEffect } from "react";
import api from "../utils/api";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [form, setForm] = useState({
    mealType: "breakfast",
    foodItems: [{ name: "", calories: 0, protein: 0, carbs: 0, fats: 0 }],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await api.get("/meals");
      setMeals(res.data);
    } catch (err) {
      console.error("Fetch meals error:", err);
    }
  };

  const handleFoodChange = (index, field, value) => {
    const updatedItems = [...form.foodItems];
    updatedItems[index][field] = value;
    setForm({ ...form, foodItems: updatedItems });
  };

  const addFoodItem = () => {
    setForm({
      ...form,
      foodItems: [
        ...form.foodItems,
        { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
      ],
    });
  };

  const resetForm = () => {
    setForm({
      mealType: "breakfast",
      foodItems: [{ name: "", calories: 0, protein: 0, carbs: 0, fats: 0 }],
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalCalories = form.foodItems.reduce(
        (sum, item) => sum + Number(item.calories || 0),
        0
      );

      if (editingId) {
        // Update existing meal
        await api.put(`/meals/${editingId}`, {
          mealType: form.mealType,
          totalCalories,
          foodItems: form.foodItems,
        });
      } else {
        // Create new meal
        await api.post("/meals", {
          mealType: form.mealType,
          totalCalories,
          foodItems: form.foodItems,
        });
      }

      fetchMeals();
      resetForm();
    } catch (err) {
      console.error("Save meal error:", err.response?.data || err.message);
      alert("Failed to save meal");
    }
  };

  const handleEdit = (meal) => {
    setEditingId(meal._id);
    setForm({
      mealType: meal.mealType,
      foodItems: meal.foodItems.length
        ? meal.foodItems
        : [{ name: "", calories: 0, protein: 0, carbs: 0, fats: 0 }],
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;
    try {
      await api.delete(`/meals/${id}`);
      fetchMeals();
    } catch (err) {
      console.error("Delete meal error:", err.response?.data || err.message);
      alert("Failed to delete meal");
    }
  };

  return (
    <div className="p-6">
      <h1 className="page-title">{editingId ? "Edit Meal" : "Meals"}</h1>
      <form onSubmit={handleSubmit} className="card mb-6 p-4">
        <select
          value={form.mealType}
          onChange={(e) => setForm({ ...form, mealType: e.target.value })}
          className="input mb-2"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>

        {form.foodItems.map((food, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2">
            <input
              type="text"
              placeholder="Food Name"
              value={food.name}
              onChange={(e) => handleFoodChange(index, "name", e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Calories"
              value={food.calories}
              onChange={(e) =>
                handleFoodChange(index, "calories", e.target.value)
              }
              className="input"
            />
            <input
              type="number"
              placeholder="Protein (g)"
              value={food.protein}
              onChange={(e) =>
                handleFoodChange(index, "protein", e.target.value)
              }
              className="input"
            />
            <input
              type="number"
              placeholder="Carbs (g)"
              value={food.carbs}
              onChange={(e) => handleFoodChange(index, "carbs", e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Fats (g)"
              value={food.fats}
              onChange={(e) => handleFoodChange(index, "fats", e.target.value)}
              className="input"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addFoodItem}
          className="btn btn-secondary mb-2"
        >
          ➕ Add Food
        </button>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update Meal" : "Save Meal"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul>
        {meals.map((m) => (
          <li key={m._id} className="card mb-2 p-2">
            <div className="flex justify-between items-center">
              <div>
                <strong>{m.mealType}</strong> — {m.totalCalories} cal
                <ul className="ml-4 text-sm">
                  {m.foodItems.map((f, i) => (
                    <li key={i}>
                      {f.name}: {f.calories} cal, {f.protein}g protein,{" "}
                      {f.carbs}g carbs, {f.fats}g fats
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(m)}
                  className="btn btn-secondary"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
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

export default Meals;
