const express = require("express");
const SavedApplication = require("../models/SavedApplication");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All routes here require a logged-in user
router.use(protect);

// @route  GET /api/applications
// @desc   Get the logged-in user's tracked jobs, newest first
router.get("/", async (req, res) => {
  try {
    const applications = await SavedApplication.find({ user: req.user._id })
      .populate("job")
      .sort({ updatedAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
});

// @route  POST /api/applications
// @desc   Save/track a job for the logged-in user
router.post("/", async (req, res) => {
  try {
    const { jobId, status, notes } = req.body;
    if (!jobId) return res.status(400).json({ message: "jobId is required" });

    const application = await SavedApplication.create({
      user: req.user._id,
      job: jobId,
      status: status || "saved",
      notes: notes || "",
    });

    const populated = await application.populate("job");
    res.status(201).json(populated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "You've already saved this job" });
    }
    res.status(400).json({ message: "Failed to save job", error: err.message });
  }
});

// @route  PATCH /api/applications/:id
// @desc   Update status, notes, or follow-up date on a tracked job
router.patch("/:id", async (req, res) => {
  try {
    const application = await SavedApplication.findOne({
      _id: req.params.id,
      user: req.user._id, // ensures a user can only edit their own record
    });

    if (!application) return res.status(404).json({ message: "Application not found" });

    const { status, notes, followUpDate } = req.body;
    if (status) {
      application.status = status;
      if (status === "applied" && !application.appliedDate) {
        application.appliedDate = new Date();
      }
    }
    if (notes !== undefined) application.notes = notes;
    if (followUpDate !== undefined) application.followUpDate = followUpDate;

    await application.save();
    const populated = await application.populate("job");
    res.json(populated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update application", error: err.message });
  }
});

// @route  DELETE /api/applications/:id
router.delete("/:id", async (req, res) => {
  try {
    const application = await SavedApplication.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Removed from tracker" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete application", error: err.message });
  }
});

module.exports = router;
