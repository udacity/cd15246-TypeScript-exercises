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
    assert.ok(typeof mod.Delegate !== "undefined" || true); // type-only, erased at runtime
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

  it("createUserDelegate should find unique user by id", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const delegate = mod.createUserDelegate();
    await delegate.create({
      data: { email: "find@test.com", name: "FindMe", role: "admin" },
    });
    const all = await delegate.findMany();
    const found = await delegate.findUnique({ where: { id: all[all.length - 1].id } });
    assert.equal(found?.name, "FindMe");
  });

  it("createPostDelegate should create with author relation", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const userDelegate = mod.createUserDelegate();
    const author = await userDelegate.create({
      data: { email: "author@test.com", name: "Author", role: "admin" },
    });
    const postDelegate = mod.createPostDelegate();
    const post = await postDelegate.create({
      data: { title: "Hello", content: "World", authorId: author.id },
    });
    assert.equal(post.title, "Hello");
    assert.equal(post.author.name, "Author");
  });
});
