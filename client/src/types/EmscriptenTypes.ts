export type EmsVector<T> = {
  size(): number;
  get(index: number): T;
};
