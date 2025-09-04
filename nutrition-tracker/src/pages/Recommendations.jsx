import React, { useState } from "react";
import api from "../utils/api";

function Recommendations() {
  const [meal, setMeal] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!meal) {
      alert("Please select a meal");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/recommendation", { meal });
      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error("⚠️ AI generation error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await api.post("/recommendations", { meal, recommendation });
      alert("Recommendation saved!");
    } catch (err) {
      console.error("⚠️ Save error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
      <select
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="">Select a meal</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>

      <textarea
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
        placeholder="Recommendation will appear here..."
        className="border p-2 w-full mb-4"
        rows="4"
      />

      <div className="flex gap-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Recommendation"}
        </button>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Recommendation
        </button>
      </div>
    </div>
  );
}

export default Recommendations;
