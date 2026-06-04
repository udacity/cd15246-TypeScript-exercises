# Custom Type Predicates

In this exercise, you'll write type predicate functions (`val is Type`) to validate and narrow API response shapes.

## Learning Objectives

- Write custom type predicate functions using `val is Type` syntax
- Combine runtime checks with type narrowing
- Process unknown data safely using multiple predicates

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/type-narrowing-control-flow/custom-type-predicates-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Instructions

1. Open `src/index.ts`
2. Implement `isStringArray(val: unknown): val is string[]` — returns `true` if `val` is an array where every element is a string
3. Implement `isUserObject(val: unknown): val is { id: number; name: string }` — returns `true` if `val` is an object with numeric `id` and string `name` properties
4. Implement `isValidEmail(email: string): boolean` — a non-predicate validator that returns `true` if the string contains `@` with text before and after
5. Implement `processData(data: unknown): string` — uses the predicates above to safely process unknown data:
   - If `isUserObject(data)` → return `"User: <name>"`
   - If `isStringArray(data)` → return `"String array with <count> items"`
   - Otherwise → return `"Unknown data"`

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Type predicate syntax: `function isX(value: unknown): value is XType { ... }`
2. Check arrays with `Array.isArray(val)` before iterating
3. For `isUserObject`, verify `typeof val === "object" && val !== null` first
4. Use `typeof val.id === "number"` to check field types at runtime
5. Run `npm test` after each function to validate your implementation
