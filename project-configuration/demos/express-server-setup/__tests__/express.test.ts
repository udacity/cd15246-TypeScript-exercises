import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Express Server Setup Demo", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export app and getQueryParam", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.ok(mod.app);
    assert.equal(typeof mod.getQueryParam, "function");
  });

  it("should have strict mode enabled", () => {
    const config = JSON.parse(
      readFileSync(join(projectRoot, "tsconfig.json"), "utf-8")
    );
    assert.equal(config.compilerOptions.strict, true);
  });

  it("should produce compiled output in dist", () => {
    execSync("npx tsc", { cwd: projectRoot, stdio: "pipe" });
    assert.ok(existsSync(join(projectRoot, "dist", "index.js")));
  });
});
