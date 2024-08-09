import type { PoolOptions, PoolOptionsRarity } from "./types";

export function optionsHasRarities<T>(
  options: PoolOptions<T>,
): options is PoolOptionsRarity<T> {
  return !!(options as PoolOptionsRarity<T>).rarities;
}
