import { Chance } from "chance";
import { Summary } from "./types";

type RandomParameters = {
  index: number;
  seed: string;
  data: Summary;
};

export function random(parameters: RandomParameters) {
  const { index, seed, data } = parameters;

  const itemSeed = `${index}.${seed}`;

  const chance = Chance(itemSeed);

  const sortedNumber = chance.floating({
    min: 0,
    max: data.total,
    fixed: 10,
  });

  const itemWithWeight = data.items.find((e) => sortedNumber <= e.weight);

  return {
    item: itemWithWeight || data.items.at(-1)!,
    seed: itemSeed,
  };
}
