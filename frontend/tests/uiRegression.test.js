import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readSource = (relativePath) =>
  readFileSync(new URL(`../src/${relativePath}`, import.meta.url), "utf8");

test("chat layout uses the dynamic viewport and a flexible message area", () => {
  const appLayout = readSource("components/layout/AppLayout.jsx");
  const chat = readSource("pages/Chat.jsx");

  assert.match(appLayout, /100dvh/);
  assert.match(chat, /flex:\s*1/);
  assert.doesNotMatch(chat, /height=\{"90%"\}/);
});

test("online chat indicator is shown only when a member is online", () => {
  const chatItem = readSource("components/shared/ChatItem.jsx");

  assert.match(chatItem, /\{isOnline &&/);
  assert.doesNotMatch(chatItem, /\{!isOnline &&/);
});

test("notification menu uses the Material UI badgeContent property", () => {
  const header = readSource("components/layout/Header.jsx");

  assert.match(header, /badgeContent=\{notificationCount\}/);
  assert.doesNotMatch(header, /<Badge value=/);
});

test("group editor contains no invalid component size", () => {
  const groups = readSource("pages/Groups.jsx");

  assert.doesNotMatch(groups, /size="largeZ"/);
});
