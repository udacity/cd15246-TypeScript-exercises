import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isStringArray,
  isUserObject,
  isValidEmail,
  processData,
} from "../src/index.ts";

describe("isStringArray", () => {
  it("returns true for a string array", () => {
    assert.equal(isStringArray(["a", "b", "c"]), true);
  });

  it("returns false for a mixed array", () => {
    assert.equal(isStringArray([1, "b"]), false);
  });

  it("returns false for a non-array value", () => {
    assert.equal(isStringArray("hello"), false);
  });

  it("returns false for null", () => {
    assert.equal(isStringArray(null), false);
  });

  it("returns false for an empty array", () => {
    assert.equal(isStringArray([]), true);
  });
});

describe("isUserObject", () => {
  it("returns true for a valid user object", () => {
    assert.equal(isUserObject({ id: 1, name: "Alice" }), true);
  });

  it("returns false when id is missing", () => {
    assert.equal(isUserObject({ name: "Alice" }), false);
  });

  it("returns false when name is missing", () => {
    assert.equal(isUserObject({ id: 1 }), false);
  });

  it("returns false when id is not a number", () => {
    assert.equal(isUserObject({ id: "1", name: "Alice" }), false);
  });

  it("returns false for null", () => {
    assert.equal(isUserObject(null), false);
  });

  it("returns false for a primitive value", () => {
    assert.equal(isUserObject(42), false);
  });
});

describe("isValidEmail", () => {
  it("returns true for a valid email", () => {
    assert.equal(isValidEmail("user@example.com"), true);
  });

  it("returns false when @ is missing", () => {
    assert.equal(isValidEmail("userexample.com"), false);
  });

  it("returns false when nothing before @", () => {
    assert.equal(isValidEmail("@example.com"), false);
  });

  it("returns false when nothing after @", () => {
    assert.equal(isValidEmail("user@"), false);
  });
});

describe("processData", () => {
  it('returns "User: <name>" for a valid user object', () => {
    assert.equal(processData({ id: 1, name: "Alice" }), "User: Alice");
  });

  it('returns "String array with <count> items" for a string array', () => {
    assert.equal(
      processData(["hello", "world"]),
      "String array with 2 items"
    );
  });

  it('returns "String array with 0 items" for an empty array', () => {
    assert.equal(processData([]), "String array with 0 items");
  });

  it('returns "Unknown data" for a primitive', () => {
    assert.equal(processData(42), "Unknown data");
  });

  it('returns "Unknown data" for null', () => {
    assert.equal(processData(null), "Unknown data");
  });
});
