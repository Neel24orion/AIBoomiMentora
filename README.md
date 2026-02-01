# 🚀 The Mentora AI - Personalized AI Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

> Mentora AI is a hands-on learning platform that helps users master AI tools by actually using them. It provides real-time guidance, task-based learning, and personalized feedback, turning AI learning into an interactive, gamified experience.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**AI Mentora** is a comprehensive learning platform that offers structured courses on popular AI tools including:

- 💬 **ChatGPT Mastery** - Master prompt engineering and AI workflows
- 🎨 **Canva AI** - Design with AI-powered tools
- 📝 **Notion AI** - Boost productivity with AI assistance
- 💻 **Cursor AI** - AI-powered code editor mastery
- ✍️ **Jasper AI** - Content creation with AI
- 🖼️ **Midjourney** - AI art generation mastery

The platform features a gamified learning experience with XP points, streak tracking, and interactive task completion with AI evaluation.

---

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based secure authentication
- User registration and login
- Password hashing with bcrypt
- Protected routes and API endpoints
- Session management

### 📚 Learning System
- **Multi-track curriculum** - 6+ AI tool courses
- **Lesson-based structure** - 3 tasks per lesson
- **Dynamic task generation** - AI-powered task creation
- **Progress tracking** - Real-time completion percentages
- **Self-healing progress system** - Automatically fixes data inconsistencies

### 🎮 Gamification
- **XP System** - Earn experience points for completing tasks
- **Streak Tracking** - Daily learning streak counter
- **Progress Visualization** - Interactive progress bars and charts
- **Achievement Milestones** - Track your learning journey
- **Leaderboard Ready** - Competitive learning features

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Glassmorphism Effects** - Modern, premium design aesthetic
- **Smooth Animations** - Engaging micro-interactions
- **Interactive Timeline** - Rocket-powered learning journey visualization
- **Dark Mode Ready** - Eye-friendly interface

### 📊 Dashboard & Analytics
- Comprehensive user statistics
- Daily activity tracking
- Course progress overview
- Recent activity feed
- Performance metrics

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: CSS Modules with modern CSS features
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Next.js App Router
- **HTTP Client**: Axios
- **Authentication**: JWT tokens with localStorage

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB (Motor - async driver)
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt (passlib)
- **Validation**: Pydantic models
- **CORS**: FastAPI CORS middleware
- **Logging**: Python logging module

### Database Schema
```javascript
// Users Collection
{
  _id: ObjectId,
  username: String,
  email: String,
  password_hash: String,
  display_name: String,
  avatar_icon: String,
  created_at: DateTime,
  last_login: DateTime,
  stats: {
    streak_days: Number,
    total_xp: Number,
    total_hours: Number,
    last_activity_date: DateTime
  }
}

// Track Progress Collection
{
  _id: ObjectId,
  user_id: ObjectId,
  track_slug: String,
  track_name: String,
  current_lesson_index: Number,
  current_task_index: Number,
  percent_complete: Number,
  lessons_completed: Number,
  tasks_completed: Number,
  is_enrolled: Boolean,
  started_at: DateTime,
  last_accessed: DateTime
}

// Task Completions Collection
{
  _id: ObjectId,
  user_id: ObjectId,
  track_slug: String,
  task_id: String,
  lesson_index: Number,
  task_index: Number,
  prompt: String,
  user_output: String,
  ai_evaluation: String,
  completed_at: DateTime,
  score: Number,
  xp_earned: Number,
  time_spent_minutes: Number
}
```

---

## 📁 Project Structure

