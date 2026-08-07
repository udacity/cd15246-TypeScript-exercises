# Build a Generic Cache

Build a type-safe generic cache class that stores values by key.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/generic-programming/generic-cache-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Requirements

1. Make `GenericCache` generic by adding a type parameter `T`
2. Declare a private `maxSize` field (type `number`) and assign the `constructor` parameter to it in the constructor body
3. Type the `set` method parameters: `key: string, value: T`
4. Type the `get` method return type as `T | undefined`
5. Implement eviction: when the store is at `maxSize`, delete the oldest entry before adding a new one
6. Implement `createUserCache` to return `GenericCache<User>`
7. Make `firstOrNull` generic with a type parameter

## Expected API

```typescript
const cache = new GenericCache<string>(3);
cache.set("key", "value");
const val = cache.get("key"); // "value"
cache.has("key"); // true
cache.size; // 1
cache.clear();
```

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Add a type parameter `<T>` to the class name: `class GenericCache<T>`
2. The internal `Map` should be `Map<string, T>` not `Map<string, any>`
3. For eviction, use `this.store.keys().next()` to get the oldest key
4. Add a type parameter to `firstOrNull` so it preserves the element type: `<T>(items: T[]): T | null`
5. Run `npm test` after each change to verify your implementation
