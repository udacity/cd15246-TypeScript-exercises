# Function Overloads

In this exercise, you'll implement function overloads for a data fetcher utility and a URL builder.

## Learning Objectives

- Define multiple function overload signatures for different parameter combinations
- Implement a single implementation signature that satisfies all overloads
- Use TypeScript overloads to provide precise type information for varying call patterns

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/function-type-safety/function-overloads-starter

# 2. Install dependencies
npm install

# 3. Run the tests to see them fail
npm test
```

## Instructions

1. Open `src/index.ts`
2. Add **overload signatures** for `fetchData`:
   - `(url: string) => Promise<string>` — no special handling
   - `(url: string, timeoutMs: number) => Promise<string>` — with timeout
   - `(url: string, signal: AbortSignal) => Promise<string>` — with abort signal
3. Ensure the implementation signature handles all three cases correctly
4. Add **overloads** for `createUrl`:
   - `(path: string) => string` — relative URL with default base `/api/`
   - `(base: string, path: string) => string` — custom base URL
5. Make sure both functions compile and pass all tests

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. Overload signatures go BEFORE the implementation signature — TypeScript matches calls against them in order
2. The implementation signature must be compatible with ALL overloads
3. Use `typeof` checks in the implementation body to distinguish between overload cases
4. For the `AbortSignal` overload, convert the signal to a timeout using `AbortSignal.timeout()`
5. Run `npm test` after each change to verify your overloads
