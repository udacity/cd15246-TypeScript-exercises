export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};

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
