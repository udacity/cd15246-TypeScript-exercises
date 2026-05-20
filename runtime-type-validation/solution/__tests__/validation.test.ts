import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Zod API Validation", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export UserSchema and ApiResponseSchema", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.ok(mod.UserSchema);
    assert.ok(mod.ApiResponseSchema);
  });

  it("should export User and ApiResponse types", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    // Types don't exist at runtime, so just check the module loads
    assert.ok(mod);
  });

  it("parseUserResponse should parse valid JSON", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const json = JSON.stringify({
      status: "ok",
      data: { id: 1, name: "Alice", email: "alice@test.com", role: "user" },
    });
    const result = mod.parseUserResponse(json);
    assert.equal(result.status, "ok");
    assert.equal(result.data?.name, "Alice");
  });

  it("parseUserResponse should throw on invalid data", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const json = JSON.stringify({ status: "ok", data: { id: "not-a-number", name: "Alice" } });
    assert.throws(() => mod.parseUserResponse(json));
  });

  it("safeParseUsers should return success for valid data", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const data = { id: 1, name: "Bob", email: "bob@test.com", role: "admin" };
    const result = mod.safeParseUsers(data);
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.email, "bob@test.com");
    }
  });

  it("safeParseUsers should return error for invalid data", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const data = { id: "invalid", name: 123 };
    const result = mod.safeParseUsers(data);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(typeof result.error === "string");
    }
  });
});
