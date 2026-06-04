import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { fetchData, createUrl } from "../src/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

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

describe("compile-time checks", () => {
  it("should reject calls that violate overload signatures", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed — overload signatures may be missing:\n${stderr}`);
    }
  });
});

// Compile-time checks verify TypeScript rejects invalid overload usage.
// The @ts-expect-error + undefined pattern detects whether overloads exist:
//   - WITHOUT overloads: undefined is accepted by the implementation's
//     optional param, so @ts-expect-error is UNUSED → tsc error
//   - WITH overloads: undefined is rejected by all overloads,
//     so @ts-expect-error is properly used.
function _compileTimeChecks(): void {
  // @ts-expect-error — undefined not assignable to any overload signature
  fetchData("/test", undefined);

  // @ts-expect-error — boolean not assignable to parameter type
  fetchData("/test", true);

  // @ts-expect-error — plain object not assignable
  fetchData("/test", {});

  // @ts-expect-error — undefined not assignable to string
  createUrl("a", undefined);

  // @ts-expect-error — 3 args not allowed
  createUrl("a", "b", "c");

  // @ts-expect-error — number not assignable to string
  createUrl("a", 1);
}
