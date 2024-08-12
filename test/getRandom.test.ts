import { expect, it, describe } from "@jest/globals";
import { getRandom } from "../lib/getRandom";

describe("generateRandom", () => {
  const items = [
    { probability: 1, name: "some item" },
    { probability: 1, name: "another item" },
  ];

  it("should return same element if seed is provided", () => {
    const firstResult = getRandom({ items, seed: "my-seed" });

    const result = getRandom({ items, seed: "my-seed" });

    expect(firstResult).toEqual(result);
  });

  it("shoudl return different element with for different seed", () => {
    const firstResult = getRandom({ items, seed: "my-seed" });

    const result = getRandom({ items, seed: "another-seed" });

    expect(firstResult).not.toEqual(result);
  });

  it("should return when seed its not provided", () => {
    expect(() => getRandom({ items })).not.toThrow();
  });

  it("should return weight on items when options is true", () => {
    const result = getRandom({ items, addWeight: true });

    expect("weight" in result).toBe(true);
  });
});
