import { describe, expect, it } from "@jest/globals";

import { filterArray } from "./filterArray";
describe("All tests for filterArray file", () => {
  describe("filterArray", () => {
    const itemsToExclude = ["Vegetable", "Plate"];

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
      const result = filterArray(array, itemsToExclude);
      expect(expected).toEqual(result);
    });
  });
});
