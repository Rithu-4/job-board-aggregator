export default function JobFilters({ filters, setFilters }) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search title, company, description..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
      />
      <input
        type="text"
        placeholder="Tech stack (e.g. React, Node.js)"
        value={filters.techStack}
        onChange={(e) => update("techStack", e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={filters.location}
        onChange={(e) => update("location", e.target.value)}
      />
      <select value={filters.experienceLevel} onChange={(e) => update("experienceLevel", e.target.value)}>
        <option value="">Any experience</option>
        <option value="fresher">Fresher</option>
        <option value="0-2yr">0–2 yrs</option>
        <option value="2-5yr">2–5 yrs</option>
        <option value="5+yr">5+ yrs</option>
      </select>
      <select value={filters.jobType} onChange={(e) => update("jobType", e.target.value)}>
        <option value="">Any type</option>
        <option value="full-time">Full-time</option>
        <option value="internship">Internship</option>
        <option value="walk-in">Walk-in</option>
        <option value="contract">Contract</option>
      </select>
    </div>
  );
}
