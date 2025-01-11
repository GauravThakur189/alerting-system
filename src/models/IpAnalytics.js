const mongoose = require("mongoose");

const IPAnalyticsSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  failureCount: { type: Number, default: 0 },
  reasons: [
    {
      reason: String,
      count: { type: Number, default: 1 },
    },
  ],
  lastAttempt: { type: Date, default: Date.now },
});
const IPAnalytics =
  mongoose.models.IPAnalytics || mongoose.model("IPAnalytics", IPAnalyticsSchema);

module.exports = IPAnalytics;
