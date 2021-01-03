import { Digit } from './helpers';
import { Vector } from './vector';
import { Cell } from './cell';

export enum ActionType {
  SetDigit,
  RemoveDigitFromVector,
}

export interface BaseAction {
  type: ActionType;
}

export interface SetDigitAction extends BaseAction {
  type: ActionType.SetDigit;
  cell: Cell;
  digit: Digit;
}

export interface RemoveDigitFromVectorAction extends BaseAction {
  type: ActionType.RemoveDigitFromVector;
  vector: Vector;
  digit: Digit;
}

export type Action = SetDigitAction | RemoveDigitFromVectorAction;

export interface ActionTypeToAction {
  readonly [ActionType.SetDigit]: SetDigitAction;
  readonly [ActionType.RemoveDigitFromVector]: RemoveDigitFromVectorAction;
}

export type ActionCreator<T extends ActionType> = (
  payload: Omit<ActionTypeToAction[T], 'type'>,
) => void;

function actionCreatorFactory<T extends ActionType>(type: T): ActionCreator<T> {
  return action => ({ type, ...action });
}

export const setDigit = actionCreatorFactory(ActionType.SetDigit);

export const removeDigitFromVector = actionCreatorFactory(
  ActionType.RemoveDigitFromVector,
);
