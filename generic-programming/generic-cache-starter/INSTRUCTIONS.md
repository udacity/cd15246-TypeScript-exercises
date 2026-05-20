# Exercise: Build a Generic Cache

Build a type-safe generic cache class that stores values by key.

## Requirements

1. Make `GenericCache` generic by adding a type parameter `T`
2. Type the `constructor` parameter `maxSize` as `number`
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

## Tips

- Use `<T>` right after `GenericCache` in the class declaration
- The `Map` type will infer `Map<string, T>` when T is known
- For `firstOrNull`, use `<T>` between function name and parameters
- Run `npm test` to verify your implementation
