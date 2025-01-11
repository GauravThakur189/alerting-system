const express = require("express");
const mongoose = require("mongoose");

const apiRoutes = require("./routes/api");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb+srv://rajanthakur1818:2T7bLbzsgc3HYmw2@cluster0.9fnh9.mongodb.net/alerting-system?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

// Starting server to localhost:3000
const PORT =  3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start the server:", err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
