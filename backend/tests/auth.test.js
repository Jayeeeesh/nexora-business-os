const { test, before, beforeEach, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

process.env.JWT_SECRET = "test-jwt-secret";

const app = require("../app");
const User = require("../models/User");

const mongoose = require("mongoose");

const TEST_MONGO_URI =
  process.env.TEST_MONGO_URI || "mongodb://127.0.0.1:27018/nexora_test";

before(async () => {
  await mongoose.connect(TEST_MONGO_URI);

  if (mongoose.connection.name !== "nexora_test") {
    throw new Error("Tests must run against the nexora_test database");
  }
});

beforeEach(async () => {
  await User.deleteMany({});
});

after(async () => {
  await mongoose.disconnect();
});
test("GET /api/auth/me returns 401 when unauthenticated", async () => {
  const response = await request(app).get("/api/auth/me");

  assert.equal(response.statusCode, 401);
  assert.equal(response.body.message, "Authentication required");
});

test("GET /api/auth/me returns current user when authenticated", async () => {
  await User.create({
    name: "Test User",
    email: "test@nexora.com",
    password: "password123",
  });

  const agent = request.agent(app);

  const loginResponse = await agent.post("/api/auth/login").send({
    email: "test@nexora.com",
    password: "password123",
  });

  assert.equal(loginResponse.statusCode, 200);

  const response = await agent.get("/api/auth/me");

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.user.email, "test@nexora.com");
});
