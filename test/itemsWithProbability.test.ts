import { expect, test, describe } from "@jest/globals";
import { itemsWithProbabilities } from "../lib/itemsWithProbability";

describe("itemsWithProbabilities", () => {
  test("when a empty array is passed, should return total 0 and items empty", () => {
    const result = itemsWithProbabilities([]);
    expect(result).toEqual({ total: 0, items: [] });
  });

  test("unique item is passed, should return total as same as probability and items with weight", () => {
    const result = itemsWithProbabilities([{
      probability: 1,
      name: "some item",
    }]);
    expect(result.total).toEqual(1);
    expect(result.items).toEqual([{
      probability: 1,
      name: "some item",
      weight: 1,
    }]);
  });

  test("decimal probability is passed, should handle with it", () => {
    const result = itemsWithProbabilities([{
      probability: 0.5,
      name: "some item",
    }, {
      probability: 0.4,
      name: "another item",
    }]);

    expect(result.total).toEqual(0.9);
    expect(result.items).toEqual([{
      probability: 0.5,
      name: "some item",
      weight: 0.5,
    }, {
      probability: 0.4,
      name: "another item",
      weight: 0.9,
    }]);
  });
});
