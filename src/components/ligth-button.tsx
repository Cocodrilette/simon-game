import {
  LigthButtonColor,
  LigthButtonPosition,
  LigthButtonState,
  UseStateSetter,
} from "@/types";
import { useEffect, useState } from "react";

export function LigthButton({
  color,
  position,
  isActive,
}: {
  color: LigthButtonColor;
  position: LigthButtonPosition;
  isActive: boolean;
}) {
  const colorSchema = {
    [LigthButtonState.On]: `bg-${color}-200 border-${color}-300 shadow-${color}-200`,
    [LigthButtonState.Off]: `border-${color}-500 bg-${color}-400`,
  };

  return (
    <button
      className={`w-36 md:w-56 h-36 md:h-56 border-2 ${
        isActive ? `${color}-active` : `${color}-base`
      } ${position}`}
    ></button>
  );
}
