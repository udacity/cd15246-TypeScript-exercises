// TODO: Implement MyPick<T, K> that picks keys K from T
// Use mapped types with a constraint that K extends keyof T
export type MyPick<T, K> = {
  // [P in K]: T[P]
};

// TODO: Implement MyOmit<T, K> that excludes keys K from T
// Hint: Use Pick with Exclude<keyof T, K>
export type MyOmit<T, K> = {
  // [P in Exclude<keyof T, K>]: T[P]
};

// TODO: Implement DeepReadonly<T> that makes all properties readonly
// If a property is an object (not array, not function), make it readonly too
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
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

// Type-level tests (should compile without error)
// These verify the types work at compile time
// Uncomment after implementing:
// type UserName = MyPick<User, "id" | "name">;
// type UserWithoutEmail = MyOmit<User, "email">;
// type ReadonlyConfig = DeepReadonly<NestedConfig>;
