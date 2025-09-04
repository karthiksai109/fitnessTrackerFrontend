import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchRecommendations();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("⚠️ User fetch error:", err.response?.data || err.message);
      navigate("/login"); // redirect if token invalid
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await api.get("/recommendations");
      setRecommendations(res.data);
    } catch (err) {
      console.error("⚠️ Recommendations fetch error:", err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // only update allowed fields
      const { name, age, gender, height, weight } = user;
      const res = await api.put("/auth/me", { name, age, gender, height, weight });
      setUser(res.data);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* User Info */}
      <div className="card p-4">
        <h1 className="text-2xl font-bold mb-4">👤 User Dashboard</h1>
        {user ? (
          <div className="space-y-1">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Height:</strong> {user.height} cm</p>
            <p><strong>Weight:</strong> {user.weight} kg</p>
            <p><strong>Activity Status:</strong> {user.activityStatus}</p> {/* ✅ Auto-tracked */}
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-4"
        >
          🚪 Logout
        </button>
      </div>

      {/* Update Profile */}
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-3">✏️ Update Profile</h2>
        {user && (
          <form onSubmit={handleUpdate} className="grid gap-3">
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="input border p-2 rounded"
              required
            />
            <input
              type="number"
              value={user.age}
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              className="input border p-2 rounded"
              required
            />
            <select
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              className="input border p-2 rounded"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              value={user.height}
              onChange={(e) => setUser({ ...user, height: e.target.value })}
              className="input border p-2 rounded"
              required
            />
            <input
              type="number"
              value={user.weight}
              onChange={(e) => setUser({ ...user, weight: e.target.value })}
              className="input border p-2 rounded"
              required
            />
            {/* ❌ No manual activity status editing */}
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>

      {/* AI Suggestions */}
      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-3">🤖 AI Health Suggestions</h2>
        {recommendations.length > 0 ? (
          <ul className="list-disc ml-6">
            {recommendations.map((r, i) => (
              <li key={i} className="mb-1">
    <strong>{r.meal.toUpperCase()}:</strong> {r.recommendation}
    <span className="text-gray-500 text-sm ml-2">
      ({new Date(r.generatedAt).toLocaleDateString()})
    </span>
  </li>
            ))}
          </ul>
        ) : (
          <p>No suggestions yet. Try logging meals/workouts!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
