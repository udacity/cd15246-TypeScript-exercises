import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// Strip single-line comments from JSON (TypeScript tsconfig uses JSONC)
function stripJsonComments(json: string): string {
  return json.replace(/\/\/.*$/gm, "");
}

describe("TypeScript Configuration", () => {
  it("should have a valid tsconfig.json", () => {
    const configPath = join(projectRoot, "tsconfig.json");
    assert.ok(existsSync(configPath), "tsconfig.json must exist");

    const raw = readFileSync(configPath, "utf-8");
    const config = JSON.parse(stripJsonComments(raw));
    const opts = config.compilerOptions;

    assert.equal(opts.module, "nodenext", 'module must be "nodenext"');
    assert.equal(
      opts.moduleResolution,
      "nodenext",
      'moduleResolution must be "nodenext"'
    );
    assert.equal(opts.target, "ES2022", 'target must be "ES2022"');
    assert.equal(opts.strict, true, "strict must be true");
    assert.equal(opts.outDir, "./dist", 'outDir must be "./dist"');
    assert.equal(opts.rootDir, "./src", 'rootDir must be "./src"');
    assert.equal(opts.esModuleInterop, true, "esModuleInterop must be true");
    assert.ok(
      opts.types?.includes("node"),
      'types must include "node"'
    );
  });

  it("should compile without type errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`TypeScript compilation failed:\n${stderr}`);
    }
  });

  it("should output compiled JS to dist folder", () => {
    // Clean previous build
    execSync("npx tsc", { cwd: projectRoot, stdio: "pipe" });

    const distPath = join(projectRoot, "dist", "index.js");
    assert.ok(
      existsSync(distPath),
      "dist/index.js must exist after compilation"
    );
  });
});
