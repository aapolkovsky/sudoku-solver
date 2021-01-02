import { SArray, createSArray, Digit, toDigit, Index, SIZE } from './helpers';

export class SBitSet {
  static readonly ALL: number = (1 << SIZE) - 1;
  static readonly BITS: SArray<number> = createSArray(i => 1 << i);
  static readonly NEG_BITS: SArray<number> = createSArray(
    i => SBitSet.ALL - (1 << i),
  );

  constructor(public bits: number) {}

  set(index: Index): void {
    this.bits |= SBitSet.BITS[index];
  }

  get(index: Index): boolean {
    return !!(this.bits & SBitSet.BITS[index]);
  }

  clear(index: Index): void {
    this.bits &= SBitSet.NEG_BITS[index];
  }

  clearAll(): void {
    this.bits = 0;
  }

  empty(): boolean {
    return this.bits === 0;
  }

  cardinality(): number {
    if (this.empty()) {
      return 0;
    }

    let result = 0;

    // ts-as: nominal types conversion
    for (let i: Index = 0; i < SIZE; i = (i + 1) as Index) {
      if (this.bits & SBitSet.BITS[i]) {
        result += 1;
      }
    }

    return result;
  }

  lsb(): Index | null {
    if (this.empty()) {
      return null;
    }

    // ts-as: nominal types conversion
    for (let i: Index = 0; i < SIZE; i = (i + 1) as Index) {
      if (this.bits & SBitSet.BITS[i]) {
        return i;
      }
    }

    return null;
  }

  toDigitArray(): Digit[] {
    if (this.empty()) {
      return [];
    }

    const result: Digit[] = [];

    // ts-as: nominal types conversion
    for (let i: Index = 0; i < SIZE; i = (i + 1) as Index) {
      if (this.bits & SBitSet.BITS[i]) {
        result.push(toDigit(i));
      }
    }

    return result;
  }

  toDigitString() {
    return this.toDigitArray().join('');
  }
}
