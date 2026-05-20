import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("tRPC-style API Setup", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export createProcedure and callProcedure", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.ok(typeof mod.createProcedure === "function");
    assert.ok(typeof mod.callProcedure === "function");
  });

  it("getUserById should return matching user", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const user = mod.callProcedure(mod.getUserById, { id: 1 });
    assert.equal(user?.name, "Alice");
  });

  it("getUserById should return null for missing user", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const user = mod.callProcedure(mod.getUserById, { id: 999 });
    assert.equal(user, null);
  });

  it("listUsers should return all users", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const allUsers = mod.callProcedure(mod.listUsers, undefined);
    assert.equal(allUsers.length, 2);
    assert.equal(allUsers[0].name, "Alice");
    assert.equal(allUsers[1].name, "Bob");
  });

  it("createUser should add and return new user", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const newUser = mod.callProcedure(mod.createUser, {
      name: "Charlie",
      email: "charlie@test.com",
    });
    assert.equal(newUser.name, "Charlie");
    assert.equal(newUser.email, "charlie@test.com");
    assert.equal(newUser.id, 3);
  });

  it("Procedure metadata should be correct", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(mod.getUserById.type, "query");
    assert.equal(mod.getUserById.name, "user.getById");
    assert.equal(mod.listUsers.type, "query");
    assert.equal(mod.createUser.type, "mutation");
    assert.equal(mod.createUser.name, "user.create");
  });
});
