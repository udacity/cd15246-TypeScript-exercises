# Prisma Schema Types

Work with auto-generated types from a Prisma-like schema. You'll define model types and create type-safe queries that mirror Prisma's generated types.

## Learning Objective

Understand how Prisma generates types from schema definitions and implement type-safe database operations using generics.

## Requirements

1. Define the `Delegate<T>` interface with generic `findUnique`, `findMany`, and `create` methods
2. Define `User` type with fields: `id`, `email`, `name`, `role` (union type `"user" | "admin"`)
3. Define `Post` type with fields: `id`, `title`, `content`, `authorId`, and `author` (relation to User)
4. Create `UserDelegate` and `PostDelegate` type aliases using `Delegate<T>`
5. Implement `createUserDelegate()` and `createPostDelegate()` factory functions with runtime behavior

## Instructions

1. Open `src/index.ts` and replace the `// TODO` comments with proper type annotations
2. Run `npm test` to verify your implementation passes all tests
3. Run `npm run type-check` to ensure no TypeScript errors

## Hints

- `Delegate<T>` should have three methods: `findUnique`, `findMany`, `create`
- Use `Omit<T, "id">` for the `create` method's data parameter since IDs are auto-generated
- The `role` field should be a union type: `"user" | "admin"`
- The `Post` type's `author` field should reference the `User` type
