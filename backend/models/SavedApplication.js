const mongoose = require("mongoose");

const savedApplicationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
      type: String,
      enum: ["saved", "applied", "interview", "rejected", "offer"],
      default: "saved",
    },
    notes: { type: String, default: "" },
    followUpDate: { type: Date },
    appliedDate: { type: Date },
  },
  { timestamps: true }
);

// Prevent the same user from saving the same job twice
savedApplicationSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model("SavedApplication", savedApplicationSchema);
