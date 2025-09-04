import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activityLevel: "moderate",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="input border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input border p-2 rounded" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="input border p-2 rounded" required />
          <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} className="input border p-2 rounded" required />
          <select name="gender" value={form.gender} onChange={handleChange} className="input border p-2 rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="number" name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} className="input border p-2 rounded" required />
          <input type="number" name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} className="input border p-2 rounded" required />
          <select name="activityLevel" value={form.activityLevel} onChange={handleChange} className="input border p-2 rounded">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
          <button type="submit" className="btn btn-primary bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
