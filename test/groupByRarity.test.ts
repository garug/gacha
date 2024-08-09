import { expect, it, describe } from "@jest/globals";
import { groupByRarity } from "../lib/groupByRarity";

describe("groupByRarity", () => {
  it("should group items by rarity", () => {
    const items = [
      { name: "item1", probability: "common" },
      { name: "item2", probability: "rare" },
      { name: "item3", probability: "common" },
      { name: "item4", probability: "rare" },
    ];

    const result = groupByRarity(items);

    expect(result).toEqual({
      common: [
        { name: "item1", probability: "common" },
        { name: "item3", probability: "common" },
      ],
      rare: [
        { name: "item2", probability: "rare" },
        { name: "item4", probability: "rare" },
      ],
    });
  });

  it("should return a empty object if empty array is provided", () => {
    const result = groupByRarity([]);

    expect(result).toEqual({});
  });
});
