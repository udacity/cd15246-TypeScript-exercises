export function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((item) => typeof item === "string");
}

export function isUserObject(val: unknown): val is { id: number; name: string } {
  if (typeof val !== "object" || val === null) return false;
  const obj = val as Record<string, unknown>;
  return typeof obj.id === "number" && typeof obj.name === "string";
}

export function isValidEmail(email: string): boolean {
  const atIndex = email.indexOf("@");
  return atIndex > 0 && atIndex < email.length - 1;
}

export function processData(data: unknown): string {
  if (isUserObject(data)) {
    return `User: ${data.name}`;
  }
  if (isStringArray(data)) {
    return `String array with ${data.length} items`;
  }
  return "Unknown data";
}
