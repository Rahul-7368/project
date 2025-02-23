const express = require("express");
const cors = require("cors");

const connectDB = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const resignationRoute = require("./routes/resignationRoute");
const exitInterviewRoutes = require("./routes/exitInterviewRoutes");
require("dotenv").config();

const app = express();

// app.use(cors());

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/resignation", resignationRoute);
app.use("/api/exit-interview", exitInterviewRoutes);

const PORT = process.env.PORT || 8080;

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
