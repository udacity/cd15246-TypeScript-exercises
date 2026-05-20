// Simulates a delayed API response
function simulateRequest(url: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Response from ${url}`), 10);
  });
}

// TODO: Add overload signatures:
// 1. (url: string) => Promise<string> — no timeout
// 2. (url: string, timeoutMs: number) => Promise<string> — with timeout
// 3. (url: string, signal: AbortSignal) => Promise<string> — with abort signal
export async function fetchData(
  url: string,
  param?: number | AbortSignal
): Promise<string> {
  // If param is a number, set a timeout
  // If param is an AbortSignal, wire it up
  // Default: no special handling
  return simulateRequest(url);
}

// TODO: Add overloads for createUrl:
// 1. (path: string) => string — relative URL with default base
// 2. (base: string, path: string) => string — custom base
export function createUrl(baseOrPath: string, path?: string): string {
  if (path) {
    return `${baseOrPath.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }
  return `/api/${baseOrPath.replace(/^\//, "")}`;
}
