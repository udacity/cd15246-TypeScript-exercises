import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Discriminated User Roles", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export all required functions", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.getDisplayName, "function");
    assert.equal(typeof mod.hasPermission, "function");
    assert.equal(typeof mod.isActive, "function");
  });

  it("getDisplayName should return name for User", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const user = { role: "user", id: 1, name: "Alice", email: "a@test.com" };
    assert.equal(mod.getDisplayName(user), "Alice");
  });

  it("getDisplayName should return name for Admin", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const admin = {
      role: "admin",
      id: 2,
      name: "Bob",
      permissions: ["read", "write"] as string[],
    };
    assert.equal(mod.getDisplayName(admin), "Bob");
  });

  it("getDisplayName should return Guest for guest", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const guest = {
      role: "guest",
      sessionId: "abc123",
      expiresAt: new Date(Date.now() + 3600000),
    };
    assert.equal(mod.getDisplayName(guest), "Guest");
  });

  it("hasPermission should check admin permissions", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const admin = {
      role: "admin",
      id: 2,
      name: "Bob",
      permissions: ["read", "write"] as string[],
    };
    assert.equal(mod.hasPermission(admin, "read"), true);
    assert.equal(mod.hasPermission(admin, "delete"), false);
  });

  it("hasPermission should return false for non-admins", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const user = { role: "user", id: 1, name: "Alice", email: "a@test.com" };
    assert.equal(mod.hasPermission(user, "read"), false);
  });

  it("isActive should check guest expiry", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const activeGuest = {
      role: "guest",
      sessionId: "abc123",
      expiresAt: new Date(Date.now() + 3600000),
    };
    const expiredGuest = {
      role: "guest",
      sessionId: "def456",
      expiresAt: new Date(Date.now() - 3600000),
    };
    assert.equal(mod.isActive(activeGuest), true);
    assert.equal(mod.isActive(expiredGuest), false);
  });
});
