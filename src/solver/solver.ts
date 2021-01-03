import { Index, VectorType, BOX_SIZE } from './helpers';
import { Action } from './action';
import { SArray } from './sarray';
import { Vector } from './vector';
import { Cell } from './cell';
import { Input } from './input';

export class Solver {
  // todo: rewrite
  static fromInput(input: Input) {
    const solver = new Solver();

    SArray.forEach(input.rows, (row, i) =>
      SArray.forEach(row, (cell, j) => {
        if (cell !== undefined) {
          solver.rows[i].cells[j].setValue(cell);
        }
      }),
    );

    return solver;
  }

  readonly rows: SArray<Vector> = this.createRows();
  readonly cols: SArray<Vector> = this.createColsFromRows(this.rows);
  readonly boxes: SArray<Vector> = this.createBoxesFromRows(this.rows);

  // todo: queues & types for them
  readonly queue: Array<() => void> = [];

  readonly _queue: Action[] = [];

  dispatch(action: Action): void {
    this._queue.push(action);
  }

  process(): void {}

  // todo: thermos, arrows, sandwiches, etc
  // todo: doubles, triples, quadruples, quintuples, sextuples, etc

  private createRows(): SArray<Vector> {
    return SArray.create(i => {
      const row = new Vector(this, i, VectorType.Row);
      const cells = SArray.create(() => new Cell(this));

      SArray.forEach(cells, (cell, index) => {
        // why-ts-as: deferred initialization
        (cell.row as any) = row;

        // why-ts-as: deferred initialization
        (cell.indexes.row as any) = index;
      });

      // why-ts-as: deferred initialization
      (row.cells as any) = cells;

      return row;
    });
  }

  private createColsFromRows(rows: SArray<Vector>): SArray<Vector> {
    return SArray.create(i => {
      const col = new Vector(this, i, VectorType.Col);
      const cells = SArray.map(rows, row => row.cells[i]);

      SArray.forEach(cells, (cell, index) => {
        // why-ts-as: deferred initialization
        (cell.col as any) = col;

        // why-ts-as: deferred initialization
        (cell.indexes.col as any) = index;
      });

      // why-ts-as: deferred initialization
      (col.cells as any) = cells;

      return col;
    });
  }

  private createBoxesFromRows(rows: SArray<Vector>): SArray<Vector> {
    return SArray.create(i => {
      const boxRow = Math.floor(i / BOX_SIZE);
      const boxCol = i % BOX_SIZE;
      const startRow = BOX_SIZE * boxRow;
      const startCol = BOX_SIZE * boxCol;

      const box = new Vector(this, i, VectorType.Box);
      const cells = SArray.create(j => {
        // why-ts-as: nominal types conversion
        const cellTop = (startRow + Math.floor(j / BOX_SIZE)) as Index;

        // why-ts-as: nominal types conversion
        const cellLeft = (startCol + (j % BOX_SIZE)) as Index;

        return rows[cellTop].cells[cellLeft];
      });

      SArray.forEach(cells, (cell, index) => {
        // why-ts-as: deferred initialization
        (cell.box as any) = box;

        // why-ts-as: deferred initialization
        (cell.indexes.box as any) = index;
      });

      // why-ts-as: deferred initialization
      (box.cells as any) = cells;

      return box;
    });
  }
}
