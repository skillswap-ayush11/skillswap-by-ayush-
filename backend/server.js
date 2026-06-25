const matchRoutes = require("./routes/matchRoutes");
require("dotenv").config();

console.log(process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Skill Swap Backend Running 🚀");
});
app.use("/api", matchRoutes);