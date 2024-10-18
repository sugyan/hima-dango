/* tslint:disable */
/* eslint-disable */
export class Field {
  free(): void;
  /**
   * @param {number} num_stacks
   * @param {number} max_len
   */
  constructor(num_stacks: number, max_len: number);
  /**
   * @param {Uint8Array} balls
   * @returns {Graph}
   */
  make_graph(balls: Uint8Array): Graph;
}
export class Graph {
  free(): void;
  /**
   * @returns {number}
   */
  nodes_len(): number;
  /**
   * @returns {number}
   */
  edges_len(): number;
  /**
   * @param {number} i
   * @returns {State}
   */
  node(i: number): State;
  /**
   * @param {number} src
   * @returns {any}
   */
  paths(src: number): any;
}
export class State {
  free(): void;
  /**
   * @param {number} max_len
   * @returns {(State)[]}
   */
  next_stacks(max_len: number): (State)[];
  /**
   * @returns {any[]}
   */
  to_values(): any[];
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_state_free: (a: number, b: number) => void;
  readonly state_next_stacks: (a: number, b: number, c: number) => void;
  readonly state_to_values: (a: number, b: number) => void;
  readonly __wbg_field_free: (a: number, b: number) => void;
  readonly field_new: (a: number, b: number) => number;
  readonly field_make_graph: (a: number, b: number, c: number) => number;
  readonly __wbg_graph_free: (a: number, b: number) => void;
  readonly graph_nodes_len: (a: number) => number;
  readonly graph_edges_len: (a: number) => number;
  readonly graph_node: (a: number, b: number) => number;
  readonly graph_paths: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
