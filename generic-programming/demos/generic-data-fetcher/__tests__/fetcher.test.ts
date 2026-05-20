import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Generic Data Fetcher Demo", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export fetchApi, fetchApiWithParams, and createMockFetcher", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.fetchApi, "function");
    assert.equal(typeof mod.fetchApiWithParams, "function");
    assert.equal(typeof mod.createMockFetcher, "function");
  });

  it("createMockFetcher should return typed mock data for users", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const mockFetch = mod.createMockFetcher();
    const users = await mockFetch("/api/users");
    assert.equal(users.length, 2);
    assert.equal(users[0].name, "Alice");
    assert.equal(users[0].email, "alice@test.com");
  });

  it("createMockFetcher should return typed mock data for products", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const mockFetch = mod.createMockFetcher();
    const products = await mockFetch("/api/products");
    assert.equal(products.length, 2);
    assert.equal(products[0].title, "Laptop");
  });

  it("getUsers and getUserById should be type-safe wrappers", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.getUsers, "function");
    assert.equal(typeof mod.getUserById, "function");
  });
});
