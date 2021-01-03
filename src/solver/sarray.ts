import { FIELD_SIZE, Index } from './helpers';

export type SArray<T> = readonly [T, T, T, T, T, T, T, T, T];

// why-eslint-disable: no-redeclare doesn't support declaration merging
// eslint-disable-next-line no-redeclare
export const SArray = {
  create<T>(fn: (index: Index) => T): SArray<T> {
    const arr = new Array<T>(FIELD_SIZE);

    // why-ts-as: nominal types conversion
    for (let i: Index = 0; i < FIELD_SIZE; i = (i + 1) as Index) {
      arr[i] = fn(i);
    }

    // why-ts-as: readonly [T, T] !== T[]
    return (arr as unknown) as SArray<T>;
  },

  map<T, U = T>(
    arr: SArray<T>,
    fn: (value: T, index: Index, array: SArray<T>) => U,
    thisArg?: any,
  ): SArray<U> {
    // why-ts-as: variance, readonly [T, T] !== T[]
    return (arr.map(fn as any, thisArg) as unknown) as SArray<U>;
  },

  forEach<T>(
    arr: SArray<T>,
    fn: (value: T, index: Index, array: SArray<T>) => void,
    thisArg?: any,
  ): void {
    // why-ts-as: variance
    arr.forEach(fn as any, thisArg);
  },

  reduce<T, U = T>(
    arr: SArray<T>,
    fn: (acc: U, value: T, index: Index, array: SArray<T>) => U,
    start: U,
  ): U {
    // why-ts-as: variance
    return arr.reduce(fn as any, start);
  },

  find<T>(
    arr: SArray<T>,
    fn: (value: T, index: Index, array: SArray<T>) => boolean,
    thisArg?: any,
  ): T | undefined {
    // why-ts-as: variance
    return arr.find(fn as any, thisArg);
  },
} as const;
