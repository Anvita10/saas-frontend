 TaskFlow Frontend

TaskFlow is a SaaS-based workspace and task management application that helps users collaborate, manage teams, and organize work efficiently.

This repository contains the frontend of the application, built using React and Material UI, with a focus on clean UI and structured component architecture.

📌 Features Implemented

🔐 User Authentication (Login / Signup UI + flow)
🏢 Workspace Creation & Management
👥 Member Section (view & manage workspace members)
⚠️ Danger Zone (workspace deletion UI)
🧭 Protected Routing (restricted access based on auth)
📄 Workspace Details Page
🔄 API Integration using custom hooks
🎨 Clean and structured UI using Material UI
📱 Basic responsive layout

🛠️ Tech Stack

React.js
Material UI (MUI)
React Router
Custom Hooks for API handling
Context API (for global state, if used)

⚙️ Setup Instructions

1️⃣ Clone the repository
2️⃣ Install dependencies

REACT_APP_API_BASE_URL=https://saas-backend-wn5b.onrender.com

 Start the application

🔗 Backend Connection

This frontend connects to the TaskFlow backend APIs.

Make sure:

Backend server is running
Correct API base URL is set in apiClient hook.

🔒 Authentication & Routing

Protected routes restrict access to authenticated users
Workspace data is only accessible after login
Navigation handled using React Router

👤 Author

Anvita Jain
