const { Client } = require("pg");

const client = new Client({
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT || 5450,
  user: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || "postgres",
  ssl: false,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to PostgreSQL successfully! 🐘");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = {
  client,
  connectDB,
};
