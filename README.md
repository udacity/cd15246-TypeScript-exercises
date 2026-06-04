# TypeScript Exercises — cd15246

This directory contains the hands-on exercises for the Udacity TypeScript course (cd15246).
Each topic area has a starter folder with the exercise scaffold and a solution folder to check your work.

## Available Exercises

| Topic | Exercise Starter | Solution |
|-------|-----------------|----------|
| Advanced Type Transformations | `custom-pick-omit-starter/` | `solution/` |

Additional exercises are under development. Instructions for future exercises can be found in each module's `exercises/` folder under `modules/`.

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
├── advanced-type-transformations/
│   ├── custom-pick-omit-starter/      ← your work goes here
│   ├── solution/                      ← reference implementation
│   └── demos/
│       └── deep-partial-form/         ← instructor-led demo
└── ... (more topics as exercises are built)
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
