import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Infrastructure Layer", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("InMemoryUserRepository should create and find users", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const repo = new mod.InMemoryUserRepository();
    
    const created = await repo.create({
      email: "test@test.com",
      password: "hashed_pass",
      name: "Test User",
    });
    
    const found = await repo.findById(created.id);
    assert.notEqual(found, null);
    assert.equal(found?.email, "test@test.com");
  });

  it("InMemoryUserRepository should find by email", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const repo = new mod.InMemoryUserRepository();
    
    await repo.create({ email: "a@test.com", password: "p1", name: "A" });
    const found = await repo.findByEmail("a@test.com");
    assert.notEqual(found, null);
    assert.equal(found?.name, "A");
  });

  it("InMemorySessionRepository should create and find sessions", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const repo = new mod.InMemorySessionRepository();
    
    const created = await repo.create({
      userId: "user-1",
      token: "tok_test",
      expiresAt: new Date(Date.now() + 86400000),
    });
    
    const found = await repo.findByToken("tok_test");
    assert.notEqual(found, null);
    assert.equal(found?.userId, "user-1");
  });

  it("InMemorySessionRepository should delete by userId", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const repo = new mod.InMemorySessionRepository();
    
    await repo.create({ userId: "user-1", token: "tok1", expiresAt: new Date() });
    await repo.create({ userId: "user-1", token: "tok2", expiresAt: new Date() });
    
    await repo.deleteByUserId("user-1");
    assert.equal(repo.all.length, 0);
  });

  it("createAppContainer should create a DI container", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const container = mod.createAppContainer();
    assert.ok(container.userRepository);
    assert.ok(container.sessionRepository);
  });
});
