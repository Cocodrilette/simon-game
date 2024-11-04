/**
 * LightButton
 */

import { Dispatch, SetStateAction } from "react";

export type LigthButtonColor = "yellow" | "red" | "blue" | "green";
export type LigthButtonPosition = "tr" | "tl" | "br" | "bl";

export enum LigthButtonState {
  On = "on",
  Off = "off",
}

export enum GameState {
  ShowingPattern = "showing-pattern",
  UserTrying = "user-traying",
  Off = "off",
  Lost = "lost",
}

export type UseStateSetter<T> = Dispatch<SetStateAction<T>>;
