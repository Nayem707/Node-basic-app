// server.js
import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js"; // এখানে ফাংশনটি ইম্পোর্ট করুন

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // ১. আগে ডাটাবেজ কানেক্ট হবে
  await connectDB();

  // ২. তারপর সার্ভার লিসেন করবে
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
