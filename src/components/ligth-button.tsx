import {
  LigthButtonColor,
  LigthButtonPosition,
  LigthButtonState,
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
}: {
  color: LigthButtonColor;
  state: LigthButtonState;
  position: LigthButtonPosition;
  mouseCanActivate: boolean;
}) {
  const colorSchema = {
    [LigthButtonState.On]: `bg-${color}-300 border-${color}-300 shadow-${color}-200`,
    [LigthButtonState.Off]: `border-${color}-500 bg-${color}-400`,
  };

  const [currentColorSchema, setCurrentColorSchema] = useState(
    colorSchema[LigthButtonState.Off]
  );

  useEffect(() => {
    setCurrentColorSchema(colorSchema[state]);
  }, [state]);

  return (
    <div
      onClick={() => {
        mouseCanActivate &&
          setCurrentColorSchema(colorSchema[LigthButtonState.On]);
        setTimeout(
          () => setCurrentColorSchema(colorSchema[LigthButtonState.Off]),
          500
        );
      }}
      className={`w-40 h-40 border-2 ${positionRounding[position]} ${currentColorSchema}`}
    />
  );
}
