// ---------------------------
// Model types
// ---------------------------

const SIZE = 9;

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type MaybeDigit = Digit | null;

export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type SArray<T> = readonly [T, T, T, T, T, T, T, T, T];

export function createSArray<T>(factory: (index: Index) => T): SArray<T> {
  const arr = new Array<T>(SIZE);

  for (let i = 0; i < SIZE; i += 1) {
    arr[i] = factory(i as Index);
  }

  // ts-as: [T, T] !== readonly T[]
  return (arr as unknown) as SArray<T>;
}

export enum VectorType {
  BOX = 'box',
  COL = 'col',
  ROW = 'row',
}

export const VECTOR_TYPES = [
  VectorType.BOX,
  VectorType.COL,
  VectorType.ROW,
] as const;

export interface CellIds {
  [VectorType.BOX]: Index;
  [VectorType.COL]: Index;
  [VectorType.ROW]: Index;
}

export function toDigit(index: Index): Digit {
  // ts-as: nominal types conversion
  return (index + 1) as Digit;
}

export function toIndex(digit: Digit): Index {
  // ts-as: nominal types conversion
  return (digit - 1) as Index;
}

export const POSSIBLE_VALUES = createSArray(i => toDigit(i));

export function toBoxIndex(rowIndex: Index, colIndex: Index): Index {
  const top = rowIndex % 3;
  const left = colIndex % 3;

  // ts-as: nominal types conversion
  return (top * 3 + left) as Index;
}

// ---------------------------
// Input types
// ---------------------------

export interface Input {
  rows: SArray<SArray<MaybeDigit>>;

  // todo: thermos, arrows, sandwiches, etc.
}
