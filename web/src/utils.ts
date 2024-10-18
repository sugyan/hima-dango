import { Graph } from "../pkg/hima_dango";
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

export const solve = (
  src: Color[][],
  dst: Color[][],
  graph: Graph
): Color[][][] => {
  const nodes = Array.from(Array(graph.nodes_len()), (_, i) => {
    const state = graph.node(i);
    const colors = state
      .to_values()
      .map((values: Uint8Array) => Array.from(values, (v) => v as Color));
    state.free();
    return colors2string(colors);
  });
  const indexMap = Object.fromEntries(nodes.map((node, i) => [node, i]));
  const [, prevs] = graph.paths(indexMap[colors2string(src)]);
  const recursive = (i: number): number[] => {
    return prevs[i] === null ? [] : [...recursive(prevs[i]), i];
  };
  const result = recursive(indexMap[colors2string(dst)]);
  return result.map((i) => string2colors(nodes[i]) as Color[][]);
};
