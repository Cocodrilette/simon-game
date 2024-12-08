import { useEffect } from "react";
import JSConfetti from "js-confetti";

interface ConfettiProps {
  isActive?: boolean;
}

export const Confetti = ({ isActive = true }: ConfettiProps) => {
  useEffect(() => {
    if (!isActive) return;

    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
      emojis: ["🥳", "👌", "🐕"],
      emojiSize: 30,
    });

    return () => {
      jsConfetti.clearCanvas();
    };
  }, [isActive]);

  return null;
};
