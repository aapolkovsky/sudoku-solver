import { SArray } from './sarray';

export const FIELD_SIZE = 9;

export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type MaybeDigit = Digit | undefined;

export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const BOX_SIZE = 3;

export enum VectorType {
  Box = 'box',
  Col = 'col',
  Row = 'row',
}

export const VECTOR_TYPES = [
  VectorType.Box,
  VectorType.Col,
  VectorType.Row,
] as const;

export const OTHER_TYPES_MAP = {
  [VectorType.Box]: [VectorType.Col, VectorType.Row],
  [VectorType.Col]: [VectorType.Box, VectorType.Row],
  [VectorType.Row]: [VectorType.Box, VectorType.Col],
} as const;

export interface CellIds {
  readonly [VectorType.Box]: Index;
  readonly [VectorType.Col]: Index;
  readonly [VectorType.Row]: Index;
}

export function indexToDigit(index: Index): Digit {
  // why-ts-as: nominal types conversion
  return (index + 1) as Digit;
}

export function digitToIndex(digit: Digit): Index {
  // why-ts-as: nominal types conversion
  return (digit - 1) as Index;
}

export const DIGITS = SArray.create(i => indexToDigit(i));
export const INDEXES = SArray.create(i => i);

// // todo: remove if unnecessary
// export function toBoxIndex(rowIndex: Index, colIndex: Index): Index {
//   const top = rowIndex % BOX_SIZE;
//   const left = colIndex % BOX_SIZE;

//   // why-ts-as: nominal types conversion
//   return (top * BOX_SIZE + left) as Index;
// }
