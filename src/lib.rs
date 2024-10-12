mod enumerations;
mod graph;

pub use graph::Graph;
use std::ops::Deref;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::wasm_bindgen;

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
#[derive(Debug, Clone, Hash, Eq, PartialEq)]
pub struct State(Vec<Vec<u8>>);

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl State {
    pub fn next_stacks(&self, max_len: usize) -> Vec<State> {
        let mut results = Vec::new();
        for i in 0..self.0.len() {
            for j in 0..self.0.len() {
                if i == j || self.0[i].is_empty() || self.0[j].len() == max_len {
                    continue;
                }
                let mut v = self.0.clone();
                let ball = v[i].pop().unwrap();
                v[j].push(ball);
                results.push(State(v));
            }
        }
        results
    }
    #[cfg(target_arch = "wasm32")]
    pub fn to_values(&self) -> Vec<wasm_bindgen::JsValue> {
        self.0
            .iter()
            .map(|v| wasm_bindgen::JsValue::from(v.clone()))
            .collect()
    }
}

impl Deref for State {
    type Target = Vec<Vec<u8>>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
pub struct Field {
    num_stacks: usize,
    max_len: usize,
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl Field {
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(constructor))]
    pub fn new(num_stacks: usize, max_len: usize) -> Self {
        Field {
            num_stacks,
            max_len,
        }
    }
    pub fn make_graph(&self, balls: Vec<u8>) -> Graph {
        let target_sum = balls.len() as u32;
        let permutations = enumerations::unique_permutations(balls);
        let all_stacks =
            enumerations::bounded_partitions(self.num_stacks, self.max_len as u32, target_sum)
                .iter()
                .flat_map(|partition| {
                    permutations.clone().into_iter().map(|p| {
                        let mut iter = p.into_iter();
                        State(
                            partition
                                .iter()
                                .map(|&n| iter.by_ref().take(n as usize).collect())
                                .collect(),
                        )
                    })
                })
                .collect();
        Graph::new(all_stacks, self.max_len)
    }
}
