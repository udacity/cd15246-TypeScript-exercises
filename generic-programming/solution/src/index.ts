export class GenericCache<T> {
  private store = new Map<string, T>();
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  set(key: string, value: T): void {
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      if (firstKey !== undefined) {
        this.store.delete(firstKey);
      }
    }
    this.store.set(key, value);
  }

  get(key: string): T | undefined {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

export function createUserCache(maxSize: number): GenericCache<User> {
  return new GenericCache<User>(maxSize);
}

export function firstOrNull<T>(items: T[]): T | null {
  return items.length > 0 ? items[0] : null;
}
