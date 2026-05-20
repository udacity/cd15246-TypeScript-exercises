import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("GenericCache Solution", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("GenericCache with strings should store and retrieve values", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const cache = new mod.GenericCache<string>(3);
    cache.set("a", "alpha");
    cache.set("b", "beta");
    assert.equal(cache.get("a"), "alpha");
    assert.equal(cache.get("b"), "beta");
  });

  it("GenericCache with numbers should work independently", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const cache = new mod.GenericCache<number>(3);
    cache.set("x", 42);
    cache.set("y", 100);
    assert.equal(cache.get("x"), 42);
    assert.equal(cache.get("y"), 100);
  });

  it("GenericCache should evict oldest entry when over maxSize", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const cache = new mod.GenericCache<string>(2);
    cache.set("a", "alpha");
    cache.set("b", "beta");
    cache.set("c", "gamma");
    assert.equal(cache.get("a"), undefined);
    assert.equal(cache.get("b"), "beta");
    assert.equal(cache.get("c"), "gamma");
  });

  it("createUserCache should return a properly typed cache", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const userCache = mod.createUserCache(5);
    const user: mod.User = { id: 1, name: "Alice", email: "alice@test.com", role: "admin" };
    userCache.set("alice", user);
    const retrieved = userCache.get("alice");
    assert.equal(retrieved?.id, 1);
    assert.equal(retrieved?.name, "Alice");
  });

  it("firstOrNull should return correct type", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.firstOrNull([1, 2, 3]);
    assert.equal(result, 1);
    const empty = mod.firstOrNull([] as number[]);
    assert.equal(empty, null);
  });

  it("all exports should exist", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.GenericCache, "function");
    assert.equal(typeof mod.createUserCache, "function");
    assert.equal(typeof mod.firstOrNull, "function");
  });
});
