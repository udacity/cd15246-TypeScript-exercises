import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// ─────────────────────────────────────────────────────────────
// Compile-time assertions for generic type constraints
//
// These use type annotations and @ts-expect-error to verify
// the GenericCache class actually enforces its type parameter.
// Without `class GenericCache<T>`, the annotation below will
// fail: "Type 'GenericCache' is not generic."
//
// Checked by the tsc --noEmit test below.
// ─────────────────────────────────────────────────────────────

function _compileTimeChecks(): void {
  // With a proper GenericCache<T>, this line compiles.
  // Without <T>, this is: "Type 'GenericCache' is not generic."
  const _cache: import("../src/index.ts").GenericCache<string> = (null as any);

  // @ts-expect-error — GenericCache<string> should reject number values
  _cache.set("key", 42);

  // @ts-expect-error — GenericCache<string>.get should return string, not number
  const _nope: number = _cache.get("key");
}

// ─────────────────────────────────────────────────────────────
// Runtime tests
// ─────────────────────────────────────────────────────────────

describe("GenericCache Exercise", () => {
  it("should compile without errors (includes type assertions)", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      // If this fails, either there's a code error or the
      // expect-error directives in _compileTimeChecks were
      // unused — meaning GenericCache doesn't enforce its type param.
      assert.fail(`Compilation failed. Either fix the source code or add proper generic type parameters.\n${stderr}`);
    }
  });

  it("GenericCache should evict oldest entry when over maxSize", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const cache = new mod.GenericCache(2);
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
    const user = { id: 1, name: "Alice", email: "alice@test.com", role: "admin" };
    userCache.set("alice", user);
    const retrieved = userCache.get("alice");
    assert.equal(retrieved?.id, 1);
    assert.equal(retrieved?.name, "Alice");
  });

  it("all exports should exist", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.GenericCache, "function");
    assert.equal(typeof mod.createUserCache, "function");
    assert.equal(typeof mod.firstOrNull, "function");
  });
});
