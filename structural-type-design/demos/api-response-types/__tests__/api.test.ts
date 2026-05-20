import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("API Response Types Demo", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("handleResponse should handle success", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const res = {
      status: "success" as const,
      data: { id: 1, name: "test" },
      timestamp: new Date(),
    };
    const result = mod.handleResponse(res);
    assert.ok(result.includes("Got data"));
  });

  it("handleResponse should handle error", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const res = {
      status: "error" as const,
      message: "Not found",
      code: 404,
    };
    const result = mod.handleResponse(res);
    assert.ok(result.includes("Error 404"));
  });

  it("handleResponse should handle loading", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const res = { status: "loading" as const };
    const result = mod.handleResponse(res);
    assert.equal(result, "Loading...");
  });
});
