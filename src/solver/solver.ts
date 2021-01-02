import { Cell } from './cell';
import { createSArray, SArray, Index, VectorType, Input } from './helpers';
import { Vector } from './vector';

export class Solver {
  readonly rows: SArray<Vector> = this.createRows();
  readonly boxes: SArray<Vector> = this.createColsFromRows(this.rows);
  readonly cols: SArray<Vector> = this.createBoxesFromRows(this.rows);

  // todo: queues & types for them
  queue: Array<() => void> = [];

  // todo: thermos, arrows, sandwiches, etc.
  // todo: doubles, triples, quadruples, quintuples, sextuples, etc.

  private createRows(): SArray<Vector> {
    return createSArray(i => {
      const row = new Vector(this, i, VectorType.ROW);
      const cells = createSArray(() => new Cell(this, null));

      cells.forEach((cell, index) => {
        cell.row = row;
        cell.indexes.row = index as Index;
      });

      row.cells = cells;

      return row;
    });
  }

  private createColsFromRows(rows: SArray<Vector>): SArray<Vector> {
    return createSArray(i => {
      const col = new Vector(this, i, VectorType.COL);
      const cells = rows.map(row => row.cells[i]) as SArray<Cell>;

      cells.forEach((cell, index) => {
        cell.col = col;
        cell.indexes.col = index as Index;
      });

      col.cells = cells;

      return col;
    });
  }

  private createBoxesFromRows(rows: SArray<Vector>): SArray<Vector> {
    return createSArray(i => {
      const boxRow = Math.floor(i / 3);
      const boxCol = i % 3;
      const startRow = 3 * boxRow;
      const startCol = 3 * boxCol;

      const box = new Vector(this, i, VectorType.BOX);
      const cells = createSArray(j => {
        const cellTop = (startRow + Math.floor(j / 3)) as Index;
        const cellLeft = (startCol + (j % 3)) as Index;

        return rows[cellTop as Index].cells[cellLeft];
      });

      cells.forEach((cell, index) => {
        cell.box = box;
        cell.indexes.box = index as Index;
      });

      box.cells = cells;

      return box;
    });
  }
}

export function createSolverFromInput(input: Input) {
  const solver = new Solver();

  input.rows.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell) {
        solver.rows[i as Index].cells[j as Index].setValue(cell);
      }
    }),
  );

  return solver;
}
