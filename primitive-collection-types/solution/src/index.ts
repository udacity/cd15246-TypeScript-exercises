// AppConfig with known properties and an index signature for dynamic keys
export interface AppConfig {
  appName: string;
  version: string;
  // Index signature: allows dynamic string keys with primitive values
  [key: string]: string | number | boolean;
}

// Safely get a config value by key using bracket notation
export function getConfigValue(
  config: AppConfig,
  key: string
): string | number | boolean | undefined {
  return config[key];
}

// Update a config value
export function setConfigValue(
  config: AppConfig,
  key: string,
  value: string | number | boolean
): void {
  config[key] = value;
}
