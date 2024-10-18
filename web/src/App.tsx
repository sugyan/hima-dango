import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import init, { Field, Graph } from "../pkg/hima_dango";
import DangoViewer from "./dango-viewer";
import EditableState from "./editable-state";
import Footer from "./footer";
import { Color } from "./types";
import { colors2string, solve, string2colors } from "./utils";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [src, setSrc] = useState<Color[][]>();
  const [dst, setDst] = useState<Color[][]>();
  const [graph, setGraph] = useState<Graph | null>(null);
  const [results, setResults] = useState<Color[][][]>();
  const [isWasmInitialized, setIsWasmInitialized] = useState(false);
  useEffect(() => {
    (async () => {
      await init();
      setIsWasmInitialized(true);
    })();
  }, []);
  useEffect(() => {
    if (!isWasmInitialized) {
      return;
    }
    const field = new Field(3, 3);
    setGraph(field.make_graph(new Uint8Array([0, 0, 1, 1, 2, 2])));
    field.free();
  }, [isWasmInitialized]);
  useEffect(() => {
    Object.entries({
      src: setSrc,
      dst: setDst,
    }).forEach(([key, setter]) => {
      const value = searchParams.get(key);
      if (value) {
        setter(string2colors(value));
      }
    });
  }, [searchParams]);
  useEffect(() => {
    if (!src || !dst || !graph) {
      return;
    }
    setResults(solve(src, dst, graph));
  }, [src, dst, graph]);
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
      <div className="max-w-screen-md mx-auto py-4 flex flex-col items-center">
        <h1 className="font-mono text-2xl mb-2">Dango Solver</h1>
        <div className="flex space-x-4 sm:space-x-8 m-4 justify-center items-center">
          <div className="w-1/2">
            <EditableState
              initColors={src}
              onUpdated={updateSearchParams("src")}
            />
          </div>
          <div className="relative -top-4 w-0 h-0 border-l-[20px] border-transparent border-t-[30px] border-b-[30px] border-l-yellow-300 mx-4" />
          <div className="w-1/2">
            <EditableState
              initColors={dst}
              onUpdated={updateSearchParams("dst")}
            />
          </div>
        </div>
        {src && results && (
          <>
            <div className="mb-2">{results.length} moves</div>
            <div className="flex flex-wrap mx-2 gap-y-4">
              {[src, ...results].map((colors, i) => (
                <div key={i} className="relative w-1/3 sm:w-1/4 px-2">
                  {i > 0 && (
                    <div className="absolute -left-5 top-1/2 w-0 h-0 -translate-y-1/2 border-l-[7.5px] border-transparent border-t-[15px] border-b-[15px] border-l-gray-200 mx-4" />
                  )}
                  <div key={i} className="">
                    <DangoViewer colors={colors} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
