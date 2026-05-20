# Build a Type-Safe Configuration Store

You're building a configuration system that stores app settings. Some settings are known ahead of time (like `appName` and `version`), but users can also add custom settings dynamically.

Your goal is to create a type-safe configuration store using index signatures. The tsconfig has `noPropertyAccessFromIndexSignature` enabled — this means dynamic properties accessed via the index signature can only use bracket notation, not dot notation.

## Requirements

1. Complete the `AppConfig` interface with known properties (`appName: string`, `version: string`) and an index signature for dynamic string keys with `string | number | boolean` values
2. Implement `getConfigValue` to safely retrieve a value by key using bracket notation
3. Implement `setConfigValue` to update a config value

## Files

- `src/index.ts` — starter code with TODO markers
- `tsconfig.json` — pre-configured with `noPropertyAccessFromIndexSignature: true`

## Verify

Run `npm test` to verify your solution.
