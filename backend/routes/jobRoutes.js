const express = require("express");
const Job = require("../models/Job");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// @route  GET /api/jobs
// @desc   List jobs with optional filters + search + pagination
// @query  techStack, location, experienceLevel, jobType, search, page, limit
router.get("/", async (req, res) => {
  try {
    const {
      techStack,
      location,
      experienceLevel,
      jobType,
      search,
      page = 1,
      limit = 12,
    } = req.query;

    // Build the filter object dynamically — only add a clause if that
    // filter was actually provided, so one query handles every combination
    // instead of writing a separate branch per filter.
    const filter = {};

    if (techStack) {
      // techStack can be a comma-separated list, e.g. "React,Node.js"
      const stackArray = techStack.split(",").map((s) => s.trim());
      filter.techStack = { $in: stackArray };
    }

    if (location) {
      // Case-insensitive partial match so "chennai" matches "Chennai, TN"
      filter.location = { $regex: location, $options: "i" };
    }

    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const skip = (pageNum - 1) * limitNum;

    const [jobs, total] = await Promise.all([
      Job.find(filter).sort({ postedDate: -1 }).skip(skip).limit(limitNum),
      Job.countDocuments(filter),
    ]);

    res.json({
      jobs,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
});

// @route  GET /api/jobs/:id
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job", error: err.message });
  }
});

// @route  POST /api/jobs (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: "Failed to create job", error: err.message });
  }
});

// @route  PUT /api/jobs/:id (admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: "Failed to update job", error: err.message });
  }
});

// @route  DELETE /api/jobs/:id (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job", error: err.message });
  }
});

module.exports = router;
