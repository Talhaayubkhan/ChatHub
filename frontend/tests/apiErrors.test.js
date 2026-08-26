import assert from "node:assert/strict";
import test from "node:test";

import { getApiErrorMessage } from "../src/lib/apiErrors.js";

test("prefers a useful API error message", () => {
  const error = {
    response: { status: 401, data: { message: "Account is disabled" } },
  };

  assert.equal(
    getApiErrorMessage(error, { 401: "Incorrect username or password" }),
    "Account is disabled"
  );
});

test("uses a status-specific fallback when the API has no message", () => {
  const error = { response: { status: 500, data: {} } };

  assert.equal(
    getApiErrorMessage(error, { 500: "Server error" }),
    "Server error"
  );
});

test("uses the generic fallback for network and unknown errors", () => {
  assert.equal(
    getApiErrorMessage(new Error("Network failed"), {}, "Please try again"),
    "Please try again"
  );
});
