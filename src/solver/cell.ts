import { Digit, MaybeDigit, CellIds } from './helpers';
import { SBitSet } from './sbitset';
import { Vector } from './vector';
import { Solver } from './solver';

export class Cell {
  readonly options: SBitSet = new SBitSet(SBitSet.ALL);

  indexes: CellIds = {} as CellIds;

  box!: Vector;
  col!: Vector;
  row!: Vector;

  constructor(protected solver: Solver, protected _value: MaybeDigit) {}

  get known(): boolean {
    return this._value !== null;
  }

  get value(): MaybeDigit {
    return this._value;
  }

  // todo: optimize flow
  setValue(value: Digit): void {
    // todo: optimize flow
    if (this._value === value) {
      return;
    }

    this._value = value;

    this.options.clearAll();

    [this.box, this.col, this.row].forEach(e => {
      this.solver.queue.push(() => e.onSetValue(this));
    });
  }

  // todo: thermos, arrows, sandwiches, etc.
  // todo: doubles, triples, quadruples, quintuples, sextuples, etc.
}
