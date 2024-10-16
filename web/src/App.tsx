import { useEffect, useMemo, useState } from "react";
import init, { Field, Graph } from "../pkg/hima_dango";
import DangoEditor from "./dango-editor";

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
  return (
    <div className="bg-slate-800 text-slate-200 min-h-screen">
      <div className="max-w-screen-lg mx-auto py-4 flex flex-col items-center">
        <h1 className="font-mono text-2xl mb-2">Dango Solver</h1>
        {/* {result ? (
          <div className="font-mono">{JSON.stringify(result)}</div>
        ) : null} */}
        <DangoEditor />
      </div>
    </div>
  );
}

export default App;
