/**
 * Demonstrates working with tuple types for data processing.
 * Tuples are fixed-length arrays with known element types.
 */

// A tuple representing a parsed CSV row: [id, name, score]
type CsvRow = [number, string, number];

/**
 * Parses a CSV line into a typed tuple.
 * The tuple guarantees type safety at each position.
 */
export function parseCsvLine(line: string): CsvRow {
  const parts = line.split(",");
  return [Number(parts[0]), parts[1], Number(parts[2])];
}

/**
 * Calculates statistics from an array of score tuples.
 * Using a named tuple type makes the return clear.
 */
export type ScoreStats = [min: number, max: number, avg: number];

export function calculateStats(rows: CsvRow[]): ScoreStats {
  const scores = rows.map((row) => row[2]);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return [min, max, avg];
}

/**
 * Demonstrates tuple destructuring.
 */
export function formatRow(row: CsvRow): string {
  const [id, name, score] = row;
  return `#${id}: ${name} scored ${score}`;
}
