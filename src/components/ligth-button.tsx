import { LigthButtonColor, LigthButtonPosition } from "@/types";
import { useEffect } from "react";

export function LigthButton({
  color,
  position,
  isActive,
  onClick,
}: {
  color: LigthButtonColor;
  position: LigthButtonPosition;
  isActive: boolean;
  onClick: () => void;
}) {
  useEffect(() => {
    if (isActive) {
      const audio = new Audio(`/sounds/${color}.mp3`);
      audio.play();
    }
  }, [isActive, color]);

  return (
    <>
      {" "}
      <button
        onClick={() => onClick()}
        className={`w-36 md:w-56 h-36 md:h-56 border-2 ${
          isActive ? `${color}-active` : `${color}-base`
        } ${position}`}
      ></button>
    </>
  );
}
