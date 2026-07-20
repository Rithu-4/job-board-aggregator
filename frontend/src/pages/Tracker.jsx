import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUSES = ["saved", "applied", "interview", "rejected", "offer"];
const LABELS = {
  saved: "Saved",
  applied: "Applied",
  interview: "Interview",
  rejected: "Rejected",
  offer: "Offer",
};

export default function Tracker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/applications");
      setApplications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    const { data } = await api.patch(`/applications/${id}`, { status });
    setApplications((prev) => prev.map((a) => (a._id === id ? data : a)));
  };

  const removeApplication = async (id) => {
    await api.delete(`/applications/${id}`);
    setApplications((prev) => prev.filter((a) => a._id !== id));
  };

  if (loading) return <div className="container"><p>Loading tracker...</p></div>;

  return (
    <div className="container">
      <h2>My Application Tracker</h2>
      <div className="tracker-board">
        {STATUSES.map((status) => (
          <div key={status} className="tracker-column">
            <h4>{LABELS[status]}</h4>
            {applications
              .filter((a) => a.status === status)
              .map((a) => (
                <div key={a._id} className="tracker-card">
                  <strong>{a.job.title}</strong>
                  <div>{a.job.company}</div>
                  <div style={{ margin: "6px 0" }}>
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a._id, e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{LABELS[s]}</option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-outline" onClick={() => removeApplication(a._id)}>
                    Remove
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
