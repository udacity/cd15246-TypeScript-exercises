import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import type { MyPick, MyOmit, DeepReadonly, User, NestedConfig } from "../src/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// ──────────────────────────────────────────────────
// Type equality helper
// ──────────────────────────────────────────────────

type TypeEqual<A, B> = A extends B ? (B extends A ? true : false) : false;

// Triggers a compile error if the argument is not 'true'
const assertTrue = <T extends true>(): void => {};

// ──────────────────────────────────────────────────
// Compile-time type assertions
// These look like regular code but will fail to
// compile if your type implementations are wrong.
// The tsc --noEmit check below catches any failures.
// ──────────────────────────────────────────────────

interface ConfigWithArray {
  items: string[];
  meta: { count: number };
}

// ───── MyPick ─────
assertTrue<TypeEqual<MyPick<User, "id" | "name">, { id: number; name: string }>>();
assertTrue<TypeEqual<MyPick<User, "email">, { email: string }>>();
assertTrue<TypeEqual<MyPick<User, keyof User>, User>>();

// Rejects invalid keys — requires K extends keyof T constraint
// @ts-expect-error
type _MyPickInvalid = MyPick<User, "nonexistent">;

// ───── MyOmit ─────
assertTrue<TypeEqual<MyOmit<User, "email">, { id: number; name: string; role: string }>>();
assertTrue<TypeEqual<MyOmit<User, "id" | "name">, { email: string; role: string }>>();
assertTrue<TypeEqual<MyOmit<User, never>, User>>();
assertTrue<TypeEqual<MyOmit<User, "id" | "name" | "email" | "role">, {}>>();

// Rejects invalid keys — requires K extends keyof T constraint
// @ts-expect-error
type _MyOmitInvalid = MyOmit<User, "nonexistent">;

// ───── DeepReadonly ─────
const _ro: DeepReadonly<{ a: string; b: number }> = { a: "hello", b: 42 };
// @ts-expect-error
_ro.a = "world";
// @ts-expect-error
_ro.b = 99;

const _deep: DeepReadonly<NestedConfig> = { host: "localhost", port: 3000, credentials: { username: "admin", password: "secret" } };
// @ts-expect-error
_deep.host = "prod";
// @ts-expect-error
_deep.port = 8080;
// @ts-expect-error
_deep.credentials.username = "hacker";
// @ts-expect-error
_deep.credentials.password = "leaked";

const _arr: DeepReadonly<ConfigWithArray> = { items: ["a", "b"], meta: { count: 2 } };
// @ts-expect-error
_arr.items = ["c"];
_arr.items.push("c"); // arrays are NOT deeply readonly — should compile
// @ts-expect-error
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
      // If this fails, one of the type assertions above was not satisfied
      assert.fail(
        `TypeScript compilation failed — one or more type assertions were not satisfied.\n${stderr}${stdout}`
      );
    }
  });
});
