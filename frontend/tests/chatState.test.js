import test from "node:test";
import assert from "node:assert/strict";

import {
  createManagedSocket,
  formatMessageTime,
  normalizeMessageText,
  readStoredJson,
  writeStoredJson,
} from "../src/lib/chatState.js";

test("trims valid messages and rejects blank messages", () => {
  assert.equal(normalizeMessageText(" hello "), "hello");
  assert.equal(normalizeMessageText("   "), "");
});

test("limits a message to the server maximum", () => {
  assert.equal(normalizeMessageText("a".repeat(2001)).length, 2000);
});

test("formats a createdAt value as a short relative time", () => {
  assert.equal(
    formatMessageTime(
      "2026-08-26T09:59:00.000Z",
      new Date("2026-08-26T10:00:00.000Z")
    ),
    "1 min ago"
  );
});

test("returns an empty time for an invalid date", () => {
  assert.equal(formatMessageTime("not-a-date"), "");
});

test("returns a fallback for malformed stored JSON", () => {
  const storage = { getItem: () => "{broken" };
  assert.deepEqual(readStoredJson(storage, "alerts", []), []);
});

test("handles unavailable storage while reading and writing", () => {
  const storage = {
    getItem: () => {
      throw new Error("storage disabled");
    },
    setItem: () => {
      throw new Error("storage disabled");
    },
  };

  assert.deepEqual(readStoredJson(storage, "alerts", []), []);
  assert.equal(writeStoredJson(storage, "alerts", []), false);
});

test("disconnects a managed socket during cleanup", () => {
  let disconnected = false;
  const connect = (server, options) => {
    assert.equal(server, "https://chat.example");
    assert.deepEqual(options, { withCredentials: true });
    return { disconnect: () => (disconnected = true) };
  };

  const managed = createManagedSocket(connect, "https://chat.example");
  managed.dispose();

  assert.equal(disconnected, true);
});
