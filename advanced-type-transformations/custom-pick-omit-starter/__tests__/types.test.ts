import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// ──────────────────────────────────────────────────
// Compile-time type assertions
// These look like regular code but will fail to
// compile if your type implementations are wrong.
// The tsc --noEmit check below catches any failures.
// ──────────────────────────────────────────────────

import type { MyPick, MyOmit, DeepReadonly, User, NestedConfig } from "../src/index.js";

// Type equality check: true only if T and U are exactly the same
type TypeEqual<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

// Triggers a compile error if the argument is not 'true'
function assertTrue<T extends true>() {}

// ───── MyPick<T, K> ─────

// Should pick the specified keys with correct value types
assertTrue<TypeEqual<
  MyPick<User, "id" | "name">,
  { id: number; name: string }
>>();

// Picking a single key
assertTrue<TypeEqual<
  MyPick<User, "email">,
  { email: string }
>>();

// Picking all keys should equal the original type
assertTrue<TypeEqual<MyPick<User, keyof User>, User>>();

// Rejects invalid keys — requires K extends keyof T constraint
// @ts-expect-error — MyPick should not accept keys that don't exist on T
type _PickInvalid = MyPick<User, "nonexistent">;

// ───── MyOmit<T, K> ─────

// Should exclude the specified keys
assertTrue<TypeEqual<
  MyOmit<User, "email">,
  { id: number; name: string; role: string }
>>();

// Omitting multiple keys
assertTrue<TypeEqual<
  MyOmit<User, "id" | "name">,
  { email: string; role: string }
>>();

// Omitting nothing keeps all keys
assertTrue<TypeEqual<MyOmit<User, never>, User>>();

// Omitting all keys gives empty object
assertTrue<TypeEqual<MyOmit<User, "id" | "name" | "email" | "role">, {}>>();

// Rejects invalid keys — requires K extends keyof T constraint
// @ts-expect-error — MyOmit should not accept keys that don't exist on T
type _OmitInvalid = MyOmit<User, "nonexistent">;

// ───── DeepReadonly<T> ─────

// Makes all top-level properties readonly
const _ro: DeepReadonly<{ a: string; b: number }> = { a: "hi", b: 42 };
// @ts-expect-error — property 'a' should be readonly
_ro.a = "world";
// @ts-expect-error — property 'b' should be readonly
_ro.b = 99;

// Recurse into nested objects
const _deep: DeepReadonly<NestedConfig> = {
  host: "localhost",
  port: 3000,
  credentials: { username: "admin", password: "secret" },
};
// @ts-expect-error — nested property 'username' should be readonly
_deep.credentials.username = "hacker";

// Does NOT recurse into arrays (arrays are not Record<string, unknown>)
type ConfigWithArray = { items: string[]; meta: { count: number } };
const _arr: DeepReadonly<ConfigWithArray> = {
  items: ["a", "b"],
  meta: { count: 2 },
};
// Top-level array property IS readonly
// @ts-expect-error — 'items' should be readonly
_arr.items = ["c"];
// But the array itself is NOT deeply readonly — this should compile
_arr.items.push("c");
// Nested meta properties ARE readonly
// @ts-expect-error — 'meta.count' should be readonly
_arr.meta.count = 5;

// ──────────────────────────────────────────────────
// Runtime test: verify the code compiles cleanly
// ──────────────────────────────────────────────────

describe("Custom Type Transformations", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      const stdout = (e as { stdout?: Buffer }).stdout?.toString() || "";
      // If this fails, check the type assertions above —
      // your implementation probably doesn't satisfy one of them
      assert.fail(`TypeScript compilation failed. This means one of the type assertions in this file was not satisfied.\n\n${stderr}\n${stdout}`);
    }
  });
});
