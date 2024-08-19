import { expect, it, describe } from "@jest/globals";
import { generatePool } from "../lib/generatePool";

describe("generatePool", () => {
  const items = [
    { probability: 1, name: "some item" },
    { probability: 1, name: "another item" },
  ];

  it("should return same element if seed is provided", () => {
    const firstResult = generatePool({ items, seed: "my-seed" });

    const result = generatePool({ items, seed: "my-seed" });

    expect(firstResult.random()).toEqual(result.random());
    expect(firstResult.random()).toEqual(result.random());
    expect(firstResult.random()).toEqual(result.random());
  });

  it("should return different element with for different seed", () => {
    const firstResult = generatePool({ items, seed: "my-seed" });

    const result = generatePool({ items, seed: "my-seed2" });

    expect(firstResult.random().item).not.toEqual(result.random().item);
  });

  it("should return when seed its not provided", () => {
    expect(() => generatePool({ items })).not.toThrow();
  });

  it("should return weight on items when options is true", () => {
    const result = generatePool({ items, addWeight: true });

    expect("weight" in result.random().item).toBe(true);
  });

  it("should generate sequential items given a index", () => {
    const result = generatePool({ items, seed: "my-seed", index: 9 });

    expect(result.random().seed).toBe("9.my-seed");
    expect(result.random().seed).toBe("10.my-seed");
    expect(result.random().seed).toBe("11.my-seed");
  });
});
