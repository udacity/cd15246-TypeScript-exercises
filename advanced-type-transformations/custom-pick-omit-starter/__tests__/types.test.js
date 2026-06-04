import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
// Triggers a compile error if the argument is not 'true'
const assertTrue = () => { };
// ───── MyPick ─────
assertTrue();
assertTrue();
assertTrue();
// ───── MyOmit ─────
assertTrue();
assertTrue();
assertTrue();
assertTrue();
// ───── DeepReadonly ─────
const _ro = { a: "hello", b: 42 };
// @ts-expect-error
_ro.a = "world";
// @ts-expect-error
_ro.b = 99;
const _deep = { host: "localhost", port: 3000 };
// @ts-expect-error
_deep.host = "prod";
// @ts-expect-error
_deep.port = 8080;
const _arr = { items: ["a", "b"], meta: { count: 2 } };
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
        }
        catch (e) {
            const stderr = e.stderr?.toString() || "";
            const stdout = e.stdout?.toString() || "";
            // If this fails, one of the type assertions above was not satisfied
            assert.fail(`TypeScript compilation failed — one or more type assertions were not satisfied.\n${stderr}${stdout}`);
        }
    });
});
