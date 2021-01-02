import React, {
  ReactElement,
  useCallback,
  useState,
  ChangeEventHandler,
} from 'react';

import { Solver, VectorType, VECTOR_TYPES } from 'solver';
import { Index, toDigit, toBoxIndex } from 'solver/helpers';

interface FieldComponentProps {
  solver: Solver;
}

export function FieldComponent({ solver }: FieldComponentProps): ReactElement {
  const [currentType, setCurrentType] = useState<VectorType | 'disable'>(
    VectorType.ROW,
  );

  const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    e => {
      setCurrentType(e.target.value as VectorType | 'disable');
    },
    [setCurrentType],
  );

  return (
    <div className="layout">
      <select value={currentType} onChange={onChange}>
        {[...VECTOR_TYPES, 'disable'].map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div className="field">
        {solver.rows.map((row, rowId) => (
          <div key={rowId} className="field-row">
            {row.cells.map((cell, colId) => (
              <div key={colId} className="field-cell">
                <>
                  <div className="field-cell__value">{cell.value}</div>
                  <div className="field-cell__layer field-cell__layer--center">
                    {cell.options.toDigitString()}
                  </div>
                  <div className="field-cell__layer field-cell__layer--top">
                    {currentType === VectorType.ROW
                      ? cell.row.digits.map((digitPos, i) => {
                          const visible = digitPos.get(colId as Index);

                          return (
                            <span key={i} className={visible ? '' : 'hidden'}>
                              {toDigit(i as Index)}
                            </span>
                          );
                        })
                      : currentType === VectorType.COL
                      ? cell.col.digits.map((digitPos, i) => {
                          const visible = digitPos.get(rowId as Index);

                          return (
                            <span key={i} className={visible ? '' : 'hidden'}>
                              {toDigit(i as Index)}
                            </span>
                          );
                        })
                      : currentType === VectorType.BOX
                      ? cell.box.digits.map((digitPos, i) => {
                          const visible = digitPos.get(
                            toBoxIndex(rowId as Index, colId as Index),
                          );

                          return (
                            <span key={i} className={visible ? '' : 'hidden'}>
                              {toDigit(i as Index)}
                            </span>
                          );
                        }) /** TODO */
                      : ''}
                  </div>
                </>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
