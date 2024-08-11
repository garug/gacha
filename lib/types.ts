export type ItemWithProbability = { probability: number };

export type ItemInputRarity = { probability: string };

export type RarityInput = {
  name: string;
  probability: number;
};

type Overwrite<T, NewT> = Omit<T, keyof NewT> & NewT;

export type GroupedByRarity<T> = { [key: string]: T[] };

type DefaultPoolOptions<T> = {
  items: T[];
  seed?: string;
  addWeight?: boolean;
};

export type PoolOptionsProbability<T> = Overwrite<
  DefaultPoolOptions<T>,
  {
    items: (T & { probability: number })[];
  }
>;

export type PoolOptionsRarity<T> = Overwrite<
  DefaultPoolOptions<T>,
  {
    items: (T & ItemInputRarity)[];
    rarities: RarityInput[];
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
