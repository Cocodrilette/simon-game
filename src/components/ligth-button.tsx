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
    const audio = new Audio(`/sounds/${color}.mp3`);
    if (isActive) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isActive, color]);

  return (
    <>
      {" "}
      <button
        onClick={() => onClick()}
        className={`w-36 md:w-56 h-36 md:h-56 border-2 m-1 ${
          isActive ? `${color}-active` : `${color}-base`
        } ${position}`}
      ></button>
    </>
  );
}
