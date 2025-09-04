# 🏋️‍♂️ Fitness Tracker Frontend

This is the **frontend** of the Fitness Tracker application — a health and fitness tracking web app built with **React (Vite)**.  
It allows users to register, log in, and manage their health profile (meals, workouts, goals, wearable integration, etc.).  

👉 **Live Demo:** [Fitness Tracker Frontend](https://fitness-tracker-frontend-pu15.vercel.app/)

---

## ✨ Features

- 🔐 **User Authentication** (Register / Login / JWT-based sessions)  
- 🧑‍💻 **Profile Management** (age, gender, height, weight, activity level, etc.)  
- 🍎 **Nutrition & Meals Tracking**  
- 🏃 **Workout & Goals Tracking**  
- ⌚ **Wearable Integration Ready**  
- 📊 **Responsive Dashboard UI**  
- 🌐 **Connected to Backend API (Node.js + MongoDB on Render)**  

---

## 🛠 Tech Stack

- **Frontend Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)  
- **UI Styling:** CSS / Tailwind (if used)  
- **State Management:** React Hooks / Context API (as implemented)  
- **API Calls:** [Axios](https://axios-http.com/)  
- **Deployment:** [Vercel](https://vercel.com/)  
- **Backend:** Node.js + Express + MongoDB (deployed on Render)  

---

## 🚀 Getting Started (Local Development)

1. **Clone the repo**
   ```bash
   git clone https://github.com/karthiksai109/fitnessTrackerFrontend.git
   cd fitnessTrackerFrontend/nutrition-tracker

2.Install dependencies

npm install


Set up environment variables
Create a .env file inside nutrition-tracker/:

VITE_API_URL=https://fitnesstrackerbackend-zzuz.onrender.com/api






npm run dev


App will be running on:
👉 http://localhost:5173

🌍 Deployment

This project is deployed on Vercel.
Each push to the main branch triggers an automatic redeployment.

🔗 Live URL: https://fitness-tracker-frontend-pu15.vercel.app/

📡 API Connection

The frontend communicates with the backend hosted on Render.

Example API calls:

POST /api/auth/register → User Registration

POST /api/auth/login → User Login

GET /api/userdata → Fetch User Data

Base URL is configured using the environment variable:

VITE_API_URL=https://fitnesstrackerbackend-zzuz.onrender.com/api

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a PR.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by Karthik Ramadugu
