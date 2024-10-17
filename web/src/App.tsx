import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EditableState from "./editable-state";
import { Color } from "./types";
import { colors2string, string2colors } from "./utils";

// (async () => {
//   await init();
//   const graph = new Field(3, 3).make_graph(new Uint8Array([0, 0, 1, 1, 2, 2]));
//   const results = Math.max(
//     ...Array.from(Array(graph.nodes_len()), (_, i) =>
//       Math.max(...graph.paths(i)[0])
//     )
//   );
//   console.log(results);
// })();

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [src, setSrc] = useState<Color[][]>();
  const [dst, setDst] = useState<Color[][]>();
  useEffect(() => {
    const src = searchParams.get("src");
    if (src) {
      setSrc(string2colors(src));
    }
    const dst = searchParams.get("dst");
    if (dst) {
      setDst(string2colors(dst));
    }
  }, [searchParams]);

  // const [graph, setGraph] = useState<Graph | null>(null);
  // useEffect(() => {
  //   (async () => {
  //     await init();
  //     setGraph(new Field(3, 3).make_graph(new Uint8Array([0, 0, 1, 1, 2, 2])));
  //   })();
  // }, []);
  // const result = useMemo(() => {
  //   if (!graph) return null;
  //   const state = graph.node(0);
  //   const result = state.to_values().map((v) => Array.from(v));
  //   state.free();
  //   return result;
  // }, [graph]);
  const updateSearchParams = (key: string) => {
    return (colors: Color[][]) => {
      setSearchParams((prev) => {
        prev.set(key, colors2string(colors));
        return prev;
      });
    };
  };
  return (
    <div className="bg-slate-800 text-slate-200 min-h-screen">
      <div className="max-w-screen-lg mx-auto py-4 flex flex-col items-center">
        <h1 className="font-mono text-2xl mb-2">Dango Solver</h1>
        {/* {result ? (
          <div className="font-mono">{JSON.stringify(result)}</div>
        ) : null} */}
        <div className="flex space-x-12 m-4 justify-between">
          <div className="w-1/2">
            <EditableState
              initColors={src}
              onUpdated={updateSearchParams("src")}
            />
          </div>
          <div className="w-1/2">
            <EditableState
              initColors={dst}
              onUpdated={updateSearchParams("dst")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
