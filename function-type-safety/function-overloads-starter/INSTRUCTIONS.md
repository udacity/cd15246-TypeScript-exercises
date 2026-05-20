# Function Overloads

In this exercise, you'll implement function overloads for a data fetcher utility and a URL builder.

## Learning Objectives

- Define multiple function overload signatures for different parameter combinations
- Implement a single implementation signature that satisfies all overloads
- Use TypeScript overloads to provide precise type information for varying call patterns

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

## Running the Exercise

```bash
# Type-check your solution
npm run type-check

# Run tests
npm test
```
