import request from "supertest";
import { prisma } from "../src/config/client.js";
import app from "../src/app.js";

describe("API Should Run", () => {
  test("GET /", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "OK",
      message: "Welcome to the API",
    });
  });

  test("GET /health should return server health", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.timestamp).toBeDefined();
  });

  test("Unknown route should return 404", async () => {
    const res = await request(app).get("/not-found");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test("GET /api/users should return all users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toBe(200);

    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);

    if (res.body.data.length > 0) {
      expect(res.body.data[0]).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        posts: expect.any(Array),
      });
    }
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
