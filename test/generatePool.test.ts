import { describe, expect, test } from "@jest/globals";
import { generatePool } from "../lib/generatePool";

describe("generatePool", () => {
  describe("should generate a pool of items", () => {
    test("with probabilities", () => {
      const items = [
        { name: "Some item", probability: 0.5 },
        { name: "Another item", probability: 0.5 },
      ];

      const pool = generatePool({ items });

      expect(pool).toBeDefined();
      const randomItem = pool.random();
      expect(items).toContainEqual(randomItem);
    });

    test("with rarities", () => {
      const rarities = [
        { name: "common", probability: 0.5 },
        { name: "rare", probability: 0.3 },
        { name: "epic", probability: 0.15 },
        { name: "legendary", probability: 0.05 },
      ];

      const items = [
        { name: "Some item", probability: "rare" },
        { name: "Another item", probability: "legendary" },
      ];

      const pool = generatePool({ items, rarities });

      expect(pool).toBeDefined();
      const randomItem = pool.random();
      expect(randomItem).toBeDefined();
    });

    test("with rarities set", () => {
      const rarities = [
        { name: "common", probability: 0.5 },
        { name: "rare", probability: 0.3 },
        { name: "epic", probability: 0.15 },
        { name: "legendary", probability: 0.05 },
      ];

      const items = {
        rare: [{ name: "Some item" }],
        legendary: [{ name: "Another item" }],
      };

      const pool = generatePool({ items, rarities });

      expect(pool).toBeDefined();
      const randomItem = pool.random();
      expect(randomItem).toBeDefined();
    });
  });
});
