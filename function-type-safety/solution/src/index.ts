// Simulates a delayed API response
function simulateRequest(url: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Response from ${url}`), 10);
  });
}

export async function fetchData(url: string): Promise<string>;
export async function fetchData(url: string, timeoutMs: number): Promise<string>;
export async function fetchData(url: string, signal: AbortSignal): Promise<string>;
export async function fetchData(
  url: string,
  param?: number | AbortSignal
): Promise<string> {
  if (typeof param === "number") {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Response from ${url}`), param);
    });
  }
  if (param instanceof AbortSignal) {
    return new Promise((resolve, reject) => {
      param.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
      simulateRequest(url).then(resolve);
    });
  }
  return simulateRequest(url);
}

export function createUrl(path: string): string;
export function createUrl(base: string, path: string): string;
export function createUrl(baseOrPath: string, path?: string): string {
  if (path) {
    return `${baseOrPath.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  }
  return `/api/${baseOrPath.replace(/^\//, "")}`;
}
