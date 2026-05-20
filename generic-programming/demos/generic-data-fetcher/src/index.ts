export interface ApiEndpoints {
  "/api/users": { id: number; name: string; email: string }[];
  "/api/users/:id": { id: number; name: string; email: string };
  "/api/products": { id: number; title: string; price: number }[];
  "/api/health": { status: string; timestamp: string };
}

export async function fetchApi<T extends keyof ApiEndpoints>(
  endpoint: T
): Promise<ApiEndpoints[T]> {
  const response = await fetch(`http://localhost:3000${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchApiWithParams<
  T extends keyof ApiEndpoints,
  P extends Record<string, string>
>(endpoint: T, params: P): Promise<ApiEndpoints[T]> {
  let url = endpoint as string;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, value);
  }
  const response = await fetch(`http://localhost:3000${url}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export async function getUsers(): Promise<ApiEndpoints["/api/users"]> {
  return fetchApi("/api/users");
}

export async function getUserById(
  id: number
): Promise<ApiEndpoints["/api/users/:id"]> {
  return fetchApiWithParams("/api/users/:id", { id: String(id) });
}

export function createMockFetcher() {
  const mockData: Partial<ApiEndpoints> = {
    "/api/users": [
      { id: 1, name: "Alice", email: "alice@test.com" },
      { id: 2, name: "Bob", email: "bob@test.com" },
    ],
    "/api/users/:id": { id: 1, name: "Alice", email: "alice@test.com" },
    "/api/products": [
      { id: 1, title: "Laptop", price: 999 },
      { id: 2, title: "Mouse", price: 25 },
    ],
    "/api/health": { status: "ok", timestamp: new Date().toISOString() },
  };

  return async function mockFetch<T extends keyof ApiEndpoints>(
    endpoint: T
  ): Promise<ApiEndpoints[T]> {
    const data = mockData[endpoint];
    if (!data) throw new Error(`No mock for ${endpoint}`);
    return data as ApiEndpoints[T];
  };
}
