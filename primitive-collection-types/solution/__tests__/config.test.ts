import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Type-Safe Config Store", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should have noPropertyAccessFromIndexSignature enabled", () => {
    const config = JSON.parse(
      readFileSync(join(projectRoot, "tsconfig.json"), "utf-8")
    );
    assert.equal(
      config.compilerOptions.noPropertyAccessFromIndexSignature,
      true
    );
  });

  it("should export getConfigValue and setConfigValue", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.getConfigValue, "function");
    assert.equal(typeof mod.setConfigValue, "function");
  });

  it("getConfigValue should return value for known keys", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const config: Record<string, string | number | boolean> = {
      appName: "MyApp",
      version: "1.0.0",
    };
    const result = mod.getConfigValue(config as any, "appName");
    assert.equal(result, "MyApp");
  });

  it("setConfigValue should update a value", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const config: Record<string, string | number | boolean> = {
      appName: "MyApp",
      version: "1.0.0",
    };
    mod.setConfigValue(config as any, "appName", "NewApp");
    assert.equal(config.appName, "NewApp");
  });
});
