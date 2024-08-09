import type { ItemInputRarity, ItemWithProbability, RarityInput } from "./types";
import { groupByRarity } from "./groupByRarity";
import { itemsWithProbabilities } from "./itemsWithProbability";

export function itemsWithRarities<T extends ItemInputRarity>(
  items: T[],
  rarities: RarityInput[],
) {
  const itemsByRarity = groupByRarity(items);

  const itemsWeight = rarities.reduce(
    (acc, e) => {
      const itemsWithRarity = itemsByRarity[e.name] || [];
      const probability = e.probability / itemsWithRarity.length;
      const itensWithProbability = itemsWithRarity.map((i) => ({
        ...i,
        probability,
      }));
      return [...acc, ...itensWithProbability];
    },
    [] as (ItemWithProbability & T)[],
  );

  return itemsWithProbabilities(itemsWeight);
}
