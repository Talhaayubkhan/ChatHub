# ChatHub Production Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver one reviewable pull request that fixes ChatHub's highest-impact frontend and backend defects, adds regression tests, improves responsive usability, and removes private or generated repository files.

**Architecture:** Keep the existing React, Material UI, Express, Mongoose, and Socket.IO structure. Extract small dependency-free helpers around socket registration, message validation, and frontend chat state so they can be tested with Node's built-in test runner. Make the backend authoritative for chat membership and message recipients, then refine the existing UI without adding routes or changing the product identity.

**Tech Stack:** React 18, Material UI 6, Redux Toolkit, Socket.IO 4, Express 4, Mongoose 8, Node.js built-in test runner, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-08-26-production-hardening-design.md`

## Global Constraints

- Work only on `codex/production-hardening`; do not edit `main` directly.
- Preserve the current route structure and Material UI based visual identity.
- Do not rewrite Git history or deploy the application.
- Do not print or copy values from the tracked `.env` file.
- Write each behavioral test before its production change and verify the expected failure.
- Keep repository cleanup in a separate commit from functional changes.
- Use plain JavaScript and the current ES module convention.

---

### Task 1: Repository hygiene and executable project commands

**Files:**
- Modify: `.gitignore`
- Modify: `backend/.env.sample`
- Modify: `backend/package.json`
- Modify: `frontend/package.json`
- Remove from Git tracking: `backend/.env`
- Remove from Git tracking: `backend/error.log`
- Remove from Git tracking: `backend/node_modules/`

**Interfaces:**
- Consumes: Existing package entry points and environment reads.
- Produces: `npm start`, `npm run dev`, and `npm test` commands that target real files; a complete non-secret environment template.

- [ ] **Step 1: Confirm tracked private and generated files without reading secret values**

```bash
git ls-files backend/.env backend/error.log 'backend/node_modules/**' | wc -l
awk -F= '/^[A-Za-z_][A-Za-z0-9_]*=/{print $1}' backend/.env | sort -u
```

Expected: the tracked count is greater than zero and only environment key names are printed.

- [ ] **Step 2: Correct package commands and the environment template**

Use these backend scripts:

```json
{
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "node --test tests/**/*.test.js"
}
```

Use this frontend test script while retaining the existing build and lint scripts:

```json
{
  "test": "node --test tests/**/*.test.js"
}
```

The sample file must contain names only:

```dotenv
PORT=8000
CLIENT_URL=http://localhost:5173
MONGO_URI=
JWT_SECRET=
JWT_EXPIRY=7d
ADMIN_SECRET_KEY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

- [ ] **Step 3: Stop tracking private and generated files**

```bash
git rm --cached backend/.env backend/error.log
git rm -r --cached backend/node_modules
git check-ignore backend/.env backend/error.log backend/node_modules
```

Expected: all three paths are ignored and scheduled for removal from Git.

- [ ] **Step 4: Verify executable entry points and clean diff formatting**

```bash
node --check backend/index.js
git diff --check
```

Expected: both commands exit with status 0.

- [ ] **Step 5: Commit repository hygiene separately**

```bash
git add .gitignore backend/.env.sample backend/package.json frontend/package.json
git commit -m "chore: remove generated files and fix project commands"
```

### Task 2: Multi-device socket registry

**Files:**
- Create: `backend/src/services/socketRegistry.js`
- Create: `backend/tests/socketRegistry.test.js`
- Modify: `backend/src/constants/sockets.js`
- Modify: `backend/index.js`

**Interfaces:**
- Consumes: authenticated `socket.user._id` and Socket.IO socket IDs.
- Produces: `createSocketRegistry()`, `addSocket(userId, socketId)`, `removeSocket(userId, socketId)`, `getSocketIds(userIds)`, and `clear()`.

- [ ] **Step 1: Write failing registry tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { createSocketRegistry } from "../src/services/socketRegistry.js";

test("keeps every active socket for a user", () => {
  const registry = createSocketRegistry();
  registry.addSocket("user-1", "socket-a");
  registry.addSocket("user-1", "socket-b");
  assert.deepEqual(registry.getSocketIds(["user-1"]), ["socket-a", "socket-b"]);
});

