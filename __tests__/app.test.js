import request from "supertest";
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
});
