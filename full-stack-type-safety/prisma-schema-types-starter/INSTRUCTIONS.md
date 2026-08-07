# Prisma Schema Types

Work with auto-generated types from a Prisma-like schema. You'll define model types and create type-safe queries that mirror Prisma's generated types.

## Learning Objective

Understand how Prisma generates types from schema definitions and implement type-safe database operations using generics.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/full-stack-type-safety/prisma-schema-types-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Requirements

1. Define the `Delegate<T>` interface with generic `findUnique`, `findMany`, and `create` methods using exactly these signatures:
   - `findUnique: (args: { where: { id: number } }) => Promise<T | null>`
   - `findMany: () => Promise<T[]>`
   - `create: (args: { data: Omit<T, "id"> }) => Promise<T>`
2. Define `User` type with fields: `id`, `email`, `name`, `role` (union type `"user" | "admin"`)
3. Define `Post` type with fields: `id`, `title`, `content`, `authorId`, and `author` (relation to User)
4. Create `UserDelegate` and `PostDelegate` type aliases using `Delegate<T>`
5. Implement `createUserDelegate()` with in-memory storage: `create` assigns incremental ids and stores the user, `findUnique` returns the user with the matching `id` or `null`, `findMany` returns all stored users
6. Implement `createPostDelegate()` with in-memory storage: `create` assigns incremental ids, resolves `author` from the users stored by `createUserDelegate`, and stores the post; `findUnique` and `findMany` work the same way as the user delegate

## Instructions

1. Open `src/index.ts` and replace the `// TODO` comments with proper type annotations and runtime behavior
2. Run `npm test` to verify your implementation passes all tests

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. `Delegate<T>` must match the exact signatures in Requirement 1 — the tests compare types with exact equality, so a signature like `findUnique: (id: number) => ...` will fail
2. Use `Omit<T, "id">` for the `create` method's data parameter since IDs are auto-generated
3. The `role` field should be a union type: `"user" | "admin"`
4. The `Post` type's `author` field should reference the `User` type
5. Keep module-level arrays and counters (e.g., `const users: User[] = []`) so `createUserDelegate` and `createPostDelegate` share the same store — a post created after a user must be able to resolve that user as its `author`
6. Run `npm test` after each change to verify your implementation
