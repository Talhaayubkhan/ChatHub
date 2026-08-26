import test from "node:test";
import assert from "node:assert/strict";

import { parsePositiveInteger } from "../src/utils/requestValidation.js";

test("normalizes a positive integer within its maximum", () => {
  assert.equal(parsePositiveInteger("3", 1, 100), 3);
});

test("uses the fallback when the value is missing", () => {
  assert.equal(parsePositiveInteger(undefined, 1, 100), 1);
});

test("rejects zero, negatives, decimals, text, and values above the maximum", () => {
  for (const value of ["0", "-1", "1.5", "abc", "101"]) {
    assert.throws(
      () => parsePositiveInteger(value, 1, 100),
      /positive integer/i
    );
  }
});

test("rejects an invalid fallback instead of hiding configuration errors", () => {
  assert.throws(
    () => parsePositiveInteger(undefined, 0, 100),
    /positive integer/i
  );
});
