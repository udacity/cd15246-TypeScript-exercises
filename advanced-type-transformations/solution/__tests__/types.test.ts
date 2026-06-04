import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

import type { MyPick, MyOmit, DeepReadonly, User, NestedConfig } from "../src/index.js";

type TypeEqual<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;
function assertTrue<T extends true>() {}

// ───── MyPick ─────
assertTrue<TypeEqual<MyPick<User, "id" | "name">, { id: number; name: string }>>();
assertTrue<TypeEqual<MyPick<User, "email">, { email: string }>>();
assertTrue<TypeEqual<MyPick<User, keyof User>, User>>();
// @ts-expect-error
type _PickInvalid = MyPick<User, "nonexistent">;

// ───── MyOmit ─────
assertTrue<TypeEqual<MyOmit<User, "email">, { id: number; name: string; role: string }>>();
assertTrue<TypeEqual<MyOmit<User, "id" | "name">, { email: string; role: string }>>();
assertTrue<TypeEqual<MyOmit<User, never>, User>>();
assertTrue<TypeEqual<MyOmit<User, "id" | "name" | "email" | "role">, {}>>();
// @ts-expect-error
type _OmitInvalid = MyOmit<User, "nonexistent">;

// ───── DeepReadonly ─────
const _ro: DeepReadonly<{ a: string; b: number }> = { a: "hi", b: 42 };
// @ts-expect-error
_ro.a = "world";
// @ts-expect-error
_ro.b = 99;

const _deep: DeepReadonly<NestedConfig> = {
  host: "localhost", port: 3000,
  credentials: { username: "admin", password: "secret" },
};
// @ts-expect-error
_deep.credentials.username = "hacker";

type ConfigWithArray = { items: string[]; meta: { count: number } };
const _arr: DeepReadonly<ConfigWithArray> = { items: ["a", "b"], meta: { count: 2 } };
// @ts-expect-error
_arr.items = ["c"];
_arr.items.push("c");
// @ts-expect-error
_arr.meta.count = 5;

describe("Solution: Custom Type Transformations", () => {
  it("should compile without errors (all type assertions pass)", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });
});
