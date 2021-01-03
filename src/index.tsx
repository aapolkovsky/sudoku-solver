import React from 'react';
import { render } from 'react-dom';

import { FieldComponent } from 'components/field';
import { Input, Solver, SArray, MaybeDigit } from 'solver';

import './styles.css';

const _ = undefined;

// why-ts-as: nominal types conversion
const testRows1 = [
  [1, _, _, /**/ _, 7, _, /**/ _, 3, _],
  [8, 3, _, /**/ 6, _, _, /**/ _, _, _],
  [_, _, 2, /**/ 9, _, _, /**/ 6, _, 8],
  /* -------------------------------- */
  [6, _, _, /**/ _, _, 4, /**/ 9, _, 7],
  [_, 9, _, /**/ _, _, _, /**/ _, 5, _],
  [3, _, 7, /**/ 5, _, _, /**/ _, _, 4],
  /* -------------------------------- */
  [2, _, 3, /**/ _, _, 9, /**/ 1, _, _],
  [_, _, _, /**/ _, _, 2, /**/ _, 4, 3],
  [_, 4, _, /**/ _, 8, _, /**/ _, _, 9],
] as SArray<SArray<MaybeDigit>>;

// why-ts-as: nominal types conversion
const testRows = [
  [5, _, _, /**/ 2, _, _, /**/ _, 4, _],
  [_, _, _, /**/ 6, _, 3, /**/ _, _, _],
  [_, 3, _, /**/ _, _, 9, /**/ _, _, 7],
  /* -------------------------------- */
  [_, _, 3, /**/ _, _, 7, /**/ _, _, _],
  [_, _, 7, /**/ _, _, 8, /**/ _, _, _],
  [6, _, _, /**/ _, _, _, /**/ _, 2, _],
  /* -------------------------------- */
  [_, 8, _, /**/ _, _, _, /**/ _, _, 3],
  [_, _, _, /**/ 4, _, _, /**/ 6, _, _],
  [_, _, _, /**/ 1, _, _, /**/ 5, _, _],
] as SArray<SArray<MaybeDigit>>;

const testField: Input = {
  rows: testRows,
};

// why-ts-as: debug
const solver = ((window as any).solver = Solver.fromInput(testField));

const rootElement = document.getElementById('root');

let i = 0;

const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));

(async () => {
  do {
    render(<FieldComponent solver={solver} />, rootElement);
    await timeout(4000);

    solver.queue.shift()?.();
    i += 1;
  } while (solver.queue.length !== 0);

  console.log(i);

  render(<FieldComponent solver={solver} />, rootElement);
})();
