import type { PoolOptions } from "./types";
import { Chance } from "chance";
import { getItems } from "./getItems";

export function getRandom<T>(options: PoolOptions<T>): T | (T & { weight: number }) {
  const data = getItems(options);

  const seed = options.seed || Math.random() * 10000;

  const chance = Chance(seed);

  const sortedNumber = chance.floating({ min: 0, max: data.total, fixed: 10 });

  const itemWithWeight = data.items.find((e) => sortedNumber <= e.weight);

  const result = itemWithWeight || data.items.at(-1)!;

  if (options.addWeight) return result;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { weight, ...rest } = result;

  return rest as T;
}
