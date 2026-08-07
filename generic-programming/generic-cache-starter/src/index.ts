// TODO: Add a type parameter T to make this class generic
export class GenericCache {
  private store = new Map<string, any>();

  // TODO: Declare a private maxSize field and assign the constructor parameter to it
  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  // TODO: Add proper types to key and value, implement eviction
  set(key: string, value: any): void {
    if (this.store.size >= this.maxSize) {
      // TODO: Implement eviction - delete the oldest entry
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
export function firstOrNull(items: any[]) {
  return items.length > 0 ? items[0] : null;
}
