import React, { ReactElement, useState, Fragment } from 'react';

import { indexToDigit, SArray, Solver, VectorType } from 'solver';

import { Selector, SelectorState } from 'components/selector';
import { DigitOption } from 'components/digit-option';

import './styles.css';

export interface FieldComponentProps {
  solver: Solver;
}

export function FieldComponent({ solver }: FieldComponentProps): ReactElement {
  const [type, setType] = useState<SelectorState>(VectorType.Row);

  return (
    <div className="layout">
      <div className="layout__controls">
        <Selector value={type} onChange={setType} />
      </div>
      <div className="field">
        {SArray.map(solver.rows, row => (
          <div key={row.index} className="field-row">
            {SArray.map(row.cells, cell => (
              <div key={cell.col.index} className="field-cell">
                <Fragment>
                  <div className="field-cell__value">{cell.value}</div>
                  <div className="field-cell-options field-cell__layer">
                    {cell.options.toDigitString()}
                  </div>
                  <div className="field-cell-digits-options field-cell__layer">
                    {type !== 'disable'
                      ? SArray.map(cell[type].digits, (digitPos, i) => (
                          <DigitOption
                            key={i}
                            type={type}
                            digit={indexToDigit(i)}
                            visible={
                              // digitPos.cardinality() < 7 &&
                              digitPos.get(cell.indexes[type])
                            }
                          />
                        ))
                      : ''}
                  </div>
                </Fragment>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
