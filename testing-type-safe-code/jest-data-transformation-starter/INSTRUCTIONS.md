# Write Jest Tests for Data Transformation

## Learning Objective

Write comprehensive Jest tests for a data transformation service that converts raw API data into formatted display data.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/testing-type-safe-code/jest-data-transformation-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail (they are TODO stubs)
npm test
```

The tests are empty stubs — your job is to fill them in.

## Instructions

The file `src/index.ts` contains three exported functions (already implemented):
- `transformUserData(raw)` — transforms a raw API user object into a formatted display object
- `transformMany(rawArray)` — transforms an array of raw API users, filtering invalid entries
- `calculateAgeStats(users)` — calculates age statistics (min, max, avg) from an array, or returns null

Your task is to write tests in `__tests__/transformation.test.ts` that cover:

1. **Happy path** — test each function with valid input
2. **Edge cases** — empty arrays, missing optional fields, boundary values for ages
3. **Error handling** — invalid input types, null/undefined values, missing required fields
4. **Type safety** — verify that the functions return the correct shape

## Starter Code

- `src/index.ts` — the implementation (already complete, don't modify)
- `__tests__/transformation.test.ts` — your test file (edit this to add tests)

## Requirements

- Write at least 8 test cases distributed across all three functions
- Use `describe` blocks to group related tests
- Test both valid and invalid inputs
- Run `npm test` to verify your tests pass

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Use `toBe()` for primitive comparisons, `toEqual()` for object comparisons
2. Test `transformUserData` with and without the optional `age` field
3. For `transformMany`, remember that empty strings are falsy in JavaScript
4. For `calculateAgeStats`, verify null is returned when no ages are present
5. Use `toHaveLength()` to check array sizes
