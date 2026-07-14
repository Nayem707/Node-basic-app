// server.js
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js"; // এখানে ফাংশনটি ইম্পোর্ট করুন
import redis from "./config/redis.js"; // Redis ফাইলটি ইম্পোর্ট করুন

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // ১. ডাটাবেজ কানেক্ট হবে
    await connectDB();

    // ২. Redis কানেক্ট হবে (যেহেতু await কানেক্ট আছে)
    console.log("🔍 Redis Connected Successfully");

    // ৩. সবশেষে সার্ভার লিসেন করবে
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
