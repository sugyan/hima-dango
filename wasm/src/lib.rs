use hima_dango::{Field, Graph};
use std::num::NonZeroU8;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

#[wasm_bindgen]
pub struct WasmGraph {
    inner: Graph<3>,
}

#[wasm_bindgen]
impl WasmGraph {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::default()
    }
    pub fn nodes_len(&self) -> usize {
        self.inner.nodes_len()
    }
    pub fn edges_len(&self) -> usize {
        self.inner.edges_len()
    }
    pub fn node(&self, i: usize) -> JsValue {
        JsValue::from(
            self.inner
                .node(i)
                .stacks()
                .into_iter()
                .map(JsValue::from)
                .collect::<Vec<_>>(),
        )
    }
    pub fn paths(&self, src: usize) -> JsValue {
        let paths = self.inner.paths(src);
        JsValue::from(
            paths
                .iter()
                .map(|info| info.prev.map_or(JsValue::NULL, JsValue::from))
                .collect::<Vec<_>>(),
        )
    }
}

impl Default for WasmGraph {
    fn default() -> Self {
        Self {
            inner: Field::<3>::new(3).make_graph(
                &[1, 1, 2, 2, 3, 3]
                    .into_iter()
                    .filter_map(NonZeroU8::new)
                    .collect::<Vec<_>>(),
            ),
        }
    }
}
