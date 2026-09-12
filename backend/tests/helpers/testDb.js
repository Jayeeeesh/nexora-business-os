const mongoose = require("mongoose");

const TEST_MONGO_URI =
  process.env.TEST_MONGO_URI || "mongodb://127.0.0.1:27018/nexora_test";

async function connectTestDb() {
  await mongoose.connect(TEST_MONGO_URI);

  if (mongoose.connection.name !== "nexora_test") {
    throw new Error("Tests must run against the nexora_test database");
  }
}

async function disconnectTestDb() {
  await mongoose.disconnect();
}

module.exports = {
  connectTestDb,
  disconnectTestDb,
};
