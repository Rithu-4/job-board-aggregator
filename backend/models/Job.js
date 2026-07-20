const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },

    companyLogo: {
      type: String,
      default: "",
    },

    companyWebsite: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    workMode: {
      type: String,
      enum: ["Onsite", "Hybrid", "Remote"],
      default: "Onsite",
    },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Full Stack",
        "Mobile",
        "DevOps",
        "QA",
        "UI/UX",
      ],
      default: "Full Stack",
    },

    techStack: {
      type: [String],
      default: [],
      index: true,
    },

    experienceLevel: {
      type: String,
      enum: [
        "Fresher",
        "0-2 Years",
        "2-5 Years",
        "5+ Years",
      ],
      default: "Fresher",
    },

    jobType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Internship",
        "Contract",
        "Walk-in",
      ],
      default: "Full-time",
    },

    salaryMin: Number,

    salaryMax: Number,

    skills: {
      type: [String],
      default: [],
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    education: {
      type: String,
      default: "Bachelor's Degree",
    },

    description: {
      type: String,
      default: "",
    },

    applyLink: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      default: "Manual",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    postedDate: {
      type: Date,
      default: Date.now,
    },

    applicationDeadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
});

jobSchema.index({
  location: 1,
  experienceLevel: 1,
  jobType: 1,
});

module.exports = mongoose.model("Job", jobSchema);