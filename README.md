# TypeScript Exercises — cd15246

This directory contains the hands-on exercises for the Udacity TypeScript course (cd15246).
Each topic area has a starter folder with the exercise scaffold and a solution folder to check your work.

## Available Exercises

| Topic | Exercise Starter | Solution |
|-------|-----------------|----------|
| Project Configuration | `project-configuration/tsconfig-setup-starter/` | `project-configuration/solution/` |
| Primitive & Collection Types | `primitive-collection-types/type-safe-config-starter/` | `primitive-collection-types/solution/` |
| Structural Type Design | `structural-type-design/discriminated-user-roles-starter/` | `structural-type-design/solution/` |
| Type Narrowing & Control Flow | `type-narrowing-control-flow/custom-type-predicates-starter/` | `type-narrowing-control-flow/solution/` |
| Function Type Safety | `function-type-safety/function-overloads-starter/` | `function-type-safety/solution/` |
| Generic Programming | `generic-programming/generic-cache-starter/` | `generic-programming/solution/` |
| Advanced Type Transformations | `advanced-type-transformations/custom-pick-omit-starter/` | `advanced-type-transformations/solution/` |
| Runtime Type Validation | `runtime-type-validation/zod-api-validation-starter/` | `runtime-type-validation/solution/` |
| Full-Stack Type Safety | `full-stack-type-safety/prisma-schema-types-starter/` | `full-stack-type-safety/solution/` |
| Testing Type-Safe Code | `testing-type-safe-code/jest-data-transformation-starter/` | `testing-type-safe-code/solution/` |
| Clean Architecture | `clean-architecture/domain-entities-use-cases-starter/` | `clean-architecture/solution/` |

## Prerequisites

- **Node.js** 24.10+ (use `.nvmrc` files — run `nvm use` in each folder)
- **npm** 10.x+

## Running an Exercise

Each starter folder is a complete Node.js project with its own `package.json`, `tsconfig.json`, and tests.

```bash
# Navigate to the starter folder
cd exercises/advanced-type-transformations/custom-pick-omit-starter

# Install dependencies
npm install

# Run tests
npm test
```

Starter tests will fail until you complete the TODOs. Solution tests should all pass.

## Running a Demo

Demos are located in the corresponding module folders under `modules/`:

```bash
cd modules/implementation-apply-advanced-type-transformations/demos/deep-partial-form
npm install
npm test
```

## Project Structure

```
exercises/
├── README.md                          ← this file
├── project-configuration/
│   ├── tsconfig-setup-starter/        ← your work goes here
│   └── solution/                      ← reference implementation
├── primitive-collection-types/
│   ├── type-safe-config-starter/
│   └── solution/
├── structural-type-design/
│   ├── discriminated-user-roles-starter/
│   └── solution/
├── type-narrowing-control-flow/
│   ├── custom-type-predicates-starter/
│   └── solution/
├── function-type-safety/
│   ├── function-overloads-starter/
│   └── solution/
├── generic-programming/
│   ├── generic-cache-starter/
│   └── solution/
├── advanced-type-transformations/
│   ├── custom-pick-omit-starter/
│   ├── solution/
│   └── demos/
│       └── deep-partial-form/         ← instructor-led demo
├── runtime-type-validation/
│   ├── zod-api-validation-starter/
│   └── solution/
├── full-stack-type-safety/
│   ├── prisma-schema-types-starter/
│   └── solution/
├── testing-type-safe-code/
│   ├── jest-data-transformation-starter/
│   └── solution/
└── clean-architecture/
    ├── domain-entities-use-cases-starter/
    └── solution/
```

## Test Runners

Most modules use the Node.js built-in test runner (`node:test` with `--experimental-strip-types`).
The Testing module uses Jest.

## Module-Level Exercise Instructions

Each implementation module in `modules/` has an `exercises/` folder with detailed instructions:

| Module | Instructions |
|--------|-------------|
| Apply Project Configuration | `modules/implementation-apply-project-config/exercises/INSTRUCTIONS.md` |
| Apply Primitive & Collection Types | `modules/implementation-apply-primitive-collection/exercises/INSTRUCTIONS.md` |
| Apply Structural Type Design | `modules/implementation-apply-structural-type-design/exercises/INSTRUCTIONS.md` |
| Apply Type Narrowing & Control Flow | `modules/implementation-apply-type-narrowing-control-flow/exercises/INSTRUCTIONS.md` |
| Apply Function Type Safety | `modules/implementation-apply-function-type-safety/exercises/INSTRUCTIONS.md` |
| Apply Generic Programming | `modules/implementation-apply-generic-programming/exercises/INSTRUCTIONS.md` |
| Apply Advanced Type Transformations | `modules/implementation-apply-advanced-type-transformations/exercises/INSTRUCTIONS.md` |
| Apply Runtime Type Validation | `modules/implementation-apply-runtime-type-validation/exercises/INSTRUCTIONS.md` |
| Apply Full-Stack Type Safety | `modules/implementation-apply-full-stack-type-safety/exercises/INSTRUCTIONS.md` |
| Apply Testing Type-Safe Code | `modules/implementation-apply-testing-type-safe-code/exercises/jest-data-transformation.md` |
| Apply Clean Architecture | `modules/implementation-apply-clean-architecture/exercises/INSTRUCTIONS.md` |
| Project: Dashy Analytics | `modules/project-clean-architecture-dashy-analytics/exercises/INSTRUCTIONS.md` |
