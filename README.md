
# Job Board Aggregator

A full-stack MERN application to search, filter, and track job applications in one place — built to solve a real problem (my own job search) rather than as a tutorial clone.

## Features

- Browse job listings with multi-filter search (tech stack, location, experience level, job type, free-text search)
- JWT-based authentication (register/login)
- Personal application tracker — save jobs and move them through Saved → Applied → Interview → Rejected → Offer
- Admin-only endpoints to add/edit/delete job listings
- Pagination on the job feed

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Auth:** JWT + bcrypt password hashing

## Project Structure

```
job-board-aggregator/
├── backend/
│   ├── config/db.js
│   ├── models/          User, Job, SavedApplication
│   ├── middleware/auth.js
│   ├── routes/           authRoutes, jobRoutes, applicationRoutes
│   ├── seed.js           sample job listings
│   └── server.js
└── frontend/
    └── src/
        ├── api/axios.js
        ├── context/AuthContext.jsx
        ├── components/    Navbar, JobCard, JobFilters
        ├── pages/          JobFeed, Login, Register, Tracker
        └── App.jsx
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI (local MongoDB or a free MongoDB Atlas cluster)
#            set JWT_SECRET to any long random string
npm run seed     # populates the database with 12 sample listings
npm run dev      # starts the API on http://localhost:5000
```

If you don't have MongoDB installed locally, create a free cluster at
[mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and paste the
connection string into `MONGO_URI`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev       # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so both
must be running for the app to work locally.

### 3. Create an admin user (optional)

Register normally through the UI, then manually update that user's `role`
field to `"admin"` in MongoDB (via Compass or the Atlas UI) to unlock the
job-management endpoints.

## Deployment (for your resume link)

- **Backend:** Render or Railway (free tier) — set the same env vars as `.env`
- **Frontend:** Vercel or Netlify — set the API base URL to your deployed backend
- **Database:** MongoDB Atlas free tier

## Key Technical Decisions (interview talking points)

1. **Dynamic filter query** (`routes/jobRoutes.js`) — builds a single MongoDB
   query object by only adding a clause for filters the user actually
   provided, instead of writing a separate query per filter combination.
   A compound index on `{ location, experienceLevel, jobType }` and a text
   index on `{ title, company, description }` back this so it scales as the
   listing count grows.
2. **Preventing duplicate tracked jobs** — a unique compound index on
   `{ user, job }` in `SavedApplication` stops a user from saving the same
   listing twice at the database level, not just in the UI.
3. **JWT auth middleware** — `protect` verifies the token and attaches the
   user to `req.user`; `adminOnly` layers on top for admin-only routes,
   keeping authorization logic out of individual route handlers.
4. **Ownership checks on the tracker** — every tracker update/delete query
   filters by both `_id` and `user`, so a user can never edit or see another
   user's tracked applications even if they guess an ID.

## Next Steps / Ideas to Extend

- Add rate limiting on auth routes
- Add email reminders for `followUpDate`
- Add a simple admin dashboard UI (currently API-only)
- Deploy and add real scraped/aggregated listings via a scheduled job

# Job-board-aggregator
 60f524b81b866144ee37bc0e04d1d737831496ed
