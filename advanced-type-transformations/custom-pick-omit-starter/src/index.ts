// TODO: Implement MyPick<T, K> that picks keys K from T
// Use mapped types with a constraint that K extends keyof T
export type MyPick<T, K> = {
  // TODO: Use mapped type syntax to pick keys K from T
};

// TODO: Implement MyOmit<T, K> that excludes keys K from T
// Hint: Use Exclude<keyof T, K> with mapped types
export type MyOmit<T, K> = {
  // TODO: Use mapped type syntax to exclude keys K from T
};

// TODO: Implement DeepReadonly<T> that makes all properties readonly
// If a property is an object (not array, not function), make it readonly too
export type DeepReadonly<T> = {
  // TODO: Add readonly to all properties and recurse into objects
};

// Test types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface NestedConfig {
  host: string;
  port: number;
  credentials: {
    username: string;
    password: string;
  };
}
