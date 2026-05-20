# Custom Type Predicates

In this exercise, you'll write type predicate functions (`val is Type`) to validate and narrow API response shapes.

## Learning Objectives

- Write custom type predicate functions using `val is Type` syntax
- Combine runtime checks with type narrowing
- Process unknown data safely using multiple predicates

## Instructions

1. Open `src/index.ts`
2. Implement `isStringArray(val: unknown): val is string[]` — returns `true` if `val` is an array where every element is a string
3. Implement `isUserObject(val: unknown): val is { id: number; name: string }` — returns `true` if `val` is an object with numeric `id` and string `name` properties
4. Implement `isValidEmail(email: string): boolean` — a non-predicate validator that returns `true` if the string contains `@` with text before and after
5. Implement `processData(data: unknown): string` — uses the predicates above to safely process unknown data:
   - If `isUserObject(data)` → return `"User: <name>"`
   - If `isStringArray(data)` → return `"String array with <count> items"`
   - Otherwise → return `"Unknown data"`

## Running the Exercise

```bash
# Type-check your solution
npm run type-check

# Run tests
npm test
```
