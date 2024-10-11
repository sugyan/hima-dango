import { assertEquals } from "@std/assert";
import { Field } from "./pkg/hima_dango.js";

Deno.test(function testGraph() {
  const graph = new Field(3, 3).make_graph(new Uint8Array([0, 0, 1, 1, 2, 2]));
  assertEquals(graph.nodes_len(), 900);
  assertEquals(graph.edges_len(), 3240);
  const max_distance = Math.max(
    ...Array.from(Array(graph.nodes_len()), (_, i) =>
      Math.max(...graph.paths(i)[0])
    )
  );
  assertEquals(max_distance, 16);
});
