import { Field } from "./pkg/hima_dango.js";

const graph = new Field(3, 3).make_graph(new Uint8Array([0, 0, 1, 1, 2, 2]));

const start = performance.now();
const results = Math.max(
  ...Array.from(Array(graph.nodes_len()), (_, i) =>
    Math.max(...graph.paths(i)[0])
  )
);
console.log(`Elapsed time: ${performance.now() - start} ms`);
console.log(results);
