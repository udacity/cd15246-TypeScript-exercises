import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { fetchData, createUrl } from "../src/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// ─────────────────────────────────────────────────────────────
// Overload detection via compile-time assertions
//
// The _compileTimeChecks function below uses @ts-expect-error
// on call patterns that should be REJECTED when overloads exist.
//
//   WITHOUT overloads: the implementation's optional param
//   accepts `undefined`, making @ts-expect-error UNUSED →
//   tsc error → test fails.
//
//   WITH overloads: no overload accepts `undefined`, so the
//   expect-error directive fires as expected → tsc passes → test passes.
// ─────────────────────────────────────────────────────────────

function _compileTimeChecks(): void {
  // fetchData without overloads accepts undefined via optional param
  // With overloads, no overload accepts bare undefined
  // @ts-expect-error — overloads reject undefined
  fetchData("/test", undefined);

  // @ts-expect-error — overloads don't accept boolean
  fetchData("/test", true);

  // @ts-expect-error — overloads don't accept plain objects
  fetchData("/test", {});

  // @ts-expect-error — createUrl overloads require string path
  createUrl("a", undefined);

  // @ts-expect-error — createUrl doesn't accept 3 args
  createUrl("a", "b", "c");

  // @ts-expect-error — createUrl doesn't accept number as path
  createUrl("a", 1);
}

// ─────────────────────────────────────────────────────────────
// Test: compiles only if overload signatures are present
// ─────────────────────────────────────────────────────────────

describe("Function Overloads", () => {
  it("should have overload signatures that reject invalid calls", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(
        `Overload signatures are missing or incorrect.\n\n` +
        `Expected: overloads that reject undefined / boolean / extra args.\n` +
        `The implementation currently accepts these via optional params.\n` +
        `Add explicit overload signatures in src/index.ts to constrain the call patterns.\n\n${stderr}`
      );
    }
  });
});
