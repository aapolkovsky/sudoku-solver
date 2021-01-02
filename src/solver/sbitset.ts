import { SArray, createSArray, Digit, Index, SIZE } from './helpers';

export class SBitSet {
  static readonly ALL = (1 << SIZE) - 1;
  static readonly BITS = createSArray(i => 1 << i);
  static readonly NEG_BITS = SBitSet.BITS.map(
    bit => SBitSet.ALL - bit,
  ) as SArray<number>;

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

  cardinality(): number {
    let result = 0;

    for (let i = 0; i < SIZE; i += 1) {
      if (this.bits & SBitSet.BITS[i as Index]) {
        result += 1;
      }
    }

    return result;
  }

  lsb(): Index | null {
    for (let i = 0; i < SIZE; i += 1) {
      if (this.bits & SBitSet.BITS[i as Index]) {
        return i as Index;
      }
    }

    return null;
  }

  toDigitArray(): Digit[] {
    const result: Digit[] = [];

    for (let i = 0; i < SIZE; i += 1) {
      if (this.bits & SBitSet.BITS[i as Index]) {
        result.push((i + 1) as Digit);
      }
    }

    return result;
  }

  toDigitString() {
    return this.toDigitArray().join('');
  }
}
