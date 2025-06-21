import { Pool, PoolOptions } from "./types";
import { getRandom } from "./getRandom";

export function generatePool<T>(options: PoolOptions<T>): Pool<T> {
  return {
    random: () => getRandom(options),
  };
}
