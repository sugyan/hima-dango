mod enumerations;
mod graph;

pub use graph::Graph;
use std::ops::Deref;

#[derive(Debug, Clone, Hash, Eq, PartialEq)]
pub struct Stacks(Vec<Vec<u8>>);

impl Stacks {
    pub fn next_stacks(&self, max_len: usize) -> Vec<Stacks> {
        let mut results = Vec::new();
        for i in 0..self.0.len() {
            for j in 0..self.0.len() {
                if i == j || self.0[i].is_empty() || self.0[j].len() == max_len {
                    continue;
                }
                let mut v = self.0.clone();
                let ball = v[i].pop().unwrap();
                v[j].push(ball);
                results.push(Stacks(v));
            }
        }
        results
    }
}

impl Deref for Stacks {
    type Target = Vec<Vec<u8>>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

pub struct Field {
    pub max_len: usize,
    pub stacks: Stacks,
}

impl Field {
    pub fn new(max_len: usize, num_stacks: usize) -> Self {
        Field {
            max_len,
            stacks: Stacks(vec![Vec::with_capacity(max_len); num_stacks]),
        }
    }
    pub fn all_stacks(&self, balls: Vec<u8>) -> Vec<Stacks> {
        let permutations = enumerations::unique_permutations(balls.clone());
        enumerations::bounded_partitions(
            self.stacks.0.len(),
            self.max_len as u32,
            balls.len() as u32,
        )
        .iter()
        .flat_map(|partition| {
            permutations.clone().into_iter().map(|p| {
                let mut iter = p.into_iter();
                Stacks(
                    partition
                        .iter()
                        .map(|&n| iter.by_ref().take(n as usize).collect())
                        .collect(),
                )
            })
        })
        .collect()
    }
}
