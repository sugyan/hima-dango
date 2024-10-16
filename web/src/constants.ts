import { Color, Dango } from "./types";

export const ALL_DANGOS = Object.fromEntries(
  [
    new Dango(Color.Green, 0),
    new Dango(Color.Green, 1),
    new Dango(Color.White, 0),
    new Dango(Color.White, 1),
    new Dango(Color.Red, 0),
    new Dango(Color.Red, 1),
  ].map((dango) => [dango.identifier(), dango])
);
