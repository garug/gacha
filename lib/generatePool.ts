import { getItems } from "./getItems";
import { PoolOptions, PoolResponse } from "./types";
import { random } from "./random";

export function generatePool<T>(options: PoolOptions<T>): PoolResponse<T> {
  const data = getItems(options);

  const seed = options.seed || String(Math.random() * 10000);

  let index = options.index || 0;

  function exportedRandom(): PoolResponse<T> {
    const result = random({ index: index++, seed, data });

    if (options.addWeight)
      return {
        item: result.item,
        seed: result.seed,
      };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { weight, ...rest } = result.item;

    return {
      item: rest as T,
      seed: result.seed,
    };
  }

  return {
    random: exportedRandom,
  };
}
