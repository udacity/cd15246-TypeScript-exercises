import { transformUserData, transformMany, calculateAgeStats } from "../src/index";

describe("transformUserData", () => {
  it("should transform a valid user", () => {
    const raw = { id: 1, first_name: "Alice", last_name: "Smith", email: "a@test.com" };
    const result = transformUserData(raw);
    expect(result.displayName).toBe("Alice Smith");
    expect(result.email).toBe("a@test.com");
    expect(result.isAdult).toBe(false);
  });

  it("should mark user as adult when age >= 18", () => {
    const raw = { id: 1, first_name: "Bob", last_name: "Jones", email: "b@test.com", age: 25 };
    const result = transformUserData(raw);
    expect(result.isAdult).toBe(true);
    expect(result.age).toBe(25);
  });

  it("should mark user as minor when age < 18", () => {
    const raw = { id: 2, first_name: "Charlie", last_name: "Brown", email: "c@test.com", age: 12 };
    const result = transformUserData(raw);
    expect(result.isAdult).toBe(false);
    expect(result.age).toBe(12);
  });

  it("should set isAdult to false when age is missing", () => {
    const raw = { id: 3, first_name: "Diana", last_name: "Prince", email: "d@test.com" };
    const result = transformUserData(raw);
    expect(result.isAdult).toBe(false);
    expect(result.age).toBeUndefined();
  });
});

describe("transformMany", () => {
  it("should transform multiple valid users", () => {
    const data = [
      { id: 1, first_name: "Alice", last_name: "Smith", email: "a@test.com" },
      { id: 2, first_name: "Bob", last_name: "Jones", email: "b@test.com" },
    ];
    const result = transformMany(data);
    expect(result).toHaveLength(2);
    expect(result[0].displayName).toBe("Alice Smith");
  });

  it("should filter out entries with missing first_name", () => {
    const data = [
      { id: 1, first_name: "Alice", last_name: "Smith", email: "a@test.com" },
      { id: 2, first_name: "", last_name: "Jones", email: "b@test.com" },
      { id: 3, first_name: "Charlie", last_name: "", email: "c@test.com" },
    ];
    const result = transformMany(data);
    expect(result).toHaveLength(1);
  });
});

describe("calculateAgeStats", () => {
  it("should calculate correct min, max, avg", () => {
    const data = [
      { id: 1, first_name: "A", last_name: "B", email: "a@test.com", age: 20 },
      { id: 2, first_name: "C", last_name: "D", email: "c@test.com", age: 30 },
      { id: 3, first_name: "E", last_name: "F", email: "e@test.com", age: 40 },
    ];
    const result = calculateAgeStats(data);
    expect(result).toEqual({ min: 20, max: 40, avg: 30 });
  });

  it("should return null when no age data", () => {
    const data = [
      { id: 1, first_name: "A", last_name: "B", email: "a@test.com" },
    ];
    const result = calculateAgeStats(data);
    expect(result).toBeNull();
  });
});
