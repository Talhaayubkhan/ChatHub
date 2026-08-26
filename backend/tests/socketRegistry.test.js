import test from "node:test";
import assert from "node:assert/strict";

import { createSocketRegistry } from "../src/services/socketRegistry.js";

test("keeps every active socket for a user", () => {
  const registry = createSocketRegistry();

  registry.addSocket("user-1", "socket-a");
  registry.addSocket("user-1", "socket-b");

  assert.deepEqual(registry.getSocketIds(["user-1"]), [
    "socket-a",
    "socket-b",
  ]);
});

test("removes only the disconnected socket", () => {
  const registry = createSocketRegistry();
  registry.addSocket("user-1", "socket-a");
  registry.addSocket("user-1", "socket-b");

  registry.removeSocket("user-1", "socket-a");

  assert.deepEqual(registry.getSocketIds(["user-1"]), ["socket-b"]);
});

test("removes the user after the last socket disconnects", () => {
  const registry = createSocketRegistry();
  registry.addSocket("user-1", "socket-a");

  registry.removeSocket("user-1", "socket-a");

  assert.deepEqual(registry.getSocketIds(["user-1"]), []);
});

test("ignores offline users and duplicate identifiers", () => {
  const registry = createSocketRegistry();
  registry.addSocket("user-1", "socket-a");

  assert.deepEqual(
    registry.getSocketIds(["user-1", "user-1", "user-2"]),
    ["socket-a"]
  );
});

test("ignores incomplete socket registrations", () => {
  const registry = createSocketRegistry();

  registry.addSocket(undefined, "socket-a");
  registry.addSocket("user-1", undefined);

  assert.deepEqual(registry.getSocketIds(["user-1"]), []);
});
