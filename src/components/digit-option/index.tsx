import React, { ReactElement } from 'react';

import { Digit, VectorType } from 'solver';

import './styles.css';

export interface DigitOptionProps {
  visible: boolean;
  digit: Digit;
  type: VectorType;
}

export function DigitOption({
  visible,
  digit,
  type,
}: DigitOptionProps): ReactElement {
  const hidden = visible ? '' : 'digit-option--hidden';
  const typeColor = `digit-option--type_${type}`;

  return (
    <span key={digit} className={['digit-option', hidden, typeColor].join(' ')}>
      {digit}
    </span>
  );
}
