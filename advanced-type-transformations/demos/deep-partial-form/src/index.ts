/**
 * Demonstrates advanced type transformations for form handling.
 * Builds DeepPartial, FormField types from scratch.
 */

// Make all properties optional, recursively
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown>
    ? DeepPartial<T[P]>
    : T[P];
};

// Extract string keys from a type for form fields
export type FormFields<T> = {
  [P in keyof T & string]: {
    key: P;
    label: string;
    type: "text" | "number" | "email" | "password";
    required: boolean;
    value: T[P];
  };
};

// Transform a type to a form state (all values become strings)
export type FormState<T> = {
  [P in keyof T]: string;
};

// Example usage
export interface UserProfile {
  name: string;
  email: string;
  age: number;
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}

// Partial form data for progressive updates
export type PartialProfile = DeepPartial<UserProfile>;

// Form field metadata
export type ProfileFields = FormFields<UserProfile>;

// Form state with all values as strings
export type ProfileFormState = FormState<UserProfile>;

// Runtime helpers
export function toFormState<T extends Record<string, unknown>>(
  data: T
): FormState<T> {
  const state = {} as FormState<T>;
  for (const key in data) {
    state[key] = String(data[key]);
  }
  return state;
}

export function applyPartial<T extends Record<string, unknown>>(
  original: T,
  updates: DeepPartial<T>
): T {
  const result = { ...original };
  for (const key in updates) {
    const val = updates[key];
    if (val !== undefined) {
      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        (result as Record<string, unknown>)[key] = applyPartial(
          original[key] as Record<string, unknown>,
          val as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else {
        (result as Record<string, unknown>)[key] = val;
      }
    }
  }
  return result;
}
