import { LigthButton } from "@/components/ligth-button";
import { LigthButtonPosition, LigthButtonState } from "@/types";
import localFont from "next/font/local";

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
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid items-center justify-center min-h-screen p-5 font-[family-name:var(--font-geist-mono)]`}
    >
      <main className="flex flex-col row-start-2 items-center">
        <div className="bg-white p-1 gap-1 rounded-full grid grid-cols-2 grid-rows-2 border-2 border-gray-300">
          <LigthButton
            color="yellow"
            state={LigthButtonState.Off}
            position={LigthButtonPosition.TopLeft}
            mouseCanActivate={false}
          />
          <LigthButton
            color="red"
            state={LigthButtonState.Off}
            position={LigthButtonPosition.TopRight}
            mouseCanActivate={true}
          />
          <LigthButton
            color="green"
            state={LigthButtonState.Off}
            position={LigthButtonPosition.BottomLeft}
            mouseCanActivate={true}
          />
          <LigthButton
            color="blue"
            state={LigthButtonState.Off}
            position={LigthButtonPosition.BottomRight}
            mouseCanActivate={true}
          />
        </div>

        <div className="mt-20 ">
          <button className="px-10 py-1 bg-slate-100 border-gray-300 hover:bg-slate-200 hover:border-gray-400 text-black text-lg border-4">
            Play
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
