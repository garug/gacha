import { Chance } from "chance";

type GachaItemInputProbability = {
  name: string;
  probability: number;
};

type GachaItemInputRarity = {
  name: string;
  probability: string;
};

type GachaRarityInput = {
  name: string;
  probability: number;
};

type GachaPoolOptionsProbability = {
  items: GachaItemInputProbability[];
  seed?: string;
};

type GachaPoolOptionsRarity = {
  items: GachaItemInputRarity[];
  rarities: GachaRarityInput[];
  seed?: string;
};

type GachaPoolOptions = GachaPoolOptionsRarity | GachaPoolOptionsProbability;

type GachaItem = {
  name: string;
  weight: number;
};

const chance = Chance();

function groupByRarity(items: GachaItemInputRarity[]) {
  return items.reduce(
    (acc, e) => ({
      ...acc,
      [e.probability]: [...(acc[e.probability] || []), e],
    }),
    {} as {
      [key: string]: GachaItemInputRarity[];
    },
  );
}

function itemsWithProbabilities(
  items: GachaItemInputProbability[],
): GachaItem[] {
  let accumulatedWeight = 0;

  return items
    .map((i) => {
      accumulatedWeight += i.probability;
      return { ...i, weight: accumulatedWeight };
    })
    .toReversed();
}

function itemsWithRarities(
  items: GachaItemInputRarity[],
  rarities: GachaRarityInput[],
): GachaItem[] {
  const itemsByRarity = groupByRarity(items);

  const itemsWeight = rarities.reduce((acc, e) => {
    const items = itemsByRarity[e.name] || [];
    const probability = e.probability / items.length;
    const itensWithProbability = items.map((i) => ({
      name: i.name,
      probability,
    }));
    return [...acc, ...itensWithProbability];
  }, [] as GachaItemInputProbability[]);

  return itemsWithProbabilities(itemsWeight);
}

function optionsWithRarities(
  options: GachaPoolOptions,
): options is GachaPoolOptionsRarity {
  return !!(options as GachaPoolOptionsRarity).rarities;
}

export function getRandom(options: GachaPoolOptions) {
  const items = optionsWithRarities(options)
    ? itemsWithRarities(options.items, options.rarities)
    : itemsWithProbabilities(options.items);

  const max = items.reduce((acc, e) => acc + e.weight, 0);

  const sortedNumber = chance.floating({ min: 0, max, fixed: 10 });

  return items.find((e) => e.weight <= sortedNumber) || items.at(-1);
}
