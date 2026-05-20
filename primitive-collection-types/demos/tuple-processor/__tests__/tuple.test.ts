import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

describe("Tuple Processor Demo", () => {
  it("should compile without errors", () => {
    try {
      execSync("npx tsc --noEmit", { cwd: projectRoot, stdio: "pipe" });
    } catch (e) {
      const stderr = (e as { stderr?: Buffer }).stderr?.toString() || "";
      assert.fail(`Compilation failed:\n${stderr}`);
    }
  });

  it("parseCsvLine should return a typed tuple", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const result = mod.parseCsvLine("42,Alice,95");
    assert.deepEqual(result, [42, "Alice", 95]);
    assert.equal(result.length, 3);
  });

  it("calculateStats should return min, max, avg", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const rows: Array<[number, string, number]> = [
      [1, "Alice", 95],
      [2, "Bob", 80],
      [3, "Charlie", 85],
    ];
    const stats = mod.calculateStats(rows);
    assert.equal(stats[0], 80); // min
    assert.equal(stats[1], 95); // max
    assert.equal(stats[2], 86.66666666666667); // avg
  });

  it("formatRow should destructure tuple", async () => {
    const mod = await import(join(projectRoot, "src", "index.ts"));
    const row: [number, string, number] = [1, "Alice", 95];
    const result = mod.formatRow(row);
    assert.equal(result, "#1: Alice scored 95");
  });
});
