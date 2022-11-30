import { describe, expect, it } from "@jest/globals";

import { filterArray } from "./filterArray";

const itemsToExcludeTest = [
  "Container",
  "Food",
  "Vegetable",
  "Tableware",
  "Table",
  "Spoon",
  "Fork",
  "Knife",
  "Plate",
];

describe("All tests for filterArray file", () => {
  describe("filterArray", () => {
    const array = [
      "Tomato",
      "Pepper",
      "Plate",
      "Cabbage",
      "Vegetable",
      "Onion",
    ];
    const expected = ["Tomato", "Pepper", "Cabbage", "Onion"];
    it("should not include items that are not food ingredients", () => {
      const result = filterArray(array, itemsToExcludeTest);
      expect(expected).toEqual(result);
    });
  });
});
