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

  it("should export schemas with field definitions", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.ok(mod.UserSchema, "UserSchema must be exported");
    assert.ok(mod.ApiResponseSchema, "ApiResponseSchema must be exported");

    // Verify UserSchema actually validates: a valid user object passes
    const validUser = { id: 1, name: "Alice", email: "alice@test.com", role: "user" };
    const validResult = mod.UserSchema.safeParse(validUser);
    assert.equal(validResult.success, true, "UserSchema should accept valid user data");

    // Verify UserSchema rejects: invalid types fail validation
    const invalidUser = { id: "not-a-number", name: 42 };
    const invalidResult = mod.UserSchema.safeParse(invalidUser);
    assert.equal(invalidResult.success, false, "UserSchema should reject invalid data");
  });

  it("ApiResponseSchema should define status and data fields", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const validResponse = {
      status: "ok",
      data: { id: 1, name: "Alice", email: "alice@test.com", role: "user" },
    };
    const result = mod.ApiResponseSchema.safeParse(validResponse);
    assert.equal(result.success, true, "ApiResponseSchema should accept valid response");

    // Also verify it rejects structurally invalid responses
    const invalidResponse = { status: 123, data: "not-an-object" };
    const invalidResult = mod.ApiResponseSchema.safeParse(invalidResponse);
    assert.equal(invalidResult.success, false, "ApiResponseSchema should reject invalid response");
  });

  it("parseUserResponse should throw on invalid data", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const json = JSON.stringify({
      status: "ok",
      data: { id: "not-a-number", name: "Alice" },
    });
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

  it("safeParseUsers should return field-specific error for invalid data", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const data = { id: "invalid", name: 123 };
    const result = mod.safeParseUsers(data);
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(typeof result.error === "string", "Error must be a string");
      // Zod error messages contain the field name that failed validation
      assert.ok(
        result.error.includes("id") || result.error.includes("name"),
        "Error should reference the invalid fields (id or name)"
      );
    }
  });
});
