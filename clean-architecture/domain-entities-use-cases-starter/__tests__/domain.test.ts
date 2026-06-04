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
    assert.equal(typeof mod.User, "function");
    assert.equal(typeof mod.Session, "function");
    assert.equal(typeof mod.UserRepository, "function");
    assert.equal(typeof mod.SessionRepository, "function");
    assert.equal(typeof mod.RegisterUserUseCase, "function");
    assert.equal(typeof mod.LoginUserUseCase, "function");
  });

  it("RegisterUserUseCase should create a user and return it", async () => {
    const repo = new mod.UserRepository();
    const register = new mod.RegisterUserUseCase(repo);
    const user = await register.execute({
      email: "alice@test.com",
      name: "Alice",
      password: "secret123",
    });
    assert.ok(user.id);
    assert.equal(user.email, "alice@test.com");
    assert.equal(user.name, "Alice");
    assert.notEqual(user.password, "secret123");
  });

  it("RegisterUserUseCase should reject duplicate email", async () => {
    const repo = new mod.UserRepository();
    const register = new mod.RegisterUserUseCase(repo);
    await register.execute({
      email: "bob@test.com",
      name: "Bob",
      password: "secret123",
    });
    await assert.rejects(
      () =>
        register.execute({
          email: "bob@test.com",
          name: "Bob2",
          password: "otherpass",
        }),
      { message: /already exists|duplicate/i }
    );
  });

  it("LoginUserUseCase with correct password should return a session", async () => {
    const userRepo = new mod.UserRepository();
    const sessionRepo = new mod.SessionRepository();
    const register = new mod.RegisterUserUseCase(userRepo);
    const login = new mod.LoginUserUseCase(userRepo, sessionRepo);

    await register.execute({
      email: "charlie@test.com",
      name: "Charlie",
      password: "mypassword",
    });

    const session = await login.execute({
      email: "charlie@test.com",
      password: "mypassword",
    });

    assert.ok(session.token);
    assert.equal(session.userId, 1);
    assert.ok(session.expiresAt > new Date());
  });

  it("LoginUserUseCase with wrong password should throw", async () => {
    const userRepo = new mod.UserRepository();
    const sessionRepo = new mod.SessionRepository();
    const register = new mod.RegisterUserUseCase(userRepo);
    const login = new mod.LoginUserUseCase(userRepo, sessionRepo);

    await register.execute({
      email: "dave@test.com",
      name: "Dave",
      password: "correctpass",
    });

    await assert.rejects(
      () =>
        login.execute({
          email: "dave@test.com",
          password: "wrongpass",
        }),
      { message: /invalid|wrong|incorrect/i }
    );
  });

  it("LoginUserUseCase for non-existent user should throw", async () => {
    const userRepo = new mod.UserRepository();
    const sessionRepo = new mod.SessionRepository();
    const login = new mod.LoginUserUseCase(userRepo, sessionRepo);

    await assert.rejects(
      () =>
        login.execute({
          email: "nobody@test.com",
          password: "anypass",
        }),
      { message: /not found|does not exist/i }
    );
  });
});
