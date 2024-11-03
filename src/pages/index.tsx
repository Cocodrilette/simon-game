import localFont from "next/font/local";
import { useEffect, useState } from "react";

import { LigthButton } from "@/components/ligth-button";
import {
  GameState,
  LigthButtonColor,
  LigthButtonPosition,
  LigthButtonState,
} from "@/types";
import { generateRandomColor } from "@/utils";

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
  const [remainingTime, setRemainingTime] = useState(0);

  const buttonColorSchema =
    gameState !== GameState.Off && gameState !== GameState.Lost
      ? "bg-slate-200 border-gray-300 text-gray-300"
      : "bg-slate-100 border-gray-300 hover:bg-slate-200 hover:border-gray-400 text-black";

  const updateCurrentPattern = async () => {
    if (level === 0) {
      setLevel(1);
      const initialPattern = [
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
      ];
      setCurrentPattern(initialPattern);
      await showPattern(initialPattern);
    } else {
      setLevel((prevLevel) => prevLevel + 1);
      setCurrentPattern((prevPattern) => {
        const newPattern = [...prevPattern, generateRandomColor()];
        showPattern(newPattern);
        return newPattern;
      });
    }
  };

  const showPattern = async (pattern: LigthButtonColor[]) => {
    for (const color of pattern) {
      setButtonState((prevButtonState) => ({
        ...prevButtonState,
        [color]: LigthButtonState.On,
      }));
      await new Promise((resolve) => setTimeout(resolve, 500));
      setButtonState((prevButtonState) => ({
        ...prevButtonState,
        [color]: LigthButtonState.Off,
      }));
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setGameState(GameState.UserTrying);
    setRemainingTime(pattern.length * 5); // Set the remaining time based on the pattern length
  };

  useEffect(() => {
    if (gameState === GameState.ShowingPattern) {
      updateCurrentPattern();
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === GameState.Lost) {
      setLevel(0);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === GameState.UserTrying) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            checkUserPattern();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const checkUserPattern = () => {
    if (userPattern.length === currentPattern.length) {
      if (JSON.stringify(userPattern) === JSON.stringify(currentPattern)) {
        setGameState(GameState.ShowingPattern);
        setUserPattern([]);
      } else {
        setGameState(GameState.Lost);
      }
    } else {
      setGameState(GameState.Lost);
    }
  };

  useEffect(() => {
    if (
      currentPattern.length > 0 &&
      userPattern.length === currentPattern.length
    ) {
      checkUserPattern();
    }
  }, [userPattern]);

  function handlePlayButtonClick() {
    if (gameState === GameState.Off || gameState === GameState.Lost) {
      setGameState(GameState.ShowingPattern);
    }

    if (gameState === GameState.Lost) {
      setGameState(GameState.ShowingPattern);
      setUserPattern([]);
      setCurrentPattern([]);
    }
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid items-center justify-center min-h-screen p-5 font-[family-name:var(--font-geist-mono)]`}
    >
      <main className="flex flex-col row-start-2 items-center">
        <p
          className={`text-xl mb-5 ${
            gameState === GameState.Off ? "text-gray-500" : "text-white"
          }`}
        >
          Level {level}
        </p>
        <div className="flex flex-wrap gap-0.5 mb-10 h-16">
          {/* @todo deactivate this when add level selection */}
          {userPattern.map((c, index) => {
            return <div className={`bg-${c}-400 w-5 h-5`} key={index} />;
          })}
        </div>
        <div className="bg-white p-1 gap-1 rounded-full grid grid-cols-2 grid-rows-2 border-2 border-gray-300">
          <LigthButton
            color="yellow"
            state={buttonState.yellow}
            position={LigthButtonPosition.TopLeft}
            mouseCanActivate={gameState === GameState.UserTrying}
            userPattern={userPattern}
            setUserPattern={setUserPattern}
          />
          <LigthButton
            color="red"
            state={buttonState.red}
            position={LigthButtonPosition.TopRight}
            mouseCanActivate={gameState === GameState.UserTrying}
            userPattern={userPattern}
            setUserPattern={setUserPattern}
          />
          <LigthButton
            color="green"
            state={buttonState.green}
            position={LigthButtonPosition.BottomLeft}
            mouseCanActivate={gameState === GameState.UserTrying}
            userPattern={userPattern}
            setUserPattern={setUserPattern}
          />
          <LigthButton
            color="blue"
            state={buttonState.blue}
            position={LigthButtonPosition.BottomRight}
            mouseCanActivate={gameState === GameState.UserTrying}
            userPattern={userPattern}
            setUserPattern={setUserPattern}
          />
        </div>

        <div className="mt-10 ">
          <button
            onClick={handlePlayButtonClick}
            className={`px-10 py-1 text-lg border-4 ${buttonColorSchema}`}
            disabled={
              gameState !== GameState.Off && gameState !== GameState.Lost
            }
          >
            {gameState === GameState.Off ? "Play" : "Reset"}
          </button>
        </div>
        <div className="h-10">
          {gameState === GameState.UserTrying && (
            <p className="mt-5 text-white">Time left: {remainingTime}s</p>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
