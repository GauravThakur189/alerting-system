const express = require("express");
const IPAnalytics = require("../models/IpAnalytics");

const router = express.Router();

router.get("/analytics", async (req, res) => {
  try {
    const analytics = await IPAnalytics.find({});
    res.status(200).json(analytics);
  } catch (err) {
    console.error("Error fetching analytics", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
