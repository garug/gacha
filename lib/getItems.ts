import type { PoolOptions } from "./types";
import { itemsWithProbabilities } from "./itemsWithProbability";
import { itemsWithRarities } from "./itemsWithRarity";
import { groupByRarity } from "./groupByRarity";

export function getItems<T>(options: PoolOptions<T>) {
  if ("rarities" in options) {
    const items = Array.isArray(options.items)
      ? groupByRarity(options.items)
      : options.items;

    return itemsWithRarities(items, options.rarities);
  }

  return itemsWithProbabilities(options.items);
}
