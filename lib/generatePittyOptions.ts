import { DefaultPityOptions, PoolOptions } from "./types";

export function generatePittyOptions<T>(
  options: PoolOptions<T>,
): DefaultPityOptions[] {
  return (options.pitty || []).map((e) => {
    const value = (e.value as number) || 0;

    return {
      value,
      used: false,
    };
  });
}
