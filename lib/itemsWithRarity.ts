import type {
  GroupedByRarity,
  ItemWithProbability,
  RarityInput,
} from "./types";
import { itemsWithProbabilities } from "./itemsWithProbability";

export function itemsWithRarities<T>(
  items: GroupedByRarity<T>,
  rarities: RarityInput[],
) {
  const itemsWeight = rarities.reduce(
    (acc, e) => {
      const itemsWithRarity = items[e.name] || [];
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
