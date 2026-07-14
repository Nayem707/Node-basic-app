import { createClient } from "redis";

let redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// যদি Upstash হয়, তবে প্রোটোকল rediss:// নিশ্চিত করুন
if (redisUrl.includes("upstash.io") && redisUrl.startsWith("redis://")) {
  redisUrl = redisUrl.replace("redis://", "rediss://");
}

const redis = createClient({
  url: redisUrl,
  socket: redisUrl.startsWith("rediss://")
    ? {
        tls: true,
        rejectUnauthorized: false,
      }
    : {},
});

redis.on("error", (err) => console.error("Redis Error:", err));

(async () => {
  try {
    await redis.connect();
    console.log("Redis connected successfully!");
  } catch (err) {
    console.error("Could not connect to Redis:", err);
  }
})();

export default redis;
