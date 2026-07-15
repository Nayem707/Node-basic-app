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

// Default TTL for cached API responses (seconds)
export const CACHE_TTL = 60;

/**
 * Read a JSON value from Redis.
 * Returns null on cache miss or if Redis is unavailable (app still works via DB).
 */
export async function cacheGet(key) {
  try {
    if (!redis.isOpen) return null;

    const value = await redis.get(key);

    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error("Redis cacheGet error:", err.message);
    return null;
  }
}

/**
 * Store a JSON value in Redis with a TTL (expires automatically).
 */
export async function cacheSet(key, data, ttlSeconds = CACHE_TTL) {
  try {
    if (!redis.isOpen) return;
    await redis.set(key, JSON.stringify(data), { EX: ttlSeconds });
  } catch (err) {
    console.error("Redis cacheSet error:", err.message);
  }
}

/**
 * Delete one or more cache keys (used after create / update / delete).
 */
export async function cacheDel(...keys) {
  try {
    if (!redis.isOpen || keys.length === 0) return;
    await redis.del(keys);
  } catch (err) {
    console.error("Redis cacheDel error:", err.message);
  }
}

export default redis;
