import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobFeed from "./pages/JobFeed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tracker from "./pages/Tracker";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tracker"
          element={
            <PrivateRoute>
              <Tracker />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
