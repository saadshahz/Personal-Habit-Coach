# Personal Time & Habit Coach

A modern, full-stack application to track your daily time investment, analyze habits, and receive personalized micro-change suggestions.

## 🚀 Features

- **Daily Activity Log**: Easy entry of categories and time spent.
- **Smart Analysis**: Visual breakdown of your time distribution.
- **Habit Coaching**: AI-driven detection of over-invested and neglected areas.
- **Micro-Suggestions**: Actionable advice based on your personal goals.
- **History Tracking**: View past analyses to track progress.

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: JSON File System (Lightweight MVP)

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS (Glassmorphism & Modern UI)
- **Charts**: Recharts

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### 1. Setup Backend
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`

### 2. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Client runs on `http://localhost:5173`

### 3. AI Configuration (Optional)
To enable real AI suggestions, create a `.env` file in `/backend` and add your key:
```env
OPENAI_API_KEY=sk-your-api-key-here
```
If no key is provided, the system uses a local smart-fallback engine.

## 🧪 Testing

### Backend API
An automated test plan is included. You can also manually test using the provided curl commands in `TestPlan.md`.

### Manual UI Test
1. Open the dashboard.
2. Enter activities exceeding 24h total -> Verify Error.
3. Enter valid activities -> Verify Charts & Suggestions.

## 📂 Project Structure
```
personal-habit-coach/
├── backend/            # Express Server & Logic
│   ├── controllers/    # Business Logic
│   ├── routes/         # API Endpoints
│   ├── utils/          # Helpers
│   └── data/           # JSON Storage
├── frontend/           # React UI
│   ├── src/
│   │   ├── components/ # UI Components
│   │   └── pages/      # Route Pages
└── ...documentation    # Design & Roadmap docs
```