test("removes only the disconnected socket", () => {
  const registry = createSocketRegistry();
  registry.addSocket("user-1", "socket-a");
  registry.addSocket("user-1", "socket-b");
  registry.removeSocket("user-1", "socket-a");
  assert.deepEqual(registry.getSocketIds(["user-1"]), ["socket-b"]);
});

test("ignores offline users and duplicate identifiers", () => {
  const registry = createSocketRegistry();
  registry.addSocket("user-1", "socket-a");
  assert.deepEqual(registry.getSocketIds(["user-1", "user-1", "user-2"]), ["socket-a"]);
});
```

- [ ] **Step 2: Run the tests and verify the missing module failure**

```bash
cd backend && node --test tests/socketRegistry.test.js
```

Expected: FAIL because `src/services/socketRegistry.js` does not exist.

- [ ] **Step 3: Implement the registry**

```js
export const createSocketRegistry = () => {
  const socketsByUser = new Map();

  const addSocket = (userId, socketId) => {
    const key = String(userId);
    const sockets = socketsByUser.get(key) ?? new Set();
    sockets.add(socketId);
    socketsByUser.set(key, sockets);
  };

  const removeSocket = (userId, socketId) => {
    const key = String(userId);
    const sockets = socketsByUser.get(key);
    if (!sockets) return;
    sockets.delete(socketId);
    if (sockets.size === 0) socketsByUser.delete(key);
  };

  const getSocketIds = (userIds = []) => [
    ...new Set(userIds.flatMap((id) => [...(socketsByUser.get(String(id)) ?? [])])),
  ];

  return { addSocket, removeSocket, getSocketIds, clear: () => socketsByUser.clear() };
};
```

Register the authenticated socket during connection and remove the same socket during disconnect.

- [ ] **Step 4: Run the registry tests and backend syntax checks**

```bash
cd backend && node --test tests/socketRegistry.test.js
find . -path './node_modules' -prune -o -name '*.js' -print0 | xargs -0 -n1 node --check
```

Expected: three tests pass and all files pass syntax validation.

- [ ] **Step 5: Commit the socket registry**

```bash
git add backend/src/services/socketRegistry.js backend/tests/socketRegistry.test.js backend/src/constants/sockets.js backend/index.js
git commit -m "fix: track every active user socket"
```

### Task 3: Authoritative and acknowledged real-time messages

**Files:**
- Create: `backend/src/services/realtimeMessages.js`
- Create: `backend/tests/realtimeMessages.test.js`
- Modify: `backend/socketEvents.js`
- Modify: `backend/index.js`

**Interfaces:**
- Consumes: `createRealtimeMessageService({ ChatModel, MessageModel, registry })`.
- Produces: `sendMessage({ user, chatId, content })` returning `{ chatId, message, recipientSocketIds }`; Socket.IO acknowledgements shaped as `{ ok: true, message }` or `{ ok: false, error }`.

- [ ] **Step 1: Write failing service tests for validation, authorization, persistence order, and offline members**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { createRealtimeMessageService } from "../src/services/realtimeMessages.js";

test("rejects blank messages", async () => {
  const service = createRealtimeMessageService({ ChatModel: {}, MessageModel: {}, registry: {} });
  await assert.rejects(() => service.sendMessage({ user: { _id: "u1" }, chatId: "c1", content: "   " }), /empty/i);
});

test("rejects a sender who is not a chat member", async () => {
  const ChatModel = { findById: async () => ({ members: [{ _id: "u2" }] }) };
  const service = createRealtimeMessageService({ ChatModel, MessageModel: {}, registry: {} });
  await assert.rejects(() => service.sendMessage({ user: { _id: "u1" }, chatId: "c1", content: "hello" }), /member/i);
});

test("persists before returning recipients and allows offline members", async () => {
  const calls = [];
  const ChatModel = { findById: async () => ({ members: [{ _id: "u1" }, { _id: "u2" }] }) };
  const MessageModel = {
    create: async (value) => {
      calls.push("create");
      return { _id: "m1", ...value, createdAt: new Date("2026-08-26T10:00:00Z") };
    },
  };
  const registry = { getSocketIds: () => ["socket-u1"] };
  const service = createRealtimeMessageService({ ChatModel, MessageModel, registry });
  const result = await service.sendMessage({ user: { _id: "u1", name: "Talha" }, chatId: "c1", content: " hello " });
  assert.deepEqual(calls, ["create"]);
  assert.equal(result.message.content, "hello");
  assert.deepEqual(result.recipientSocketIds, ["socket-u1"]);
});
```

