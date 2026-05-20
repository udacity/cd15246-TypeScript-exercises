// Simulates a delayed API response
function simulateRequest(url: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Response from ${url}`), 10);
  });
}

// TODO: Add overload signatures for fetchData
// One version takes just a url (no timeout)
// One version takes a url and timeout in milliseconds
// One version takes a url and an AbortSignal
export async function fetchData(
  url: string,
  param?: number | AbortSignal
): Promise<string> {
  // If param is a number, set a timeout
  // If param is an AbortSignal, wire it up
  // Default: no special handling
  return simulateRequest(url);
}

// TODO: Add overloads for createUrl
// One version takes just a path (uses default base)
// One version takes a custom base URL and a path
export function createUrl(baseOrPath: string, path?: string): string {
  if (path) {
    return `${baseOrPath.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }
  return `/api/${baseOrPath.replace(/^\//, "")}`;
}
