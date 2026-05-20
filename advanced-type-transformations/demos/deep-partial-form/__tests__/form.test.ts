import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Deep Partial Form Demo", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      const stdout = (e as { stdout?: Buffer }).stdout?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}\n${stdout}`);
    }
  });

  it("should export toFormState function", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.toFormState, "function");
  });

  it("should export applyPartial function", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.applyPartial, "function");
  });

  it("toFormState converts values to strings", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.toFormState({ name: "Alice", age: 30 });
    assert.equal(result.name, "Alice");
    assert.equal(result.age, "30");
  });

  it("applyPartial merges partial updates", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const original = {
      name: "Alice",
      email: "alice@example.com",
      age: 30,
      settings: { theme: "light" as const, notifications: true },
    };
    const updated = mod.applyPartial(original, { name: "Bob" });
    assert.equal(updated.name, "Bob");
    assert.equal(updated.email, "alice@example.com");
  });

  it("applyPartial handles nested updates", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const original = {
      name: "Alice",
      email: "alice@example.com",
      age: 30,
      settings: { theme: "light" as const, notifications: true },
    };
    const updated = mod.applyPartial(original, {
      settings: { theme: "dark" },
    });
    assert.equal((updated.settings as { theme: string }).theme, "dark");
    assert.equal(
      (updated.settings as { notifications: boolean }).notifications,
      true
    );
  });
});
