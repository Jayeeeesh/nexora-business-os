const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Nexora API is running" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
