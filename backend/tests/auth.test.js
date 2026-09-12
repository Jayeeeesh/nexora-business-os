const { test, before, beforeEach, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

process.env.JWT_SECRET = "test-jwt-secret";

const app = require("../app");
const User = require("../models/User");

const { connectTestDb, disconnectTestDb } = require("./helpers/testDb");

before(connectTestDb);

beforeEach(async () => {
  await User.deleteMany({});
});

after(disconnectTestDb);

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

test("POST /api/auth/login returns 401 for invalid password", async () => {
  await User.create({
    name: "Test User",
    email: "test@nexora.com",
    password: "password123",
  });

  const response = await request(app).post("/api/auth/login").send({
    email: "test@nexora.com",
    password: "wrongpassword",
  });

  assert.equal(response.statusCode, 401);
  assert.equal(response.body.message, "Invalid email or password");
});

test("POST /api/auth/register creates a new user", async () => {
  const response = await request(app).post("/api/auth/register").send({
    name: "New User",
    email: "newuser@nexora.com",
    password: "password123",
  });

  assert.equal(response.statusCode, 201);
  assert.equal(response.body.user.email, "newuser@nexora.com");
});

test("POST /api/auth/register returns 409 for duplicate email", async () => {
  await User.create({
    name: "Existing User",
    email: "newuser@nexora.com",
    password: "password123",
  });

  const response = await request(app).post("/api/auth/register").send({
    name: "New User",
    email: "newuser@nexora.com",
    password: "password123",
  });

  assert.equal(response.statusCode, 409);
  assert.equal(response.body.message, "User with this email already exists");
});

test("POST /api/auth/logout clears the authenticated session", async () => {
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

  const logoutResponse = await agent.post("/api/auth/logout");

  assert.equal(logoutResponse.statusCode, 200);

  const response = await agent.get("/api/auth/me");

  assert.equal(response.statusCode, 401);
});
