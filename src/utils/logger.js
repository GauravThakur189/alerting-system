const FailedAttempt = require("../models/FailedAttempt");
const IPAnalytics = require("../models/IPAnalytics");
const sendEmail = require("./email");

const THRESHOLD = 5;
const logFailure = async (ip, reason) => {
  try {
    await FailedAttempt.create({ ip, reason, timestamp: new Date() });
    const ipAnalytics = await IPAnalytics.findOne({ ip });

    if (!ipAnalytics) {
      await IPAnalytics.create({
        ip,
        failureCount: 1,
        reasons: [{ reason, count: 1 }],
        lastFailureTime: new Date(),
      });
    } else {
      ipAnalytics.failureCount++;
      ipAnalytics.lastFailureTime = new Date();
      const reasonIndex = ipAnalytics.reasons.findIndex(
        (r) => r.reason === reason
      );
      if (reasonIndex === -1) {
        ipAnalytics.reasons.push({ reason, count: 1 });
      } else {
        ipAnalytics.reasons[reasonIndex].count++;
      }

      await ipAnalytics.save();
    }

    const failureCount = await FailedAttempt.countDocuments({
      ip,
      timestamp: { $gte: new Date(Date.now() - 10 * 60 * 1000) },
    });

    if (failureCount >= THRESHOLD) {
      await sendEmail(ip, failureCount, ipAnalytics);
    }
  } catch (err) {
    console.error("Error logging failure:", err);
  }
};

module.exports = logFailure;
