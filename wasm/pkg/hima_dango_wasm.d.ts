/* tslint:disable */
/* eslint-disable */
export function init(): void;
export class WasmGraph {
  free(): void;
  constructor();
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
   * @returns {any}
   */
  node(i: number): any;
  /**
   * @param {number} src
   * @returns {any}
   */
  paths(src: number): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly init: () => void;
  readonly __wbg_wasmgraph_free: (a: number, b: number) => void;
  readonly wasmgraph_new: () => number;
  readonly wasmgraph_nodes_len: (a: number) => number;
  readonly wasmgraph_edges_len: (a: number) => number;
  readonly wasmgraph_node: (a: number, b: number) => number;
  readonly wasmgraph_paths: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_1: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_start: () => void;
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
