// TODO: Add a type parameter T to make this class generic
export class GenericCache {
  private store = new Map<string, T>();
  private maxSize: number;

  // TODO: Set the type of maxSize parameter
  constructor(maxSize) {
    this.maxSize = maxSize;
  }

  // TODO: Add proper types to key and value, implement eviction
  set(key, value): void {
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      if (firstKey !== undefined) {
        this.store.delete(firstKey);
      }
    }
    this.store.set(key, value);
  }

  // TODO: Add proper return type
  get(key: string) {
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

// Type for the typed cache demonstration
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

// TODO: Implement createUserCache that returns a GenericCache<User>
export function createUserCache(maxSize: number) {
  return;
}

// TODO: Add a type parameter to make this function generic
export function firstOrNull(items) {
  return items.length > 0 ? items[0] : null;
}
