import { basename } from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const currentFile = basename(filename);

console.log(`TypeScript ESM project is running from: ${currentFile}`);

export function greet(name: string): string {
  return `Hello, ${name}!`;
}
