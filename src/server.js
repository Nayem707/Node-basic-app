require("dotenv").config();
const express = require("express");

const { Client } = require("pg"); // PostgreSQL ক্লায়েন্ট
const app = express();

// Render নিজে থেকে একটি PORT দেয়, সেটি না পেলে ৩০০১ ব্যবহার করবে
const PORT = process.env.PORT || 3001;

// Render-এর ডাটাবেজ URL আমরা এনভায়রনমেন্ট ভ্যারিয়েবল থেকে নেব
const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client({
  connectionString: DATABASE_URL,
  // Only use SSL if we are NOT on localhost
  ssl: DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL successfully! 🐘"))
  .catch((err) => console.error("Database connection error", err));

app.get("/", (req, res) => {
  res.send("Hello Nayem! Your Docker app is now connected to PostgreSQL! 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