```
AIBoomiMentora/
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── Dashboard/   # User dashboard
│   │   │   ├── home/        # Home page
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   ├── Profile/     # User profile
│   │   │   ├── track/       # Track detail pages
│   │   │   ├── task/        # Task completion pages
│   │   │   ├── questionnaire/ # Onboarding questionnaire
│   │   │   └── evaluation/  # Task evaluation
│   │   ├── components/      # Reusable React components
│   │   │   ├── Sidebar.js
│   │   │   └── Footer.js
│   │   ├── utils/           # Utility functions
│   │   │   └── api.js       # API client
│   │   └── hooks/           # Custom React hooks
│   │       └── useAuth.js   # Authentication hook
│   ├── public/              # Static assets
│   ├── package.json
│   └── next.config.js
│
├── backend/                 # FastAPI Backend Application
│   ├── main.py             # Application entry point
│   ├── database.py         # MongoDB connection
│   ├── auth.py             # Authentication utilities
│   ├── dependencies.py     # FastAPI dependencies
│   ├── models.py           # Pydantic models
│   ├── routers/            # API route handlers
│   │   ├── auth_router.py  # Authentication endpoints
│   │   ├── users_router.py # User management endpoints
│   │   └── tracks_router.py # Track & task endpoints
│   ├── curriculum/         # Course curriculum JSON files
│   │   ├── chatgpt.json
│   │   ├── canva.json
│   │   ├── notion.json
│   │   ├── cursor.json
│   │   ├── jasper.json
│   │   └── midjourney.json
│   ├── requirements.txt    # Python dependencies
│   └── debug_tracks.log    # Debug logging
│
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.12+
- **MongoDB** 6.0+ (local or Atlas)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/AIBoomiMentora.git
cd AIBoomiMentora
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (optional)
# Add your MongoDB connection string
echo "MONGODB_URL=mongodb://localhost:27017" > .env
echo "SECRET_KEY=your-secret-key-here" >> .env
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
# or
yarn install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### Running the Application

#### Start Backend Server
```bash
cd backend
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "display_name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "display_name": "John Doe",
    "avatar_icon": "👨‍🚀",
    "stats": {
      "streak_days": 0,
      "total_xp": 0,
      "total_hours": 0.0
    }
  }
}
```

### User Endpoints

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer {token}
```

#### Get User Stats
```http
GET /api/users/stats
Authorization: Bearer {token}
```

#### Get Daily Progress
```http
GET /api/users/daily-progress?days=7
Authorization: Bearer {token}
```

### Track Endpoints

#### Get Enrolled Tracks
```http
GET /api/tracks/enrolled
Authorization: Bearer {token}
```

#### Enroll in Track
```http
POST /api/tracks/{track_slug}/enroll
Authorization: Bearer {token}
Content-Type: application/json

{
  "track_name": "ChatGPT Mastery"
}
```

#### Get Track Progress
```http
GET /api/tracks/{track_slug}/progress
Authorization: Bearer {token}
```

#### Complete Task
```http
POST /api/tracks/tasks/{task_id}/complete
Authorization: Bearer {token}
Content-Type: application/json

{
  "track_slug": "chatgpt",
  "lesson_index": 0,
  "task_index": 1,
  "prompt": "Task prompt",
  "user_output": "User's answer",
  "ai_evaluation": "AI feedback",
  "score": 85,
  "xp_earned": 10,
  "time_spent_minutes": 15
}
```

#### Get Completed Tasks
```http
GET /api/tracks/{track_slug}/tasks/completed
Authorization: Bearer {token}
```

---


## 🐛 Known Issues & Fixes

### ✅ Fixed Issues
- ✅ Import errors in tracks router (missing database, dependencies, models imports)
- ✅ Field name mismatches between frontend and backend (`percent_complete` vs `progress_percentage`)
- ✅ Progress bar not updating in home and dashboard views
- ✅ Self-healing logic for progress calculation inconsistencies

### 🔄 In Progress
- Mobile responsiveness improvements
- Enhanced AI task generation
- Social features (leaderboards, peer comparison)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Kshitij Daitr**
- **Neel Rawal** 

---

## 🙏 Acknowledgments

- FastAPI for the amazing Python web framework
- Next.js team for the powerful React framework
- MongoDB for the flexible NoSQL database
- All contributors and testers

---



<div align="center">

**Made with ❤️ by the The Mentora AI Team**

⭐ Star this repo if you find it helpful!

</div>