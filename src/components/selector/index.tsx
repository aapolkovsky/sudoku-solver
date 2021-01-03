import React, { ReactElement, useCallback, ChangeEventHandler } from 'react';

import { VECTOR_TYPES } from 'solver';

export const SELECTOR_STATES = [...VECTOR_TYPES, 'disable'] as const;

export type SelectorState = typeof SELECTOR_STATES[number];

export interface SelectorProps {
  onChange: (state: SelectorState) => void;
  value: SelectorState;
}

export function Selector({ onChange, value }: SelectorProps): ReactElement {
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    // why-ts-as: dom to model conversion
    e => onChange(e.target.value as SelectorState),
    [onChange],
  );

  return (
    <select value={value} onChange={handleChange}>
      {SELECTOR_STATES.map(type => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}
