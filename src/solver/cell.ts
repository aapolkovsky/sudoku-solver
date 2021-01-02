import { Digit, MaybeDigit, toIndex, CellIds } from './helpers';
import { SBitSet } from './sbitset';
import { Vector } from './vector';
import { Solver } from './solver';

export class Cell {
  readonly options: SBitSet = new SBitSet(SBitSet.ALL);
  readonly indexes: CellIds = {} as CellIds;

  box!: Vector;
  col!: Vector;
  row!: Vector;

  constructor(
    protected readonly solver: Solver,
    protected _value: MaybeDigit,
  ) {}

  get value(): MaybeDigit {
    return this._value;
  }

  known(): boolean {
    return this._value !== null;
  }

  // todo: optimize flow
  setValue(value: Digit): void {
    // todo: optimize flow
    if (this._value === value) {
      console.log('!!! Allready set');
      return;
    }

    this._value = value;

    this.options.clearAll();

    [this.box, this.col, this.row].forEach(vec => {
      vec.digits[toIndex(value)].clearAll();
    });

    [this.box, this.col, this.row].forEach(e => {
      this.solver.queue.push(() => {
        e.onSetValue(this);
      });
    });
  }

  // todo: thermos, arrows, sandwiches, etc.
  // todo: doubles, triples, quadruples, quintuples, sextuples, etc.
}
