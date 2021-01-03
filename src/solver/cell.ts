import {
  Digit,
  MaybeDigit,
  digitToIndex,
  CellIds,
  VECTOR_TYPES,
} from './helpers';
import { SBitSet } from './sbitset';
import { Vector } from './vector';
import { Solver } from './solver';

export class Cell {
  readonly options: SBitSet = new SBitSet(SBitSet.ALL);

  // why-ts-as: partial initialization
  readonly indexes: CellIds = {} as CellIds;

  // why-ts-non-null: deferred initialization
  readonly box!: Vector;

  // why-ts-non-null: deferred initialization
  readonly col!: Vector;

  // why-ts-non-null: deferred initialization
  readonly row!: Vector;

  protected _value: MaybeDigit = undefined;

  planned: boolean = false;

  constructor(protected readonly solver: Solver) {}

  get value(): MaybeDigit {
    return this._value;
  }

  known(): boolean {
    return this._value !== undefined;
  }

  // todo: rewrite
  setValue(value: Digit): void {
    if (this._value === value) {
      return;
    }

    this._value = value;

    this.options.clearAll();

    VECTOR_TYPES.forEach(type => {
      this[type].digits[digitToIndex(value)].clearAll();
    });

    VECTOR_TYPES.forEach(type => {
      this[type].onSetValue(this);
    });
  }

  // todo: thermos, arrows, sandwiches, etc
  // todo: doubles, triples, quadruples, quintuples, sextuples, etc
}
