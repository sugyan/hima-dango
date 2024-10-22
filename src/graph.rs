use crate::State;
use ahash::AHashMap;
use std::cmp::Reverse;
use std::collections::BinaryHeap;

pub struct Graph<const LEN: usize> {
    nodes: Vec<State<LEN>>,
    edges: Vec<Vec<usize>>,
}

#[derive(Default, Clone, Copy)]
pub struct PathInfo {
    pub dist: Option<u32>,
    pub prev: Option<usize>,
}

impl<const LEN: usize> Graph<LEN> {
    pub(crate) fn new(nodes: Vec<State<LEN>>, max_len: usize) -> Self {
        log::debug!("all nodes: {}", nodes.len());
        let mut edges = vec![Vec::with_capacity(LEN * (LEN - 1)); nodes.len()];
        let node_map = nodes
            .iter()
            .enumerate()
            .map(|(i, node)| (node, i))
            .collect::<AHashMap<_, _>>();

        for (i, src) in nodes.iter().enumerate() {
            if i % 1_000_000 == 0 {
                log::debug!("{} nodes processed", i);
            }
            for dst in &src.next_stacks(max_len) {
                edges[i].push(node_map[dst]);
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
    pub fn node(&self, i: usize) -> &State<LEN> {
        &self.nodes[i]
    }
    pub fn paths(&self, src: usize) -> Vec<PathInfo> {
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
