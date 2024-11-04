import { LigthButton } from "@/components/ligth-button";
import { LigthButtonColor } from "@/types";
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

const MAX_LEVEL = 32;

export default function Home() {
  const [buttonState, setButtonState] = useState<{
    [LigthButtonColor: string]: boolean;
  }>({
    yellow: false,
    green: false,
    red: false,
    blue: false,
  });

  const [userPattern, setUserPattern] = useState([
    "red",
    "green",
    "blue",
    "yellow",
    "red",
    "green",
    "blue",
    "yellow",
    "red",
    "green",
    "blue",
    "yellow",
    "red",
    "green",
    "blue",
    "yellow",
    "red",
    "green",
    "blue",
    "yellow",
    "red",
    "green",
    "blue",
    "yellow",
    "red",
    "green",
    "blue",
    "yellow",
    "red",
    "green",
    "blue",
    "yellow",
  ]);

  useEffect(() => {
    const colors: LigthButtonColor[] = ["red", "green", "yellow", "blue"];
    const changeButtonStates = async () => {
      for (const color of colors) {
        setButtonState((prev) => ({ ...prev, [color]: !prev[color] }));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setButtonState((prev) => ({ ...prev, [color]: !prev[color] }));
      }
    };
    changeButtonStates();
  }, []);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid items-center justify-center min-h-screen p-5 font-[family-name:var(--font-geist-mono)]`}
    >
      <main className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl md:text-4xl">Sim🐶n</h1>
          <p className="md:text-xl">Level {0}</p>
        </div>
        <div className="flex flex-wrap gap-0.5 mb-5 md:mb-10 mt-5 md:mt-10 h-16 max-w-md">
          {/* @todo deactivate this when add level selection */}
          {userPattern.map((c, index) => {
            return (
              <div className={`${c}-base w-4 md:w-5 h-4 md:h-5`} key={index} />
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="bg-white p-1 gap-1 rounded-full grid grid-cols-2 grid-rows-2 border-2 border-gray-300">
            <LigthButton
              position="tl"
              color="yellow"
              isActive={buttonState["yellow"]}
            />
            <LigthButton
              position="tr"
              color="green"
              isActive={buttonState["green"]}
            />
            <LigthButton
              position="bl"
              color="blue"
              isActive={buttonState["blue"]}
            />
            <LigthButton
              position="br"
              color="red"
              isActive={buttonState["red"]}
            />
          </div>
          <p className="text-gray-700">Remaining Time 0s</p>
        </div>
        <button className="bg-slate-300 text-black px-10 py-2 mt-5">
          Start
        </button>
      </main>
    </div>
  );
}
