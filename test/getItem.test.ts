import { describe, expect, test } from "@jest/globals";
import type { RarityInput } from "../lib/types";
import { getItems } from "../lib/getItems";

describe("getItems", () => {
  describe("when has rarities", () => {
    const rarities: RarityInput[] = [
      {
        name: "common",
        probability: 0.8,
      },
      {
        name: "rare",
        probability: 0.2,
      },
    ];

    test("and items has rarity in probability", () => {
      const items = [
        {
          name: "some item",
          probability: "common",
        },
        {
          name: "another item",
          probability: "common",
        },
        {
          name: "some another item",
          probability: "rare",
        },
      ];

      const result = getItems({ items, rarities });

      expect(result.total).toEqual(1);
      expect(result.items).toEqual([
        {
          name: "some item",
          probability: 0.4,
          weight: 0.4,
        },
        {
          name: "another item",
          probability: 0.4,
          weight: 0.8,
        },
        {
          name: "some another item",
          probability: 0.2,
          weight: 1,
        },
      ]);
    });
    test("and items already grouped by rarity", () => {
      const items = {
        common: [{ name: "some item" }, { name: "another item" }],
        rare: [{ name: "some another item" }],
      };

      const result = getItems({ items, rarities });

      expect(result.total).toEqual(1);
      expect(result.items).toEqual([
        {
          name: "some item",
          probability: 0.4,
          weight: 0.4,
        },
        {
          name: "another item",
          probability: 0.4,
          weight: 0.8,
        },
        {
          name: "some another item",
          probability: 0.2,
          weight: 1,
        },
      ]);
    });
  });
});
