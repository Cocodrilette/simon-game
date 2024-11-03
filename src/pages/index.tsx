import { LigthButton } from "@/components/ligth-button";
import {
  GameState,
  LigthButtonColor,
  LigthButtonPosition,
  LigthButtonState,
} from "@/types";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [level, setLevel] = useState(0);
  const [gameState, setGameState] = useState(GameState.Off);
  const [currentPattern, setCurrentPattern] = useState<LigthButtonColor[]>([]);
  const [userPattern, setUserPattern] = useState<LigthButtonColor[]>([]);
  const [buttonState, setButtonState] = useState({
    yellow: LigthButtonState.Off,
    red: LigthButtonState.Off,
    blue: LigthButtonState.Off,
    green: LigthButtonState.Off,
  });

  const buttonColorSchema =
    gameState !== GameState.Off && gameState !== GameState.Lost
      ? "bg-slate-200 border-gray-300 text-gray-300"
      : "bg-slate-100 border-gray-300 hover:bg-slate-200 hover:border-gray-400 text-black";

  useEffect(() => {
    if (gameState === GameState.ShowingPattern) {
    } else if (gameState === GameState.UserTrying) {
    } else if (gameState === GameState.Lost) {
    } else {
    }
  }, [gameState]);

  function handlePlayButtonClick() {
    if (gameState === GameState.Off || gameState === GameState.Lost) {
      setGameState(GameState.ShowingPattern);
    }
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid items-center justify-center min-h-screen p-5 font-[family-name:var(--font-geist-mono)]`}
    >
      <main className="flex flex-col row-start-2 items-center">
        <p
          className={`mb-20 text-xl ${
            gameState === GameState.Off ? "text-gray-500" : "text-white"
          }`}
        >
          Level {level}
        </p>
        <div className="bg-white p-1 gap-1 rounded-full grid grid-cols-2 grid-rows-2 border-2 border-gray-300">
          <LigthButton
            color="yellow"
            state={buttonState.yellow}
            position={LigthButtonPosition.TopLeft}
            mouseCanActivate={gameState === GameState.UserTrying}
          />
          <LigthButton
            color="red"
            state={buttonState.red}
            position={LigthButtonPosition.TopRight}
            mouseCanActivate={gameState === GameState.UserTrying}
          />
          <LigthButton
            color="green"
            state={buttonState.green}
            position={LigthButtonPosition.BottomLeft}
            mouseCanActivate={gameState === GameState.UserTrying}
          />
          <LigthButton
            color="blue"
            state={buttonState.blue}
            position={LigthButtonPosition.BottomRight}
            mouseCanActivate={gameState === GameState.UserTrying}
          />
        </div>

        <div className="mt-20 ">
          <button
            onClick={handlePlayButtonClick}
            className={`px-10 py-1 text-lg border-4 ${buttonColorSchema}`}
            disabled={
              gameState !== GameState.Off && gameState !== GameState.Lost
            }
          >
            Play
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
