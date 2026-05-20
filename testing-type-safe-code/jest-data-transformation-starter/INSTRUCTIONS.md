# Write Jest Tests for Data Transformation

## Learning Objective
Write comprehensive Jest tests for a data transformation service that converts raw API data into formatted display data.

## Instructions

The file `src/index.ts` contains three exported functions:
- `transformUserData(raw)` — transforms a raw API user object into a formatted display object
- `transformMany(rawArray)` — transforms an array of raw API users
- `calculateAgeStats(users)` — calculates age statistics (min, max, avg) from an array of transformed users

Your task is to write tests in `__tests__/transformation.test.ts` that cover:

1. **Happy path** — test each function with valid input
2. **Edge cases** — empty arrays, missing optional fields, boundary values for ages
3. **Error handling** — invalid input types, null/undefined values, missing required fields
4. **Type safety** — verify that the functions return the correct shape

## Starter Code
- `src/index.ts` — the implementation (already complete)
- `__tests__/transformation.test.ts` — your test file (edit this)

## Requirements
- Write at least 8 test cases distributed across all three functions
- Use `describe` blocks to group related tests
- Test both valid and invalid inputs
- Run `npm test` to verify your tests pass

## Solution
Located in the `solution/` folder.
