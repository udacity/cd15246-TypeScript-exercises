# TypeScript Exercises — cd15246

This repository contains the hands-on exercises and demo implementations for the Udacity TypeScript course (cd15246). Each module has a starter folder for the exercise and a solution folder to check your work.

## Modules

| Module | Exercise | Demo |
|--------|----------|------|
| Project Configuration | `tsconfig-setup-starter/` | `demos/express-server-setup/` |
| Primitive & Collection Types | `type-safe-config-starter/` | `demos/tuple-processor/` |
| Structural Type Design | `discriminated-user-roles-starter/` | `demos/api-response-types/` |
| Type Narrowing & Control Flow | `custom-type-predicates-starter/` | `demos/state-machine-assertions/` |
| Function Type Safety | `function-overloads-starter/` | `demos/callback-to-async/` |
| Generic Programming | `generic-cache-starter/` | `demos/generic-data-fetcher/` |
| Advanced Type Transformations | `custom-pick-omit-starter/` | `demos/deep-partial-form/` |
| Runtime Type Validation | `zod-api-validation-starter/` | `demos/zod-form-validation/` |
| Full-Stack Type Safety | `prisma-schema-types-starter/` | `demos/trpc-api-setup/` |
| Testing Type-Safe Code | `jest-data-transformation-starter/` | `demos/jest-mocking-external/` |
| Clean Architecture | `domain-entities-use-cases-starter/` | `demos/infrastructure-di/` |

## Prerequisites

- **Node.js** 24.10+ (use `.nvmrc` files — run `nvm use` in each folder)
- **npm** 10.x+

## Running an Exercise

Each module folder contains:

- `*-starter/` — the exercise scaffold with TODO markers
- `solution/` — the completed implementation
- `demos/*/` — instructor-led demo code

```bash
# Navigate to any starter or solution folder
cd project-configuration/solution

# Install dependencies
npm install

# Run tests
npm test
```

Starter tests will fail until you complete the TODOs. Solution tests should all pass.

## Running a Demo

```bash
cd project-configuration/demos/express-server-setup
npm install
npm test
```

## Project Structure

```
exercises/
├── project-configuration/
│   ├── tsconfig-setup-starter/   ← your work goes here
│   ├── solution/                 ← reference implementation
│   └── demos/
│       └── express-server-setup/ ← instructor-led demo
├── primitive-collection-types/
│   ├── type-safe-config-starter/
│   ├── solution/
│   └── demos/
│       └── tuple-processor/
├── ... (11 modules total)
```

## Test Runners

Most modules use the Node.js built-in test runner (`node:test`) with `--experimental-strip-types`. The Testing module uses Jest.
