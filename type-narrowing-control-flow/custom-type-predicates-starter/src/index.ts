// TODO: Write a type predicate that checks if a value is a string array
export function isStringArray(val: unknown): val is string[] {
  // Check if val is an array where every element is a string
  return false;
}

// TODO: Write a type predicate that checks if a value is a user object
export function isUserObject(val: unknown): val is { id: number; name: string } {
  // Check if val has id (number) and name (string) properties
  return false;
}

// TODO: Write a simple email format validator (non-predicate)
export function isValidEmail(email: string): boolean {
  // Check if email contains @ and has text before and after
  return false;
}

// TODO: Use the predicates above to safely process unknown data
export function processData(data: unknown): string {
  // Use isUserObject to check and process
  // Return "User: <name>" if valid user
  // Return "String array with <count> items" if string array
  // Return "Unknown data" otherwise
  return "";
}
