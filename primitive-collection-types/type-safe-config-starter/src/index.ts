// TODO: Complete this interface with known properties and an index signature
// The index signature should allow string keys with string | number | boolean values
interface AppConfig {
  appName: string;
  version: string;
  // TODO: Add index signature here
}

// TODO: Implement this function to safely get a config value by key
// Use bracket notation — dot notation won't work with noPropertyAccessFromIndexSignature
export function getConfigValue(
  config: AppConfig,
  key: string
): string | number | boolean | undefined {
  // Return the value at config[key], or undefined if not set
  return;
}

// TODO: Implement this function to update a config value
export function setConfigValue(
  config: AppConfig,
  key: string,
  value: string | number | boolean
): void {
  // Set config[key] = value
}