- [ ] **Step 2: Run the tests and verify the missing module failure**

```bash
cd backend && node --test tests/realtimeMessages.test.js
```

Expected: FAIL because `src/services/realtimeMessages.js` does not exist.

- [ ] **Step 3: Implement the service and Socket.IO acknowledgement boundary**

The service must trim text, enforce a 2,000 character maximum, load the chat, compare member IDs as strings, persist first, and derive sockets from stored members. `socketEvents.js` must catch operational errors and call the acknowledgement once without throwing into the event loop.

```js
const acknowledge = typeof callback === "function" ? callback : () => {};
try {
  const result = await messageService.sendMessage({ user: socket.user, chatId, content: message });
  io.to(result.recipientSocketIds).emit(NEW_MESSAGE, { chatId, message: result.message });
  acknowledge({ ok: true, message: result.message });
} catch (error) {
  acknowledge({ ok: false, error: error.message || "Unable to send message" });
}
```

- [ ] **Step 4: Run focused and full backend tests**

```bash
cd backend && node --test tests/realtimeMessages.test.js
cd backend && npm test
```

Expected: all message and registry tests pass.

- [ ] **Step 5: Commit authoritative real-time messaging**

```bash
git add backend/src/services/realtimeMessages.js backend/tests/realtimeMessages.test.js backend/socketEvents.js backend/index.js
git commit -m "fix: authorize and acknowledge realtime messages"
```

### Task 4: Backend configuration and request guardrails

**Files:**
- Create: `backend/src/utils/requestValidation.js`
- Create: `backend/tests/requestValidation.test.js`
- Modify: `backend/src/controllers/adminController.js`
- Modify: `backend/src/controllers/chatController.js`
- Modify: `backend/src/middlewares/authentication.js`
- Modify: `backend/src/constants/config.js`

**Interfaces:**
- Consumes: environment configuration, route parameters, query strings, and authenticated request data.
- Produces: `parsePositiveInteger(value, fallback, maximum)`, explicit admin-secret configuration, consistent authorization errors, and bounded message pagination.

- [ ] **Step 1: Write failing boundary tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { parsePositiveInteger } from "../src/utils/requestValidation.js";

test("normalizes a positive integer within its maximum", () => {
  assert.equal(parsePositiveInteger("3", 1, 100), 3);
});

test("uses the fallback when the value is missing", () => {
  assert.equal(parsePositiveInteger(undefined, 1, 100), 1);
});

