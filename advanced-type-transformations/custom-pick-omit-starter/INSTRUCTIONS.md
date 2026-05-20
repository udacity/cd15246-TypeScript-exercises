# Build Custom Pick, Omit, and DeepReadonly Types

## Learning Objective
Create custom utility types from scratch using mapped types, conditional types, and recursive type transformations.

## Instructions

1. **Implement `MyPick<T, K>`**: Define a mapped type that picks a subset of keys `K` from type `T`. Constrain `K` to extend `keyof T`.

2. **Implement `MyOmit<T, K>`**: Define a mapped type that excludes keys `K` from type `T`. Use `Exclude<keyof T, K>` with mapped types.

3. **Implement `DeepReadonly<T>`**: Define a recursive mapped type that makes all properties readonly. If a property value is an object (`Record<string, unknown>`), apply `DeepReadonly` recursively.

## Starter Code
File: `src/index.ts`

## Solution
Located in the `solution/` folder.

## Hints
1. Use mapped type syntax with `in` to iterate over keys
2. `Exclude<keyof T, K>` removes keys `K` from the union `keyof T`
3. For `DeepReadonly`, check if `T[P] extends Record<string, unknown>` to detect nested objects
4. Avoid `object` type for recursive checks — use `Record<string, unknown>` to exclude arrays and functions
