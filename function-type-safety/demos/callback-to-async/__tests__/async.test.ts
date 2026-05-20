import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  fetchDataPromise,
  fetchDataAsync,
  fetchMultiple,
  fetchDataCallback,
} from "../src/index.ts";

describe("fetchDataPromise", () => {
  it("resolves with the correct DataItem", async () => {
    const result = await fetchDataPromise(1);
    assert.deepEqual(result, { id: 1, value: "Item 1" });
  });
});

describe("fetchDataAsync", () => {
  it("resolves with the correct DataItem", async () => {
    const result = await fetchDataAsync(42);
    assert.deepEqual(result, { id: 42, value: "Item 42" });
  });
});

describe("fetchMultiple", () => {
  it("returns all requested items in order", async () => {
    const results = await fetchMultiple(1, 2, 3);
    assert.equal(results.length, 3);
    assert.deepEqual(results[0], { id: 1, value: "Item 1" });
    assert.deepEqual(results[1], { id: 2, value: "Item 2" });
    assert.deepEqual(results[2], { id: 3, value: "Item 3" });
  });
});
