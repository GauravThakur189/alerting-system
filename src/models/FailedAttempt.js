const mongoose = require("mongoose");

const FailedAttemptSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  reason: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const FailedAttempt =
  mongoose.models.FailedAttempt || mongoose.model("FailedAttempt", FailedAttemptSchema);

module.exports = FailedAttempt;
