// Data transformation service - students will write tests for this

export interface RawUserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age?: number;
}

export interface FormattedUser {
  id: number;
  displayName: string;
  email: string;
  isAdult: boolean;
  age?: number;
}

/**
 * Transforms raw API data into formatted display data.
 * Converts snake_case to camelCase, computes derived fields.
 */
export function transformUserData(raw: RawUserData): FormattedUser {
  return {
    id: raw.id,
    displayName: `${raw.first_name} ${raw.last_name}`,
    email: raw.email,
    isAdult: raw.age !== undefined ? raw.age >= 18 : false,
    ...(raw.age !== undefined ? { age: raw.age } : {}),
  };
}

/**
 * Transforms multiple users, filtering out invalid entries.
 * An entry is invalid if it's missing id, first_name, or last_name.
 */
export function transformMany(rawData: RawUserData[]): FormattedUser[] {
  const valid = rawData.filter(
    (r) => r.id != null && r.first_name && r.last_name
  );
  return valid.map(transformUserData);
}

/**
 * Calculates age statistics from raw data.
 * Returns min, max, average age, or null if no age data.
 */
export function calculateAgeStats(
  rawData: RawUserData[]
): { min: number; max: number; avg: number } | null {
  const ages = rawData
    .map((r) => r.age)
    .filter((a): a is number => a !== undefined);

  if (ages.length === 0) return null;

  return {
    min: Math.min(...ages),
    max: Math.max(...ages),
    avg: Math.round(ages.reduce((a, b) => a + b, 0) / ages.length),
  };
}
