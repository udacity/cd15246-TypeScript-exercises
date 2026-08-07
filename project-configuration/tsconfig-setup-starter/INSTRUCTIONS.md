# Configure a TypeScript Project for ESM

Your team is starting a new Node.js project and needs a proper TypeScript setup with ES modules. TypeScript 6.0 defaults to `module: "esnext"`, which is a fine choice for bundlers. For a Node.js runtime, `nodenext` is the right call: it is ESM-first and replaces the deprecated `"node"` module resolution. This exercise builds the config that makes it work.

Your task is to complete the `tsconfig.json` file so the project compiles correctly as an ESM project.

## Setup

```bash
# 1. Navigate to the starter folder
cd exercises/project-configuration/tsconfig-setup-starter

# 2. Install dependencies (includes TypeScript and Node types)
npm install

# 3. Run the tests to see them fail
npm test
```

## Requirements

1. Set the module system to `nodenext` for ESM support
2. Set module resolution to `nodenext`: the modern replacement for the deprecated `node` resolution
3. Set the target to `ES2022`
4. Enable strict mode
5. Configure `outDir` to output to `./dist`
6. Set `rootDir` to `./src`
7. Enable `esModuleInterop` for CommonJS compatibility
8. Set `types` to `["node"]` so Node.js type definitions load
9. Set `include` to `["src"]` so only the source directory compiles
10. Ensure the project compiles without errors

## Files

- `tsconfig.json`: incomplete config file with TODO markers
- `src/index.ts`: a simple entry point that uses ESM imports
- `package.json`: already configured with `"type": "module"`

## Solution

Located in the `solution/` folder. Use it to check your work after you have attempted the exercise yourself.

## Hints

1. In TypeScript 6.0, `strict: true` is the default. Still set it explicitly
2. `outDir` and `rootDir` must be consistent: source files go under `src/`, output goes to `dist/`
3. Set `"types": ["node"]`. TypeScript 6.0 defaults to `types: []`, which loads no ambient types. Without it, Node.js globals like `process` are unavailable
4. Run `npm test` after each change to verify your configuration is correct
