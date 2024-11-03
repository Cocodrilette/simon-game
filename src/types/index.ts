/**
 * LightButton
 */

import { Dispatch, SetStateAction } from "react";

export type LigthButtonColor = "yellow" | "red" | "blue" | "green";

export enum LigthButtonState {
  On = "on",
  Off = "off",
}

export enum LigthButtonPosition {
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
}

export enum GameState {
  ShowingPattern = "showing-pattern",
  UserTrying = "user-traying",
  Off = "off",
  Lost = "lost",
}

export type UseStateSetter<T> = Dispatch<SetStateAction<T>>;
