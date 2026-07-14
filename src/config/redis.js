import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

// যদি URL-এ upstash থাকে, তবেই TLS ব্যবহার করো
const isUpstash = redisUrl.includes("upstash");

const redis = createClient({
  url: redisUrl,
  socket: isUpstash
    ? {
        tls: true,
        rejectUnauthorized: false,
      }
    : {}, // লোকাল ডকারের জন্য কোনো অপশন লাগবে না
});

redis.on("error", (err) => console.error("Redis Error:", err));

// কানেকশন লজিক
(async () => {
  try {
    await redis.connect();
    console.log("Redis connected successfully!");
  } catch (err) {
    console.error("Could not connect to Redis:", err);
  }
})();

export default redis;
