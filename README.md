# 🌱 EcoTracker — Carbon Footprint Tracker

EcoTracker is a full-stack web application that helps users calculate, monitor, and reduce their carbon footprint by tracking daily activities such as transport, electricity, food, water, waste, and shopping.

It provides meaningful insights and encourages environmentally responsible behavior.

---

## 🚀 Features

* 🔐 User Authentication (Signup / Login / OTP verification)
* 📊 Personal Carbon Footprint Dashboard
* 🚗 Track Transport Emissions
* ⚡ Track Electricity Usage
* 🍽 Track Food Consumption Impact
* 💧 Track Water Usage
* 🗑 Track Waste Management
* 🛍 Track Shopping Footprint
* 📈 Visual charts & analytics
* 📄 PDF Report Generation
* 🌍 Eco-friendly suggestions to reduce footprint

---

## 🛠 Tech Stack

### Frontend

* React / Vite
* Tailwind CSS
* Chart.js / Recharts
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Nodemailer (OTP Email)
* PDF Generator

---

## 📂 Project Structure

```
EcoTracker/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   └── .env (ignored)
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── constant.js
│   └── .env (ignored)
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:5000
```

> Note: `.env` files are ignored using `.gitignore` for security.

---

## ▶️ Run Locally

### 1. Clone Repository

```
git clone https://github.com/your-username/ecotracker.git
cd ecotracker
```

### 2. Install Dependencies

#### Backend

```
cd backend
npm install
npm start
```

#### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📊 Use Case

EcoTracker helps individuals:

* Understand their environmental impact
* Track daily carbon emissions
* Make sustainable lifestyle decisions
* Reduce carbon footprint over time

---

## 🔒 Security

* Sensitive data stored in `.env`
* JWT based authentication
* Password hashing using bcrypt
* MongoDB secure connection

---

## 📌 Future Improvements

* AI-based carbon prediction
* Mobile responsive PWA
* Social sharing of eco scores
* Leaderboard / Gamification
* Multi-language support

---

## 👨‍💻 Developed By

**Mohit Kumar Soni**

* GitHub: [https://github.com](https://github.com/your-username)/Mohit102006
* LinkedIn: [https://linkedin.com/in/](https://linkedin.com/in/your-profile) mohit-kumar-soni-8129b6388  

---

## ⭐ If you like this project

Give it a star on GitHub and support eco-friendly innovation 🌍
