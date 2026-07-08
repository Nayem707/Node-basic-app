require("dotenv").config();

const express = require("express");
const app = express();

const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Nayem! Your Docker app is now connected to PostgreSQL! 🚀");
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
};

startServer();
