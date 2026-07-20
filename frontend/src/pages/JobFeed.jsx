import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import { useAuth } from "../context/AuthContext";

export default function JobFeed() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    techStack: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    page: 1,
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
      const { data } = await api.get("/jobs", { params });
      setJobs(data.jobs);
      setPagination(data.pagination);
    } catch (err) {
      setError("Could not load jobs. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // Debounce so we don't fire a request on every keystroke
    const timer = setTimeout(fetchJobs, 350);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  useEffect(() => {
    if (!user) return;
    api.get("/applications").then(({ data }) => {
      setSavedJobIds(new Set(data.map((a) => a.job._id)));
    }).catch(() => {});
  }, [user]);

  const handleSave = async (jobId) => {
    if (!user) {
      alert("Please log in to save jobs to your tracker.");
      return;
    }
    try {
      await api.post("/applications", { jobId });
      setSavedJobIds((prev) => new Set(prev).add(jobId));
    } catch (err) {
      alert(err.response?.data?.message || "Could not save job");
    }
  };

  return (
    <div className="container">
      <h2>Find your next role</h2>
      <JobFilters filters={filters} setFilters={setFilters} />

      {loading && <p>Loading jobs...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && jobs.length === 0 && !error && <p>No jobs match those filters.</p>}

      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onSave={handleSave}
          saved={savedJobIds.has(job._id)}
        />
      ))}

      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-outline"
            disabled={pagination.page <= 1}
            onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
          >
            Previous
          </button>
          <span>Page {pagination.page} of {pagination.pages}</span>
          <button
            className="btn btn-outline"
            disabled={pagination.page >= pagination.pages}
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
