
# 💼 Job Board Aggregator

A full-stack MERN application that helps job seekers search, filter, and track job applications from one platform. This project was built to solve a real-world problem by providing a centralized job portal with authentication, advanced filtering, and an application tracker.

---

## 🚀 Features

- 🔍 Search jobs by keyword
- 📍 Filter by location, tech stack, experience level, and job type
- 🌍 Browse jobs from multiple locations (Chennai, Bengaluru, Hyderabad, Kochi, Pune, Mumbai, Noida, Gurugram, Remote)
- 🔐 JWT Authentication (Register & Login)
- 📌 Save jobs and track application status
- 📊 Application Tracker (Saved → Applied → Interview → Offer → Rejected)
- 👨‍💼 Admin-only CRUD operations for job listings
- 📄 Pagination for efficient job browsing
- 💾 MongoDB Atlas integration with seeded sample jobs

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcryptjs

---

## 📂 Project Structure

```text
job-board-aggregator/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

The backend runs on:

```
http://localhost:5000
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

---

## ✨ Key Technical Highlights

- Dynamic MongoDB filtering using query parameters
- Full-text search with MongoDB text indexes
- JWT-based authentication and protected routes
- Password hashing using bcryptjs
- Pagination for scalable job browsing
- Admin-only job management endpoints
- Compound MongoDB indexes for optimized filtering
- Duplicate application prevention using unique indexes

---

## 🚀 Future Enhancements

- AI-powered job recommendations
- Resume upload
- Email notifications
- Company dashboard
- Bookmark jobs
- Salary range filter
- Dark mode
- Real-time job aggregation

---

## 👨‍💻 Author

**Rithu Rajan**

- GitHub: https://github.com/Rithu-4
- LinkedIn: https://www.linkedin.com/in/rithu-rajan10

---

⭐ If you found this project useful, please consider giving it a star!
