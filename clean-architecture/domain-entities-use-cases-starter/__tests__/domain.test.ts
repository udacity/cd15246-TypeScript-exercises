import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Domain Layer - Authentication", () => {
  let mod: Awaited<ReturnType<typeof import>>;

  before(async () => {
    mod = await import(join(projectRoot, "src", "index.ts"));
  });

  it("should export entities, repositories, and use cases", () => {
    assert.equal(typeof mod.RegisterUserUseCase, "function");
    assert.equal(typeof mod.LoginUserUseCase, "function");
    assert.equal(typeof mod.hashPassword, "function");
    assert.equal(typeof mod.verifyPassword, "function");
    assert.equal(typeof mod.generateToken, "function");
  });

  it("RegisterUserUseCase should create a user via the repository", async () => {
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
      email: "alice@test.com",
      password: "secret123",
      name: "Alice",
    });

    assert.equal(user.email, "alice@test.com");
    assert.equal(user.name, "Alice");
    assert.ok(mod.verifyPassword("secret123", user.password));
  });

  it("RegisterUserUseCase should reject duplicate email", async () => {
    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => ({
        id: "existing",
        email: "bob@test.com",
        password: "hashed_pass",
        name: "Bob",
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
          email: "bob@test.com",
          password: "pass",
          name: "Bob2",
        }),
      { message: /already exists|duplicate|registered/i }
    );
  });

  it("LoginUserUseCase should create a session on valid credentials", async () => {
    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => ({
        id: "user-1",
        email: "charlie@test.com",
        password: mod.hashPassword("correctpass"),
        name: "Charlie",
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
      email: "charlie@test.com",
      password: "correctpass",
    });

    assert.ok(session.token.startsWith("tok_"));
    assert.equal(session.userId, "user-1");
    assert.ok(session.expiresAt > new Date());
  });

  it("LoginUserUseCase should reject wrong password", async () => {
    const mockUserRepo: mod.UserRepository = {
      findById: async () => null,
      findByEmail: async () => ({
        id: "user-1",
        email: "dave@test.com",
        password: mod.hashPassword("correctpass"),
        name: "Dave",
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
          email: "dave@test.com",
          password: "wrongpass",
        }),
      { message: /invalid|wrong|incorrect|credentials/i }
    );
  });

  it("LoginUserUseCase for non-existent user should throw", async () => {
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
