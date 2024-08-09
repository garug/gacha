export type ItemWithProbability = { probability: number };

export type ItemInputRarity = { probability: string };

export type RarityInput = {
  name: string;
  probability: number;
};

export type PoolOptionsProbability<T> = {
  items: (T & { probability: number })[];
};

export type PoolOptionsRarity<T> = {
  items: (T & ItemInputRarity)[];
  rarities: RarityInput[];
};

export type PoolOptions<T> = {
  items: T[];
  seed?: string;
  addWeight?: boolean;
} & (PoolOptionsRarity<T> | PoolOptionsProbability<T>);
