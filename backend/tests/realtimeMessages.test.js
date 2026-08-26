import test from "node:test";
import assert from "node:assert/strict";

import { createRealtimeMessageService } from "../src/services/realtimeMessages.js";

const createChatModel = (members) => ({
  findById: async () => (members ? { members } : null),
});

test("rejects blank messages before querying the database", async () => {
  let queried = false;
  const ChatModel = {
    findById: async () => {
      queried = true;
      return null;
    },
  };
  const service = createRealtimeMessageService({
    ChatModel,
    MessageModel: {},
    registry: {},
  });

  await assert.rejects(
    () =>
      service.sendMessage({
        user: { _id: "user-1" },
        chatId: "chat-1",
        content: "   ",
      }),
    /empty/i
  );
  assert.equal(queried, false);
});

test("rejects messages longer than 2000 characters", async () => {
  const service = createRealtimeMessageService({
    ChatModel: createChatModel([{ _id: "user-1" }]),
    MessageModel: {},
    registry: {},
  });

  await assert.rejects(
    () =>
      service.sendMessage({
        user: { _id: "user-1" },
        chatId: "chat-1",
        content: "a".repeat(2001),
      }),
    /2000/
  );
});

test("rejects a sender who is not a chat member", async () => {
  const service = createRealtimeMessageService({
    ChatModel: createChatModel([{ _id: "user-2" }]),
    MessageModel: {},
    registry: {},
  });

  await assert.rejects(
    () =>
      service.sendMessage({
        user: { _id: "user-1" },
        chatId: "chat-1",
        content: "hello",
      }),
    /member/i
  );
});

test("rejects a missing chat", async () => {
  const service = createRealtimeMessageService({
    ChatModel: createChatModel(null),
    MessageModel: {},
    registry: {},
  });

  await assert.rejects(
    () =>
      service.sendMessage({
        user: { _id: "user-1" },
        chatId: "missing-chat",
        content: "hello",
      }),
    /not found/i
  );
});

test("persists a normalized message and allows offline members", async () => {
  const savedAt = new Date("2026-08-26T10:00:00.000Z");
  let savedValue;
  const ChatModel = createChatModel([
    { _id: "user-1" },
    { _id: "user-2" },
  ]);
  const MessageModel = {
    create: async (value) => {
      savedValue = value;
      return { _id: "message-1", ...value, createdAt: savedAt };
    },
  };
  const registry = {
    getSocketIds: (userIds) => {
      assert.deepEqual(userIds, ["user-1", "user-2"]);
      return ["socket-user-1"];
    },
  };
  const service = createRealtimeMessageService({
    ChatModel,
    MessageModel,
    registry,
  });

  const result = await service.sendMessage({
    user: { _id: "user-1", name: "Talha", avatar: { url: "avatar.jpg" } },
    chatId: "chat-1",
    content: " hello ",
  });

  assert.deepEqual(savedValue, {
    chat: "chat-1",
    sender: "user-1",
    content: "hello",
  });
  assert.deepEqual(result.recipientSocketIds, ["socket-user-1"]);
  assert.equal(result.message.content, "hello");
  assert.equal(result.message.createdAt, savedAt);
  assert.deepEqual(result.message.sender, {
    _id: "user-1",
    name: "Talha",
    avatar: { url: "avatar.jpg" },
  });
});

test("does not resolve recipients when persistence fails", async () => {
  let resolvedRecipients = false;
  const service = createRealtimeMessageService({
    ChatModel: createChatModel([{ _id: "user-1" }]),
    MessageModel: {
      create: async () => {
        throw new Error("database unavailable");
      },
    },
    registry: {
      getSocketIds: () => {
        resolvedRecipients = true;
        return [];
      },
    },
  });

  await assert.rejects(
    () =>
      service.sendMessage({
        user: { _id: "user-1" },
        chatId: "chat-1",
        content: "hello",
      }),
    /database unavailable/
  );
  assert.equal(resolvedRecipients, false);
});
