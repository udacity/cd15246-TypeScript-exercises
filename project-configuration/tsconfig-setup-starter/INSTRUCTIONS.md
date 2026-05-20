# Configure a TypeScript Project for ESM

Your team is starting a new Node.js project and needs a proper TypeScript setup with ES modules. The project will use modern TypeScript defaults and the `nodenext` module resolution strategy.

Your task is to complete the `tsconfig.json` file so the project compiles correctly as an ESM project.

## Requirements

1. Set the module system to `nodenext` for proper ESM support
2. Set the target to `ES2022`
3. Enable strict mode
4. Configure `outDir` to output to a `dist` folder
5. Set `rootDir` to the `src` folder
6. Enable `esModuleInterop` for CommonJS compatibility
7. Ensure the project compiles without errors

## Files

- `tsconfig.json` — incomplete config file with TODO markers
- `src/index.ts` — a simple entry point that uses ESM imports
- `package.json` — already configured with `"type": "module"`

## Verify

Run `npx tsc --noEmit` to check for type errors.
Run `npx tsc` to compile and verify the `dist` folder is created.
