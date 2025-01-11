const express = require("express");
const logFailure = require("../utils/logger");

const VALID_TOKEN = "valid-token-145"; //Here I have taken Hardcoded valid token...it can be changes to real valid token
const router = express.Router();

router.post("/submit", async (req, res) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const { authorization } = req.headers;
  console.log(ip);
  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      const reason = !authorization ? "Missing header" : "Invalid token format";
      await logFailure(ip, reason);
      return res.status(401).json({ error: "Unauthorized request", reason });
    }

    const token = authorization.split(" ")[1]; 
    if (token !== VALID_TOKEN) {
      const reason = "Invalid token";
      await logFailure(ip, reason);
      return res.status(401).json({ error: "Unauthorized request", reason });
    }
    res.status(200).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error("Error handling request", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
