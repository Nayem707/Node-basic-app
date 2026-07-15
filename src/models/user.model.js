// src/models/user.model.js

import { prisma } from "../config/client.js";
import { cacheGet, cacheSet, cacheDel } from "../config/redis.js";

const USERS_LIST_KEY = "users:all";
const userKey = (id) => `user:${id}`;

export class UserModel {
  async findAll() {
    // 1. Cache hit? Return from Redis (skip DB)
    const cached = await cacheGet(USERS_LIST_KEY);
    if (cached) {
      console.log("Cache HIT:", USERS_LIST_KEY);
      return cached;
    }

    // 2. Cache miss → query PostgreSQL
    console.log("Cache MISS:", USERS_LIST_KEY);
    const users = await prisma.user.findMany({
      include: { posts: true },
    });

    // 3. Store in Redis with TTL for next requests
    await cacheSet(USERS_LIST_KEY, users);
    return users;
  }

  async findById(id) {
    const key = userKey(id);

    const cached = await cacheGet(key);
    if (cached) {
      console.log("Cache HIT:", key);
      return cached;
    }

    console.log("Cache MISS:", key);
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });

    // Only cache when the user exists (avoid caching "not found")
    if (user) {
      await cacheSet(key, user);
    }
    return user;
  }

  async create(data) {
    const user = await prisma.user.create({ data });
    // List is stale after a new user is added
    await cacheDel(USERS_LIST_KEY);
    return user;
  }

  async update(id, data) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    // Invalidate this user + the list so next GET loads fresh data
    await cacheDel(userKey(id), USERS_LIST_KEY);
    return user;
  }

  async delete(id) {
    const user = await prisma.user.delete({ where: { id } });
    await cacheDel(userKey(id), USERS_LIST_KEY);
    return user;
  }
}
