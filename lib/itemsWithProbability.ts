import type { ItemWithProbability } from "./types";

export function itemsWithProbabilities<T extends ItemWithProbability>(items: T[]) {
  let total = 0;

  const result = items.map((i) => {
    total += i.probability;
    return { ...i, weight: total };
  });

  return {
    total,
    items: result,
  };
}
