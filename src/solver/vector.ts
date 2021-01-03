import {
  Index,
  indexToDigit,
  digitToIndex,
  VectorType,
  FIELD_SIZE,
} from './helpers';
import { SArray } from './sarray';
import { SBitSet } from './sbitset';
import { Cell } from './cell';
import { Solver } from './solver';

export class Vector {
  readonly digits = SArray.create(() => new SBitSet(SBitSet.ALL));

  // why-ts-non-null: deferred initialization
  readonly cells!: SArray<Cell>;

  rank: number = FIELD_SIZE;

  constructor(
    protected readonly solver: Solver,
    public readonly index: Index,
    public readonly type: VectorType,
  ) {}

  onSetValue(changedCell: Cell): void {
    if (changedCell.value === undefined) {
      return;
    }

    this.rank -= 1;

    const changedValue = changedCell.value;

    this.digits[digitToIndex(changedValue)].clearAll();

    SArray.forEach(this.digits, (digitPos, i) => {
      if (digitPos.empty()) {
        return;
      }

      digitPos.clear(changedCell.indexes[this.type]);

      if (digitPos.cardinality() === 1) {
        const index = digitPos.lsb();

        if (index !== undefined && !this.cells[index].planned) {
          this.cells[index].planned = true;

          this.solver.queue.push(() => {
            console.log(
              `set C${this.cells[index].col.index + 1}R${
                this.cells[index].row.index + 1
              } ` +
                `to ${indexToDigit(i)} (reason: last ${indexToDigit(i)} in ${
                  this.type
                } ${this.index + 1})`,
            );
            this.cells[index].setValue(indexToDigit(i));
          });
        }
      }
    });

    SArray.forEach(this.cells, cell => {
      if (cell === changedCell || cell.known()) {
        return;
      }

      // Cell possible values
      cell.options.clear(digitToIndex(changedValue));

      if (cell.options.cardinality() === 1) {
        const index = cell.options.lsb();

        if (index !== undefined && !cell.planned) {
          cell.planned = true;

          this.solver.queue.push(() => {
            console.log(
              `set C${cell.col.index + 1}R${
                cell.row.index + 1
              } to ${indexToDigit(index)} (reason: last option)`,
            );
            cell.setValue(indexToDigit(index));
          });
        }
      }

      // Values possible positions
      [cell.box, cell.col, cell.row].forEach(vec => {
        vec.digits[digitToIndex(changedValue)].clear(cell.indexes[vec.type]);

        SArray.forEach(vec.digits, (digitPos, i) => {
          if (digitPos.empty()) {
            return;
          }

          if (digitPos.cardinality() === 1) {
            const index = digitPos.lsb();

            if (index !== undefined && !vec.cells[index].planned) {
              vec.cells[index].planned = true;

              this.solver.queue.push(() => {
                console.log(
                  `set C${vec.cells[index].col.index + 1}R${
                    vec.cells[index].row.index + 1
                  } ` +
                    `to ${indexToDigit(i)} (reason: last ${indexToDigit(
                      i,
                    )} in ${vec.type} ${vec.index + 1})`,
                );
                vec.cells[index].setValue(indexToDigit(i));
              });
            }
          }
        });
      });
    });
  }

  // todo: doubles, triples, quadruples, quintuples, sextuples, etc
  // todo: subsets in box may be in the same row / col and vice versa
}
