import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import type { User, Post, Delegate } from "../src/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// ---- Type-Level Assertions ----

// Exact type equality check
type TypeEqual<A, B> = A extends B ? (B extends A ? true : false) : false;

// Force a type assertion at compile time.
// If `T` is `false`, assigning `true` to `T` fails to compile.
// This type is used only as a value annotation (erased at runtime).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const assertType = <T extends true>(_value: T): void => {};

// ---- Delegate<T> structural checks ----
// Verify Delegate<T> has findUnique, findMany, and create methods
type _DelegateStructCorrect<T> = TypeEqual<
  Delegate<T>,
  {
    findUnique: (args: { where: { id: number } }) => Promise<T | null>;
    findMany: () => Promise<T[]>;
    create: (args: { data: Omit<T, "id"> }) => Promise<T>;
  }
>;

// ---- User type checks ----
type _UserShapeValid = TypeEqual<
  User,
  { id: number; email: string; name: string; role: "user" | "admin" }
>;

// ---- Post type checks ----
// Post must have authorId and author referencing User
type _PostFieldsValid = Post extends {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: User;
} ? TypeEqual<
    Pick<Post, "id" | "title" | "content" | "authorId">,
    { id: number; title: string; content: string; authorId: number }
  > : false;

// ---- Runtime value assertions that trigger compile errors ----
assertType<_DelegateStructCorrect<User>>(true);
assertType<_DelegateStructCorrect<Post>>(true);
assertType<_UserShapeValid>(true);
assertType<_PostFieldsValid>(true);

// ---- Runtime Tests ----

describe("Prisma-Style Type Safety", () => {
  it("all type assertions pass", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      const stdout = (e as { stdout?: Buffer }).stdout?.toString() || "";
      assert.fail(
        `TypeScript compilation failed — one or more type assertions were not satisfied.\n${stderr}${stdout}`
      );
    }
  });
});
