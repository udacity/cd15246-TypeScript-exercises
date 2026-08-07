import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import type { AppConfig } from "../src/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Type-Safe Config Store", () => {
  it("should compile with noPropertyAccessFromIndexSignature enabled", () => {
    // Enforces the type-level learning objective: getConfigValue and
    // setConfigValue must use bracket notation against the index signature.
    // A solution that casts or skips the index signature fails here.
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(
        `TypeScript compilation failed. Add the index signature to AppConfig and use bracket notation.\n${stderr}`
      );
    }
  });

  it("setConfigValue stores a value and getConfigValue retrieves it", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const config: AppConfig = {
      appName: "MyApp",
      version: "1.0.0",
    };
    mod.setConfigValue(config, "theme", "dark");
    assert.equal(mod.getConfigValue(config, "theme"), "dark");
  });

  it("setConfigValue overwrites existing values", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const config: AppConfig = {
      appName: "MyApp",
      version: "1.0.0",
      maxUsers: 10,
    };
    mod.setConfigValue(config, "maxUsers", 100);
    assert.equal(mod.getConfigValue(config, "maxUsers"), 100);
  });

  it("should accept string, number, and boolean values", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const config: AppConfig = {
      appName: "MyApp",
      version: "1.0.0",
    };
    mod.setConfigValue(config, "debug", true);
    mod.setConfigValue(config, "port", 3000);
    mod.setConfigValue(config, "env", "production");
    assert.equal(mod.getConfigValue(config, "debug"), true);
    assert.equal(mod.getConfigValue(config, "port"), 3000);
    assert.equal(mod.getConfigValue(config, "env"), "production");
  });
});
