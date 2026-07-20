export default function JobCard({ job, onSave, saved }) {
  return (
    <div className="card job-card">
      <h3>{job.title}</h3>
      <div className="company">{job.company}</div>
      <div className="meta">
        {job.location} · {job.experienceLevel} · {job.jobType}
        {job.salaryMin && job.salaryMax
          ? ` · ₹${job.salaryMin.toLocaleString()}–₹${job.salaryMax.toLocaleString()}`
          : ""}
      </div>
      <div className="tags">
        {job.techStack.map((tech) => (
          <span className="tag" key={tech}>{tech}</span>
        ))}
      </div>
      <p style={{ fontSize: "0.9rem", color: "#444" }}>{job.description}</p>
      <button className="btn" disabled={saved} onClick={() => onSave(job._id)}>
        {saved ? "Saved" : "Save to Tracker"}
      </button>
    </div>
  );
}
