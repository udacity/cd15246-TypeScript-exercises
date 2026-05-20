import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Prisma-Style Type Safety", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export type-safe delegates", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.ok(typeof mod.createUserDelegate === "function");
    assert.ok(typeof mod.createPostDelegate === "function");
  });

  it("createUserDelegate should create a new user", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const delegate = mod.createUserDelegate();
    const user = await delegate.create({
      data: { email: "test@test.com", name: "Test", role: "user" },
    });
    assert.equal(user.email, "test@test.com");
    assert.equal(user.name, "Test");
  });

  it("createUserDelegate should find users", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const delegate = mod.createUserDelegate();
    const users = await delegate.findMany();
    assert.ok(Array.isArray(users));
  });

  it("createPostDelegate should create a post", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const delegate = mod.createPostDelegate();
    const post = await delegate.create({
      data: { title: "Hello", content: "World", authorId: 1 },
    });
    assert.equal(post.title, "Hello");
  });
});
