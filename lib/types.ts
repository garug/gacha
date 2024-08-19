import { getItems } from "./getItems";

export type ItemWithProbability = { probability: number };

export type ItemInputRarity = { probability: string };

export type RarityInput = {
  name: string;
  probability: number;
};

type Overwrite<T, NewT> = Omit<T, keyof NewT> & NewT;

export type GroupedByRarity<T> = { [key: string]: T[] };

type DefaultInputPityOptions = {
  value: number;
};

export type DefaultPityOptions = {
  value: number;
  used: boolean;
};

type RarityPityOptions = Overwrite<
  DefaultInputPityOptions,
  {
    name: string;
  }
>;

type ProbabilityPityOptions<T> = Overwrite<
  DefaultInputPityOptions,
  {
    items: T[];
  }
>;

type DefaultPoolOptions<T> = {
  items: T[];
  seed?: string;
  index?: number;
  addWeight?: boolean;
  pitty?: Record<string, unknown>[];
};

export type PoolOptionsProbability<T> = Overwrite<
  DefaultPoolOptions<T>,
  {
    items: (T & { probability: number })[];
    pitty?: ProbabilityPityOptions<T>[];
  }
>;

export type PoolOptionsRarity<T> = Overwrite<
  DefaultPoolOptions<T>,
  {
    items: (T & ItemInputRarity)[];
    rarities: RarityInput[];
    pitty?: RarityPityOptions[];
  }
>;

export type PoolOptionsRaritySet<T> = Overwrite<
  DefaultPoolOptions<T>,
  {
    items: GroupedByRarity<T>;
    rarities: RarityInput[];
  }
>;

export type PoolOptions<T> =
  | PoolOptionsProbability<T>
  | PoolOptionsRarity<T>
  | PoolOptionsRaritySet<T>;

export type PoolResponse<T> = {
  random: () => {
    item: T;
    seed: string;
  };
};

export type Summary = ReturnType<typeof getItems>;
