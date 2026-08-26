import test from "node:test";
import assert from "node:assert/strict";

import { toErrorResponse } from "../src/utils/errorResponse.js";

test("preserves the status and message of an operational error", () => {
  const error = new Error("You cannot access this chat");
  error.statusCode = 403;

  assert.deepEqual(toErrorResponse(error), {
    statusCode: 403,
    body: { success: false, message: "You cannot access this chat" },
  });
});

test("does not expose an unexpected internal error message", () => {
  assert.deepEqual(toErrorResponse(new Error("database password leaked")), {
    statusCode: 500,
    body: {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    },
  });
});

test("uses a safe fallback when an operational message is empty", () => {
  const error = new Error("");
  error.statusCode = 400;

  assert.deepEqual(toErrorResponse(error), {
    statusCode: 400,
    body: { success: false, message: "Request failed" },
  });
});
