use crate::Stacks;
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub struct Graph {
    nodes: Vec<Stacks>,
    edges: Vec<Vec<usize>>,
}

#[derive(Default, Clone, Copy)]
pub struct PathInfo {
    pub dist: Option<u32>,
    pub prev: Option<usize>,
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl Graph {
    pub(crate) fn new(nodes: Vec<Stacks>, max_len: usize) -> Self {
        let mut edges = vec![Vec::with_capacity(6); nodes.len()];
        let node_map = nodes
            .iter()
            .enumerate()
            .map(|(i, node)| (node, i))
            .collect::<HashMap<_, _>>();
        for src in &nodes {
            for dst in src.next_stacks(max_len) {
                edges[node_map[src]].push(node_map[&dst]);
            }
        }
        Self { nodes, edges }
    }
    pub fn nodes_len(&self) -> usize {
        self.nodes.len()
    }
    pub fn edges_len(&self) -> usize {
        self.edges.iter().map(Vec::len).sum()
    }
    #[cfg(not(target_arch = "wasm32"))]
    pub fn node(&self, i: usize) -> &Stacks {
        &self.nodes[i]
    }
    #[cfg(target_arch = "wasm32")]
    pub fn node(&self, i: usize) -> Stacks {
        self.nodes[i].clone()
    }
    #[cfg(not(target_arch = "wasm32"))]
    pub fn paths(&self, src: usize) -> Vec<PathInfo> {
        self.dijkstra(src)
    }
    #[cfg(target_arch = "wasm32")]
    pub fn paths(&self, src: usize) -> JsValue {
        let paths = self.dijkstra(src);
        let dists = JsValue::from(
            paths
                .iter()
                .map(|info| info.dist.map_or(JsValue::NULL, JsValue::from))
                .collect::<Vec<_>>(),
        );
        let prevs = JsValue::from(
            paths
                .iter()
                .map(|info| info.prev.map_or(JsValue::NULL, JsValue::from))
                .collect::<Vec<_>>(),
        );
        JsValue::from(vec![dists, prevs])
    }
    fn dijkstra(&self, src: usize) -> Vec<PathInfo> {
        let mut results = vec![PathInfo::default(); self.nodes.len()];
        let mut bh = BinaryHeap::new();
        results[src].dist = Some(0);
        bh.push((Reverse(0), src));
        while let Some((Reverse(d), i)) = bh.pop() {
            for &j in &self.edges[i] {
                if results[j].dist.is_none() {
                    results[j] = PathInfo {
                        dist: Some(d + 1),
                        prev: Some(i),
                    };
                    bh.push((Reverse(d + 1), j));
                }
            }
        }
        results
    }
}
