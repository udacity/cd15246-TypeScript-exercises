// TODO: Import the functions to test
// import { transformUserData, transformMany, calculateAgeStats } from "../src/index";

describe("transformUserData", () => {
  // TODO: Test basic transformation
  it("should transform a valid user", () => {
    // Write test here
  });

  // TODO: Test adult detection
  it("should mark user as adult when age >= 18", () => {
    // Write test here
  });

  // TODO: Test minor detection
  it("should mark user as minor when age < 18", () => {
    // Write test here
  });

  // TODO: Test missing age
  it("should set isAdult to false when age is missing", () => {
    // Write test here
  });
});

describe("transformMany", () => {
  // TODO: Test multiple users
  it("should transform multiple valid users", () => {
    // Write test here
  });

  // TODO: Test filtering invalid entries
  it("should filter out entries with missing first_name", () => {
    // Write test here
  });
});

describe("calculateAgeStats", () => {
  // TODO: Test age statistics
  it("should calculate correct min, max, avg", () => {
    // Write test here
  });

  // TODO: Test empty data
  it("should return null when no age data", () => {
    // Write test here
  });
});
