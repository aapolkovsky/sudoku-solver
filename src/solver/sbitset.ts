import { Digit, Index, indexToDigit, INDEXES, FIELD_SIZE } from './helpers';
import { SArray } from './sarray';

export class SBitSet {
  static readonly ALL: number = (1 << FIELD_SIZE) - 1;
  static readonly BITS: SArray<number> = SArray.create(i => 1 << i);
  static readonly NEG_BITS: SArray<number> = SArray.map(
    SBitSet.BITS,
    bit => SBitSet.ALL - bit,
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

  // https://stackoverflow.com/questions/43122082/efficiently-count-the-number-of-bits-in-an-integer-in-javascript
  cardinality(): number {
    if (this.empty()) {
      return 0;
    }

    let n = this.bits;

    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);

    return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
  }

  // https://www.geeksforgeeks.org/position-of-rightmost-set-bit/
  lsb(): Index | undefined {
    if (this.empty()) {
      return undefined;
    }

    let bit = this.bits & -this.bits;
    let lsb = 0;

    // why-eslint-disable: optimization
    // eslint-disable-next-line no-cond-assign
    for (; (bit >>>= 1); lsb += 1) {}

    // why-ts-as: due to optimization
    return lsb as Index;
  }

  toDigitArray(): Digit[] {
    if (this.empty()) {
      return [];
    }

    const result: Digit[] = [];

    SArray.forEach(INDEXES, i => {
      if (this.bits & SBitSet.BITS[i]) {
        result.push(indexToDigit(i));
      }
    });

    return result;
  }

  toDigitString() {
    return this.toDigitArray().join('');
  }
}
