import { Color } from "./types";

export const colors2string = (skewers: Color[][]): string => {
  return skewers
    .map((skewer) => skewer.map((c) => ["G", "W", "P"][c]).join(""))
    .join(".");
};

export const string2colors = (s: string): Color[][] | undefined => {
  const pattern =
    /^(?=(?:[^G]*G){2})(?=(?:[^W]*W){2})(?=(?:[^P]*P){2})([GWP]*)\.([GWP]*)\.([GWP]*)$/;
  if (!pattern.test(s)) {
    return undefined;
  }
  return s
    .split(".")
    .map((skewer) =>
      skewer.split("").map((c) => ["G", "W", "P"].indexOf(c) as Color)
    );
};
