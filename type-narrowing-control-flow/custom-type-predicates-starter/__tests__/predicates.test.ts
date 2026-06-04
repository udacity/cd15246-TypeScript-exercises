import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isStringArray,
  isUserObject,
  isValidEmail,
  processData,
} from "../src/index.ts";

describe("isStringArray", () => {
  it("should distinguish string arrays from other values", () => {
    assert.equal(isStringArray(["a", "b", "c"]), true);
    assert.equal(isStringArray([]), true);
    assert.equal(isStringArray([1, "b"]), false);
    assert.equal(isStringArray("hello"), false);
    assert.equal(isStringArray(null), false);
  });
});

describe("isUserObject", () => {
  it("should validate correct user objects and reject invalid ones", () => {
    assert.equal(isUserObject({ id: 1, name: "Alice" }), true);
    assert.equal(isUserObject({ name: "Alice" }), false);
    assert.equal(isUserObject({ id: 1 }), false);
    assert.equal(isUserObject({ id: "1", name: "Alice" }), false);
    assert.equal(isUserObject(null), false);
    assert.equal(isUserObject(42), false);
  });
});

describe("isValidEmail", () => {
  it("should validate correct emails and reject malformed ones", () => {
    assert.equal(isValidEmail("user@example.com"), true);
    assert.equal(isValidEmail("userexample.com"), false);
    assert.equal(isValidEmail("@example.com"), false);
    assert.equal(isValidEmail("user@"), false);
  });
});

describe("processData", () => {
  it('should return "User: <name>" for a valid user object', () => {
    assert.equal(processData({ id: 1, name: "Alice" }), "User: Alice");
  });

  it('should return "String array with <count> items" for a string array', () => {
    assert.equal(processData(["hello", "world"]), "String array with 2 items");
  });

  it('should return "String array with 0 items" for an empty array', () => {
    assert.equal(processData([]), "String array with 0 items");
  });

  it('should return "Unknown data" for non-matching types', () => {
    assert.equal(processData(42), "Unknown data");
    assert.equal(processData(null), "Unknown data");
  });
});
