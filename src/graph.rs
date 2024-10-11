use crate::Stacks;
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

pub struct Graph {
    pub nodes: Vec<Stacks>,
    pub edges: Vec<Vec<usize>>,
}

impl Graph {
    pub fn new(nodes: Vec<Stacks>, max_len: usize) -> Self {
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
    pub fn distances(&self, src: usize) -> Vec<Option<u32>> {
        let mut distances = vec![None; self.nodes.len()];
        let mut bh = BinaryHeap::new();
        distances[src] = Some(0);
        bh.push((Reverse(0), src));
        while let Some((Reverse(d), i)) = bh.pop() {
            for &j in &self.edges[i] {
                if distances[j].is_none() {
                    distances[j] = Some(d + 1);
                    bh.push((Reverse(d + 1), j));
                }
            }
        }
        distances
    }
}
