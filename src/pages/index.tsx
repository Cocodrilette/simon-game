import { LigthButton } from "@/components/ligth-button";
import { GameState, LigthButtonColor } from "@/types";
import { getRandomInt } from "@/utils";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

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

// const MAX_LEVEL = 32;
const COLORS: LigthButtonColor[] = ["red", "green", "yellow", "blue"];
/**
 * Time in ms to wait for the user to click the buttons for each level
 * @todo Implement this
 * @todo Can be a function of the level
 */
// const TIME = 5000;
/**
 * Time in ms to show a color button on
 */
const ON_TIME = 700;
/**
 * Time in ms to wait for the next level to start
 */
const WAIT_TIME = 1000;

export default function Home() {
  const [level, setLevel] = useState(0);
  const [gameState, setGameState] = useState(GameState.Off);

  const [userPattern, setUserPattern] = useState<LigthButtonColor[]>([]);
  const [pattern, setPattern] = useState<LigthButtonColor[]>([]);

  const [showConfeti, setShowConfeti] = useState(false);

  const [buttonState, setButtonState] = useState<{
    [LigthButtonColor: string]: boolean;
  }>({
    yellow: false,
    green: false,
    red: false,
    blue: false,
  });

  const { width, height } = useWindowSize();

  function handleGameStart() {
    if (level === 0) {
      handleFirstLevel();
    } else {
      handleLevel();
    }
  }

  function handleFirstLevel() {
    const newPattern = [
      COLORS[getRandomInt()],
      COLORS[getRandomInt()],
      COLORS[getRandomInt()],
    ];
    setLevel(1);
    setPattern(newPattern);
    showLevel(newPattern);
  }

  function handleLevel() {
    const newPattern = [...pattern, COLORS[getRandomInt()]];
    setLevel((prev) => prev + 1);
    setPattern(newPattern);
    showLevel(newPattern);
  }

  async function showLevel(currentPattern: LigthButtonColor[]) {
    setUserPattern([]);

    for (let i = 0; i < currentPattern.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
      setButtonState((prev) => ({ ...prev, [currentPattern[i]]: true }));
      await new Promise((resolve) => setTimeout(resolve, ON_TIME));
      setButtonState((prev) => ({ ...prev, [currentPattern[i]]: false }));
    }

    setGameState(GameState.UserTrying);
  }

  function checkPattern() {
    if (userPattern.length === pattern.length) {
      if (userPattern.join("") === pattern.join("")) {
        console.log("✅");
        handleLevel();

        setShowConfeti(true);
        setTimeout(() => setShowConfeti(false), 2000);
      } else {
        console.log("❌");
        setGameState(GameState.Lost);
        setShowConfeti(false);
      }
    }
  }

  function buttonStateOff() {
    setButtonState({
      yellow: false,
      green: false,
      red: false,
      blue: false,
    });
  }

  async function handleUserClick(color: LigthButtonColor) {
    setUserPattern((prev) => [...prev, color]);

    buttonStateOff();
    setButtonState((prev) => ({ ...prev, [color]: true }));
    await new Promise((resolve) => setTimeout(resolve, ON_TIME));
    buttonStateOff();
    await new Promise((resolve) => setTimeout(resolve, ON_TIME));
  }

  useEffect(() => {
    if (gameState === GameState.ShowingPattern) {
      handleGameStart();
    } else if (gameState === GameState.Lost) {
      setPattern([]);
      setUserPattern([]);
      setLevel(0);
      setGameState(GameState.Off);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === GameState.UserTrying) {
      checkPattern();
    }
  }, [userPattern]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid items-center justify-center min-h-screen p-5 font-[family-name:var(--font-geist-mono)]`}
    >
      <main className="flex flex-col items-center">
        {showConfeti && (
          <Confetti width={width} height={height} gravity={0.5} />
        )}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl md:text-4xl">Sim🐶n</h1>
          <p className="md:text-xl">Level {level}</p>
        </div>
        <div className="flex flex-wrap gap-0.5 mb-5 md:mb-10 mt-5 md:mt-10 h-16 max-w-md">
          {userPattern.map((c, index) => {
            return (
              <div className={`${c}-base w-4 md:w-5 h-4 md:h-5`} key={index} />
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="bg-slate-300 shadow-md p-2 gap-1 rounded-full grid grid-cols-2 grid-rows-2 border-2 border-gray-400">
            <LigthButton
              position="tl"
              color="yellow"
              isActive={buttonState["yellow"]}
              onClick={() =>
                gameState === GameState.UserTrying && handleUserClick("yellow")
              }
            />
            <LigthButton
              position="tr"
              color="green"
              isActive={buttonState["green"]}
              onClick={() =>
                gameState === GameState.UserTrying && handleUserClick("green")
              }
            />
            <LigthButton
              position="bl"
              color="blue"
              isActive={buttonState["blue"]}
              onClick={() =>
                gameState === GameState.UserTrying && handleUserClick("blue")
              }
            />
            <LigthButton
              position="br"
              color="red"
              isActive={buttonState["red"]}
              onClick={() =>
                gameState === GameState.UserTrying && handleUserClick("red")
              }
            />
          </div>
          <p className="text-gray-700 h-5"></p>
        </div>
        <button
          disabled={gameState !== GameState.Off && gameState !== GameState.Lost}
          onClick={() => {
            setGameState(GameState.ShowingPattern);
          }}
          className="px-10 py-2 mt-5 shadow-md bg-slate-300 text-black border disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start
        </button>
      </main>
    </div>
  );
}
