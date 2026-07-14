import { createClient } from "redis";

// পিসি থেকে টেস্ট করার জন্য এটি ব্যবহার করুন
const client = createClient({
  // যদি ENV থেকে কিছু না পায়, তবে লোকালহস্ট ব্যবহার করবে
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();
await client.set("test_key", "Hello from ES Modules!");
const value = await client.get("test_key");

console.log("Redis response:", value);
await client.disconnect();