test("rejects zero, decimals, text, and values above the maximum", () => {
  for (const value of ["0", "1.5", "abc", "101"]) {
    assert.throws(() => parsePositiveInteger(value, 1, 100), /positive integer/i);
  }
});
```

- [ ] **Step 2: Run the test and verify the missing module failure**

```bash
cd backend && node --test tests/requestValidation.test.js
```

Expected: FAIL because `src/utils/requestValidation.js` does not exist.

- [ ] **Step 3: Implement and apply the guardrails**

```js
export const parsePositiveInteger = (value, fallback, maximum) => {
  const candidate = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(candidate) || candidate < 1 || candidate > maximum) {
    throw new Error(`Value must be a positive integer no greater than ${maximum}`);
  }
  return candidate;
};
```

Use it for message pages. Remove the hardcoded admin-secret fallback, fail closed when `ADMIN_SECRET_KEY` is missing, return string messages to custom error classes, and restrict CORS to configured origins with local development defaults.

- [ ] **Step 4: Run backend tests and syntax checks**

```bash
cd backend && npm test
find backend/src -name '*.js' -print0 | xargs -0 -n1 node --check
```

Expected: all backend tests pass and syntax validation exits with status 0.

- [ ] **Step 5: Commit backend guardrails**

```bash
git add backend/src/utils/requestValidation.js backend/tests/requestValidation.test.js backend/src/controllers/adminController.js backend/src/controllers/chatController.js backend/src/middlewares/authentication.js backend/src/constants/config.js
git commit -m "fix: enforce backend configuration and request limits"
```

### Task 5: Stable frontend chat state and socket lifecycle

**Files:**
- Create: `frontend/src/lib/chatState.js`
- Create: `frontend/tests/chatState.test.js`
- Modify: `frontend/src/Socket.jsx`
- Modify: `frontend/src/pages/Chat.jsx`
- Modify: `frontend/src/components/shared/MessageComponent.jsx`
- Modify: `frontend/src/hooks/hooks.js`
- Modify: `frontend/src/lib/features.js`

**Interfaces:**
- Consumes: message text, socket acknowledgement payloads, stored JSON, and `createdAt` timestamps.
- Produces: `normalizeMessageText(value)`, `formatMessageTime(value, now)`, `readStoredJson(storage, key, fallback)`, and stable socket cleanup behavior.

- [ ] **Step 1: Write failing pure frontend tests**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { formatMessageTime, normalizeMessageText, readStoredJson } from "../src/lib/chatState.js";

test("trims valid messages and rejects blank messages", () => {
  assert.equal(normalizeMessageText(" hello "), "hello");
  assert.equal(normalizeMessageText("   "), "");
});

test("formats createdAt without reading a missing timestamp property", () => {
  assert.equal(formatMessageTime("2026-08-26T09:59:00Z", new Date("2026-08-26T10:00:00Z")), "1 min ago");
});

test("returns a fallback for malformed stored JSON", () => {
  const storage = { getItem: () => "{broken" };
  assert.deepEqual(readStoredJson(storage, "alerts", []), []);
});
```

- [ ] **Step 2: Run tests and verify the missing module failure**

```bash
cd frontend && node --test tests/chatState.test.js
```

Expected: FAIL because `src/lib/chatState.js` does not exist.

- [ ] **Step 3: Implement helpers and connect them to the existing UI**

`SocketProvider` must create one socket per provider lifecycle and disconnect it in effect cleanup. `Chat.jsx` must use current callback dependencies, clear typing timers on send and unmount, send only normalized text, and surface negative acknowledgements with a toast. `MessageComponent` must format `message.createdAt`.

```js
export const normalizeMessageText = (value = "") => String(value).trim().slice(0, 2000);

export const readStoredJson = (storage, key, fallback) => {
  try {
    const value = storage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
};
```

- [ ] **Step 4: Run frontend unit tests and syntax-oriented lint where available**

```bash
cd frontend && node --test tests/chatState.test.js
cd frontend && npm run lint
```

Expected: frontend unit tests pass and lint reports no errors.

- [ ] **Step 5: Commit frontend chat reliability fixes**

```bash
git add frontend/src/lib/chatState.js frontend/tests/chatState.test.js frontend/src/Socket.jsx frontend/src/pages/Chat.jsx frontend/src/components/shared/MessageComponent.jsx frontend/src/hooks/hooks.js frontend/src/lib/features.js
git commit -m "fix: stabilize frontend chat lifecycle"
```

### Task 6: Responsive and accessible core interface

**Files:**
- Modify: `frontend/src/components/layout/AppLayout.jsx`
- Modify: `frontend/src/components/layout/Header.jsx`
- Modify: `frontend/src/components/specific/ChatList.jsx`
- Modify: `frontend/src/pages/Chat.jsx`
- Modify: `frontend/src/pages/AuthForm.jsx`
- Modify: `frontend/src/pages/Groups.jsx`
- Modify: `frontend/src/components/styles/StyledComponent.jsx`
- Modify: `frontend/src/components/dialogs/AddMemberDialoge.jsx`
- Modify: `frontend/src/components/dialogs/ConfrimDeleteDialoge.jsx`
- Modify: `frontend/src/components/dialogs/FileMenu.jsx`
- Modify: `frontend/src/pages/admin/ChatManagement.jsx`
- Modify: `frontend/src/pages/admin/MessagManagement.jsx`
- Modify: `frontend/src/pages/admin/UsersManagement.jsx`

**Interfaces:**
- Consumes: existing routes, Redux state, RTK Query data, and Material UI components.
- Produces: phone, tablet, and desktop layouts with accessible controls and explicit loading, empty, disabled, and error states.

