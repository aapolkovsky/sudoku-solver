import {
  Digit,
  Index,
  toDigit,
  toIndex,
  createSArray,
  SArray,
  VectorType,
} from './helpers';
import { SBitSet } from './sbitset';
import { Cell } from './cell';
import { Solver } from './solver';

export class Vector {
  readonly digits = createSArray(() => new SBitSet(SBitSet.ALL));

  cells!: SArray<Cell>;

  constructor(
    protected solver: Solver,
    public readonly index: Index,
    public readonly type: VectorType,
  ) {}

  onSetValue(changedCell: Cell): void {
    const changedValue = changedCell.value as Digit;

    this.digits[toIndex(changedValue)].clearAll();
    this.digits.forEach(digitPos => {
      digitPos.clear(changedCell.indexes[this.type]);
    });

    this.cells.forEach(cell => {
      if (cell === changedCell || cell.known) {
        return;
      }

      // Cell possible values
      cell.options.clear(toIndex(changedValue));

      if (cell.options.cardinality() === 1) {
        cell.setValue(toDigit(cell.options.lsb()!));
      }

      // Values possible positions
      [cell.box, cell.col, cell.row].forEach(vec => {
        vec.digits[toIndex(changedValue)].clear(cell.indexes[vec.type]);
        vec.digits.forEach((digitPos, i) => {
          if (digitPos.cardinality() === 1) {
            const index = digitPos.lsb()!;

            vec.cells[index].setValue(toDigit(i as Index));
          }
        });
      });
    });
  }

  // todo: doubles, triples, quadruples, quintuples, sextuples, etc.
}
