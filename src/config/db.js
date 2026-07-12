// db.js
import { prisma } from "./client.js";

// ডাটাবেজ কানেকশন চেক করার জন্য একটি ফাংশন এক্সপোর্ট করছি
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("🐘 Database connected successfully via Prisma!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // কানেকশন ফেইল করলে সার্ভার বন্ধ করে দেবে
  }
};
