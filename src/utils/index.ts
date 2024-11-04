import { LigthButtonColor } from "@/types";

export function generateRandomColor(): LigthButtonColor {
  const colors: LigthButtonColor[] = ["blue", "green", "red", "yellow"];
  return colors[getRandomInt()];
}

export function getRandomInt(max: number = 4) {
  return Math.floor(Math.random() * max);
}
