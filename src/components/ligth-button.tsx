import {
  LigthButtonColor,
  LigthButtonPosition,
  LigthButtonState,
  UseStateSetter,
} from "@/types";
import { useEffect, useState } from "react";

const positionRounding = {
  [LigthButtonPosition.TopLeft]: "rounded-tl-full",
  [LigthButtonPosition.TopRight]: "rounded-tr-full",
  [LigthButtonPosition.BottomRight]: "rounded-br-full",
  [LigthButtonPosition.BottomLeft]: "rounded-bl-full",
};

export function LigthButton({
  color,
  state,
  position,
  mouseCanActivate,
  userPattern,
  setUserPattern,
}: {
  color: LigthButtonColor;
  state: LigthButtonState;
  position: LigthButtonPosition;
  mouseCanActivate: boolean;
  userPattern: LigthButtonColor[];
  setUserPattern: UseStateSetter<LigthButtonColor[]>;
}) {
  const colorSchema = {
    [LigthButtonState.On]: `bg-${color}-200 border-${color}-300 shadow-${color}-200`,
    [LigthButtonState.Off]: `border-${color}-500 bg-${color}-400`,
  };

  const [currentColorSchema, setCurrentColorSchema] = useState(
    colorSchema[LigthButtonState.Off]
  );

  useEffect(() => {
    setCurrentColorSchema(colorSchema[state]);
  }, [state]);

  function turnOn() {
    setCurrentColorSchema(colorSchema[LigthButtonState.On]);
    setTimeout(
      () => setCurrentColorSchema(colorSchema[LigthButtonState.Off]),
      500
    );
  }

  function handleUserSelection() {
    setUserPattern([...userPattern, color]);
  }

  function handleClick() {
    if (mouseCanActivate) {
      handleUserSelection();
      turnOn();
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`w-40 h-40 border-2 ${positionRounding[position]} ${currentColorSchema}`}
    />
  );
}
