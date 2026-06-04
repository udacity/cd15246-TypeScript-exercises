# Build Custom Pick, Omit, and DeepReadonly Types

## Learning Objective

Create custom utility types from scratch using mapped types, conditional types, and recursive type transformations.

## Prerequisites

- Node.js 24.10+ (use the `.nvmrc` file — run `nvm use` in this folder)
- npm 10.x+

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/advanced-type-transformations/custom-pick-omit-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

The tests should fail at first. That is expected — the starter types are placeholders. Your goal is to make all tests pass by implementing the types correctly.

## Your Task

Open `src/index.ts` and implement the following three utility types:

### 1. `MyPick<T, K>`

Define a mapped type that picks a subset of keys `K` from type `T`.

- `K` must be constrained to only allow keys that exist on `T` (`K extends keyof T`)
- The result should be an object type with only the picked keys and their original value types
- **Hint**: Use the mapped type syntax `[P in K]: T[P]`

### 2. `MyOmit<T, K>`

Define a mapped type that excludes keys `K` from type `T`.

- `K` must be constrained to only keys that exist on `T`
- The result should exclude the specified keys
- **Hint**: Use `Exclude<keyof T, K>` to remove keys from the union, then map over the result

### 3. `DeepReadonly<T>`

Define a recursive mapped type that makes all properties `readonly`.

- Top-level properties should be `readonly`
- If a property value is an object (but not an array or function), apply `DeepReadonly` recursively
- **Hint**: Check if `T[P] extends Record<string, unknown>` to detect nested objects. Avoid `object` — that would include arrays and functions, which should not be recursed into.

## How the Tests Work

This exercise uses **compile-time type assertions** to validate your implementations. The tests don't run your code at runtime — instead, they check that your types behave correctly at compile time.

For example, a test like this:

```typescript
assertTrue<TypeEqual<MyPick<User, "id" | "name">, { id: number; name: string }>>();
```

...will cause a TypeScript compilation error if `MyPick` doesn't produce exactly `{ id: number; name: string }`.

Additional tests use `@ts-expect-error` to verify that invalid usage (like passing a non-existent key) correctly produces a type error.

To run the tests:

```bash
npm test
```

This runs the test file at `__tests__/types.test.ts`, which:
1. Runs `npx tsc --noEmit` to check all type assertions
2. Reports pass/fail based on whether compilation succeeds

If the tests fail, read the error output carefully — it tells you which type assertion was violated.

## Starter Code

File: `src/index.ts` — three type aliases with TODO comments

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Use mapped type syntax with `in` to iterate over keys
2. `Exclude<keyof T, K>` removes keys `K` from the union `keyof T`
3. For `DeepReadonly`, check if `T[P] extends Record<string, unknown>` to detect nested objects
4. Avoid `object` type for recursive checks — use `Record<string, unknown>` to exclude arrays and functions
5. Run `npm test` after each implementation to see your progress
