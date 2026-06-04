import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Domain Layer", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("should export use cases", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    assert.equal(typeof mod.RegisterUserUseCase, "function");
    assert.equal(typeof mod.LoginUserUseCase, "function");
  });

  it("hashPassword should produce a hashed string", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const hash = mod.hashPassword("mypassword");
    assert.notEqual(hash, "mypassword");
    assert.ok(hash.startsWith("hashed_"));
  });

  it("verifyPassword should match correctly", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const hash = mod.hashPassword("mypassword");
    assert.equal(mod.verifyPassword("mypassword", hash), true);
    assert.equal(mod.verifyPassword("wrong", hash), false);
  });

  it("RegisterUserUseCase should create a user via the repository", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));

    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => null,
      create: async (data) => ({
        id: "user-1",
        ...data,
        createdAt: new Date(),
      }),
    };

    const registerUseCase = new mod.RegisterUserUseCase(mockUserRepo);
    const user = await registerUseCase.execute({
      email: "test@test.com",
      password: "mypassword",
      name: "Test User",
    });

    assert.equal(user.email, "test@test.com");
    assert.equal(user.name, "Test User");
    assert.ok(user.password.startsWith("hashed_"));
  });

  it("RegisterUserUseCase should reject duplicate emails", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));

    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => ({
        id: "existing",
        email: "test@test.com",
        password: "hashed_pass",
        name: "Existing",
        createdAt: new Date(),
      }),
      create: async () => {
        throw new Error("should not reach");
      },
    };

    const registerUseCase = new mod.RegisterUserUseCase(mockUserRepo);
    await assert.rejects(
      () =>
        registerUseCase.execute({
          email: "test@test.com",
          password: "pass",
          name: "Test",
        }),
      { message: /already exists|duplicate|registered|already registered/i }
    );
  });

  it("LoginUserUseCase should create a session on valid credentials", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));

    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => ({
        id: "user-1",
        email: "test@test.com",
        password: mod.hashPassword("correctpass"),
        name: "Test User",
        createdAt: new Date(),
      }),
      create: async () => {
        throw new Error("should not reach");
      },
    };

    const mockSessionRepo: mod.SessionRepository = {
      findByToken: async () => null,
      create: async (data) => ({
        id: "session-1",
        ...data,
        createdAt: new Date(),
      }),
      deleteByUserId: async () => {},
    };

    const loginUseCase = new mod.LoginUserUseCase(mockUserRepo, mockSessionRepo);
    const session = await loginUseCase.execute({
      email: "test@test.com",
      password: "correctpass",
    });

    assert.equal(session.userId, "user-1");
    assert.ok(session.token.startsWith("tok_"));
  });

  it("LoginUserUseCase should reject wrong password", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));

    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => ({
        id: "user-1",
        email: "test@test.com",
        password: mod.hashPassword("correctpass"),
        name: "Test User",
        createdAt: new Date(),
      }),
      create: async () => {
        throw new Error("should not reach");
      },
    };

    const mockSessionRepo: mod.SessionRepository = {
      findByToken: async () => null,
      create: async () => {
        throw new Error("should not reach");
      },
      deleteByUserId: async () => {},
    };

    const loginUseCase = new mod.LoginUserUseCase(mockUserRepo, mockSessionRepo);
    await assert.rejects(
      () =>
        loginUseCase.execute({
          email: "test@test.com",
          password: "wrongpass",
        }),
      { message: /invalid|wrong|incorrect|credentials/i }
    );
  });

  it("LoginUserUseCase for non-existent user should throw", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));

    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => null,
      create: async () => {
        throw new Error("should not reach");
      },
    };

    const mockSessionRepo: mod.SessionRepository = {
      findByToken: async () => null,
      create: async () => {
        throw new Error("should not reach");
      },
      deleteByUserId: async () => {},
    };

    const loginUseCase = new mod.LoginUserUseCase(mockUserRepo, mockSessionRepo);
    await assert.rejects(
      () =>
        loginUseCase.execute({
          email: "nobody@test.com",
          password: "anypass",
        }),
      { message: /invalid|wrong|incorrect|credentials|not found|exist/i }
    );
  });
});
