import React from 'react';
import { render } from 'react-dom';

import { FieldComponent } from 'components/field';
import { Input, createSolverFromInput, SArray, MaybeDigit } from 'solver';

import './styles.css';

// ---------------------------
// Input example
// ---------------------------

const _ = null;

const testRows = [
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

const testField: Input = {
  rows: testRows,
};

const solver = ((window as any).solver = createSolverFromInput(testField));

let i = 0;

i = 0;
while (solver.queue.length !== 0 && i++ < 10000) {
  solver.queue.shift()!();
}
console.log(i);
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }
// i = 0;
// while (solver.queue.length !== 0 && i++ < 10000) {
//   solver.queue.shift()!();
// }

const rootElement = document.getElementById('root');

render(<FieldComponent solver={solver} />, rootElement);
