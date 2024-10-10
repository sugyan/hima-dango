use crate::Stacks;
use std::cmp::Reverse;
use std::collections::HashMap;
use std::ops::Deref;

pub enum Algorithm {
    FloydWarshall,
    Dijkstra,
}

pub struct Graph(HashMap<Stacks, Vec<Stacks>>);

impl Graph {
    pub fn new(nodes: Vec<Stacks>, max_len: usize) -> Self {
        let mut graph = HashMap::new();
        for node in nodes {
            for next in node.next_stacks(max_len) {
                graph
                    .entry(node.clone())
                    .or_insert_with(Vec::new)
                    .push(next);
            }
        }
        Self(graph)
    }
    pub fn distances(&self, algorithm: Algorithm) -> HashMap<(Stacks, Stacks), usize> {
        let nodes = self.0.keys().collect::<Vec<_>>();
        let node_map = nodes
            .iter()
            .enumerate()
            .map(|(i, &node)| (node, i))
            .collect::<HashMap<_, _>>();

        let distances = match algorithm {
            Algorithm::FloydWarshall => {
                let mut distances = vec![vec![None; nodes.len()]; nodes.len()];
                for (i, &node) in nodes.iter().enumerate() {
                    distances[i][i] = Some(0);
                    for next in &self.0[node] {
                        distances[i][node_map[next]] = Some(1);
                    }
                }
                for k in 0..nodes.len() {
                    for i in 0..nodes.len() {
                        for j in 0..nodes.len() {
                            if let (Some(ik), Some(kj)) = (distances[i][k], distances[k][j]) {
                                let d = ik + kj;
                                if distances[i][j].map_or(true, |ij| d < ij) {
                                    distances[i][j] = Some(d);
                                }
                            }
                        }
                    }
                }
                distances
            }
            Algorithm::Dijkstra => {
                let mut edges = vec![Vec::with_capacity(6); nodes.len()];
                for (i, &src) in nodes.iter().enumerate() {
                    for dst in &self.0[src] {
                        edges[i].push(node_map[dst]);
                    }
                }
                (0..nodes.len())
                    .map(|i| dijkstra(&edges, i))
                    .collect::<Vec<_>>()
            }
        };
        let mut results = HashMap::new();
        for (i, &src) in nodes.iter().enumerate() {
            for (j, &dst) in nodes.iter().enumerate() {
                if let Some(d) = distances[i][j] {
                    results.insert((src.clone(), dst.clone()), d);
                }
            }
        }
        results
    }
}

impl Deref for Graph {
    type Target = HashMap<Stacks, Vec<Stacks>>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

fn dijkstra(edges: &[Vec<usize>], src: usize) -> Vec<Option<usize>> {
    let mut distances = vec![None; edges.len()];
    let mut bh = std::collections::BinaryHeap::new();
    distances[src] = Some(0);
    bh.push((Reverse(0), src));
    while let Some((Reverse(d), i)) = bh.pop() {
        for &j in &edges[i] {
            let d = d + 1;
            if distances[j].map_or(true, |dj| d < dj) {
                distances[j] = Some(d);
                bh.push((Reverse(d), j));
            }
        }
    }
    distances
}
