import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Domain Layer", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export use cases", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.RegisterUserUseCase, "function");
    assert.equal(typeof mod.LoginUserUseCase, "function");
  });

  it("hashPassword should produce a hashed string", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const hash = mod.hashPassword("mypassword");
    assert.notEqual(hash, "mypassword");
    assert.ok(hash.startsWith("hashed_"));
  });

  it("verifyPassword should match correctly", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const hash = mod.hashPassword("mypassword");
    assert.equal(mod.verifyPassword("mypassword", hash), true);
    assert.equal(mod.verifyPassword("wrong", hash), false);
  });
});
