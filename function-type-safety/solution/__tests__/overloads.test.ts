import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { fetchData, createUrl } from "../src/index.ts";

describe("fetchData overloads", () => {
  it("exists and returns a Promise", () => {
    const result = fetchData("/test");
    assert.ok(result instanceof Promise);
  });

  it("resolves to the expected string with no params", async () => {
    const result = await fetchData("/test");
    assert.equal(result, "Response from /test");
  });

  it("accepts a timeout number parameter", async () => {
    const result = await fetchData("/test", 100);
    assert.equal(result, "Response from /test");
  });

  it("accepts an AbortSignal parameter", async () => {
    const controller = new AbortController();
    const result = await fetchData("/test", controller.signal);
    assert.equal(result, "Response from /test");
  });
});

describe("createUrl overloads", () => {
  it("returns /api/ path with a single argument", () => {
    assert.equal(createUrl("users"), "/api/users");
  });

  it("strips leading slash from single argument", () => {
    assert.equal(createUrl("/users"), "/api/users");
  });

  it("combines base and path with two arguments", () => {
    assert.equal(createUrl("https://api.example.com", "/users"), "https://api.example.com/users");
  });

  it("strips trailing slash from base with two arguments", () => {
    assert.equal(createUrl("https://api.example.com/", "users"), "https://api.example.com/users");
  });
});

// Compile-time checks: the following lines would fail to compile
// with wrong types — wrapped in a function that is never called
// to verify TypeScript rejects invalid overload usage.
function _compileTimeChecks(): void {
  // TypeScript should reject passing boolean as second arg
  // @ts-expect-error — boolean not assignable to parameter type
  fetchData("/test", true);

  // TypeScript should reject passing object without AbortSignal
  // @ts-expect-error — plain object not assignable
  fetchData("/test", {});

  // TypeScript should reject createUrl with three args
  // @ts-expect-error — 3 args not allowed
  createUrl("a", "b", "c");

  // TypeScript should reject createUrl with number second arg
  // @ts-expect-error — number not assignable to string
  createUrl("a", 1);
}
