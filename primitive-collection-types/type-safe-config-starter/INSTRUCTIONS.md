# Build a Type-Safe Configuration Store

You're building a configuration system that stores app settings. Some settings are known ahead of time (like `appName` and `version`), but users can also add custom settings dynamically.

Your goal is to create a type-safe configuration store using index signatures. The tsconfig has `noPropertyAccessFromIndexSignature` enabled — this means dynamic properties accessed via the index signature can only use bracket notation, not dot notation.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/primitive-collection-types/type-safe-config-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Requirements

1. Complete the `AppConfig` interface with known properties (`appName: string`, `version: string`) and an index signature for dynamic string keys with `string | number | boolean` values
2. Implement `getConfigValue` to safely retrieve a value by key using bracket notation
3. Implement `setConfigValue` to update a config value

## Files

- `src/index.ts` — starter code with TODO markers
- `tsconfig.json` — pre-configured with `noPropertyAccessFromIndexSignature: true`

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Index signature syntax: `[key: string]: string | number | boolean`
2. Bracket notation: `config[key]` — dot notation (`config.key`) will cause a type error
3. Use `key in config` to check if a key exists before returning
4. Run `npm test` after each change to verify your implementation
