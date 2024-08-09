import type { ItemInputRarity } from "./types";

export function groupByRarity<T extends ItemInputRarity>(items: T[]) {
  return items.reduce((acc, e) => ({
      ...acc,
      [e.probability]: [...(acc[e.probability] || []), e],
    }),
    {} as { [key: string]: T[]; },
  );
}
