import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Zod Form Validation", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export RegistrationSchema, LoginSchema, validateRegistration, validateLogin", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.ok(mod.RegistrationSchema);
    assert.ok(mod.LoginSchema);
    assert.ok(mod.validateRegistration);
    assert.ok(mod.validateLogin);
  });

  it("RegistrationSchema should validate valid data", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.RegistrationSchema.safeParse({
      name: "Alice",
      email: "alice@test.com",
      password: "Secure1Pass",
      confirmPassword: "Secure1Pass",
    });
    assert.equal(result.success, true);
  });

  it("RegistrationSchema should reject short passwords", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.RegistrationSchema.safeParse({
      name: "Bob",
      email: "bob@test.com",
      password: "Ab1",
      confirmPassword: "Ab1",
    });
    assert.equal(result.success, false);
  });

  it("RegistrationSchema should reject mismatched passwords", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.RegistrationSchema.safeParse({
      name: "Carol",
      email: "carol@test.com",
      password: "StrongP1ss",
      confirmPassword: "StrongP2ss",
    });
    assert.equal(result.success, false);
  });

  it("LoginSchema should validate valid data", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.LoginSchema.safeParse({
      email: "dave@test.com",
      password: "password",
    });
    assert.equal(result.success, true);
  });

  it("LoginSchema should apply default for rememberMe", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.LoginSchema.parse({
      email: "eve@test.com",
      password: "pwd123",
    });
    assert.equal(result.rememberMe, false);
  });

  it("validateRegistration should return formatted result", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const data = {
      name: "Frank",
      email: "frank@test.com",
      password: "FrankP1ss",
      confirmPassword: "FrankP1ss",
    };
    const result = mod.validateRegistration(data);
    assert.ok("success" in result);
    assert.ok(result.success);
  });

  it("validateLogin should return formatted result", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const data = { email: "grace@test.com", password: "pass" };
    const result = mod.validateLogin(data);
    assert.ok("success" in result);
    assert.ok(result.success);
  });
});