- [ ] **Step 1: Record the existing responsive risks from the source**

```bash
rg -n '100vh|height=\{"90%"\}|width="75vw"|position: "absolute"|console\.log|TODO' frontend/src
```

Expected: fixed viewport sizing, debug output, and incomplete states are listed before changes.

- [ ] **Step 2: Refine the application shell and chat composer**

Use `100dvh`, `minHeight: 0`, and explicit scroll ownership. Keep the drawer below the header, use full width on small phones with a sensible maximum on larger screens, and provide `aria-label` values for menu, attachment, send, notification, profile, and destructive icon buttons.

The send button must be disabled for normalized empty input or a pending send. The message input must include a maximum length and an accessible label.

- [ ] **Step 3: Refine forms, dialogs, lists, groups, and tables**

Use responsive padding and widths, visible labels, bounded dialog content, scrollable long lists, descriptive empty states, and confirmation copy for destructive operations. Remove runtime debug logs. Preserve existing API calls and routes.

- [ ] **Step 4: Run React quality review, lint, and production build**

Review hook dependencies, effect cleanup, inline component definitions, accessible names, direct imports, and unnecessary rerenders using the React best-practices checklist.

```bash
cd frontend && npm run lint
cd frontend && npm run build
```

Expected: lint and build exit with status 0.

- [ ] **Step 5: Perform responsive inspection**

Inspect the login and reachable authenticated surfaces at approximately 390 px, 768 px, and 1440 px widths. Confirm there is no horizontal overflow, hidden primary action, cropped dialog, or inaccessible composer. Record blockers when backend credentials prevent an authenticated flow.

- [ ] **Step 6: Commit interface improvements**

```bash
git add frontend/src
git commit -m "feat: improve responsive chat interface"
```

### Task 7: Continuous integration and accurate documentation

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `README.MD`

**Interfaces:**
- Consumes: package scripts established in Task 1.
- Produces: repeatable CI checks for both packages and installation instructions that match the repository.

- [ ] **Step 1: Add CI for clean dependency installations**

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [backend, frontend]
    defaults:
      run:
        working-directory: ${{ matrix.project }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: ${{ matrix.project }}/package-lock.json
      - run: npm ci
      - run: npm test
      - if: matrix.project == 'frontend'
        run: npm run lint
      - if: matrix.project == 'frontend'
        run: npm run build
```

- [ ] **Step 2: Replace inaccurate README claims**

Document the real folder structure, Node prerequisites, backend and frontend installation, environment key names, ports 8000 and 5173, start commands, tests, lint, build, route groups, real-time behavior, and credential rotation warning. Remove Swagger and Helmet claims unless the final source implements them.

- [ ] **Step 3: Run complete local verification**

```bash
cd backend && npm ci && npm test
cd frontend && npm ci && npm test && npm run lint && npm run build
git diff --check
git status --short
```

Expected: all commands exit with status 0 and only intended changes remain.

- [ ] **Step 4: Commit CI and documentation**

```bash
git add .github/workflows/ci.yml README.MD
git commit -m "docs: add verified setup and continuous integration"
```

### Task 8: Final review and GitHub pull request

**Files:**
- Review: all files changed from `main` to `codex/production-hardening`

**Interfaces:**
- Consumes: completed commits and fresh verification evidence.
- Produces: pushed branch and a GitHub pull request targeting `main`.

- [ ] **Step 1: Review the complete change set**

```bash
git diff --stat main...HEAD
git diff --check main...HEAD
git log --oneline main..HEAD
```

Expected: generated-file cleanup is separated from functional commits and no whitespace errors exist.

- [ ] **Step 2: Run final tests, lint, build, and syntax checks again**

```bash
cd backend && npm test
cd frontend && npm test && npm run lint && npm run build
find backend -path 'backend/node_modules' -prune -o -name '*.js' -print0 | xargs -0 -n1 node --check
```

Expected: all checks pass with zero failures and zero lint errors.

- [ ] **Step 3: Push the branch and open a pull request**

Push `codex/production-hardening` and open a pull request titled `Production hardening for frontend and backend`. The body must summarize repository cleanup, backend fixes, frontend fixes, responsive improvements, test evidence, verification limits, and the owner's required credential rotation.
