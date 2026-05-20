/**
 * Demonstrates refactoring callback patterns to async/await.
 * Shows both patterns and how types flow through each.
 */

// Simulated async data source
interface DataItem {
  id: number;
  value: string;
}

// Callback-based pattern (old style)
export function fetchDataCallback(
  id: number,
  onSuccess: (data: DataItem) => void,
  onError: (error: Error) => void
): void {
  setTimeout(() => {
    try {
      const result: DataItem = { id, value: `Item ${id}` };
      onSuccess(result);
    } catch (e) {
      onError(e instanceof Error ? e : new Error(String(e)));
    }
  }, 10);
}

// Promise-based pattern (bridge)
export function fetchDataPromise(id: number): Promise<DataItem> {
  return new Promise((resolve, reject) => {
    fetchDataCallback(id, resolve, reject);
  });
}

// Async/await pattern (modern)
export async function fetchDataAsync(id: number): Promise<DataItem> {
  const data = await fetchDataPromise(id);
  return data;
}

// Multiple parallel requests
export async function fetchMultiple(...ids: number[]): Promise<DataItem[]> {
  const promises = ids.map((id) => fetchDataAsync(id));
  return Promise.all(promises);
}
