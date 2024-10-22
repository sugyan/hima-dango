mod enumerations;
mod graph;

pub use graph::Graph;
use std::fmt::Debug;
use std::num::NonZeroU8;

#[derive(Hash, Eq, PartialEq)]
pub struct State<const LEN: usize>([u64; LEN]);

impl<const LEN: usize> State<LEN> {
    fn new(permutation: &[u8], partition: &[u32]) -> Self {
        let mut v = [0; LEN];
        let mut iter = permutation.iter();
        for (i, num) in partition.iter().enumerate() {
            for _ in 0..*num {
                v[i] <<= 8;
                v[i] |= u64::from(*iter.next().unwrap());
            }
        }
        Self(v)
    }
    pub fn stacks(&self) -> Vec<Vec<u8>> {
        self.0
            .iter()
            .map(|u: &u64| {
                (0..8)
                    .filter_map(|i| u8::try_from((u >> (i * 8)) & 0xFF).ok().filter(|&v| v != 0))
                    .rev()
                    .collect()
            })
            .collect()
    }
    pub fn next_stacks(&self, max_len: usize) -> Vec<Self> {
        debug_assert!(max_len <= 8);
        let threshold = (1 << ((max_len - 1) << 3)) - 1;
        let mut results = Vec::with_capacity(LEN * (LEN - 1));
        for i in 0..LEN {
            if self.0[i] == 0 {
                continue;
            }
            for j in 0..LEN {
                if i == j || self.0[j] > threshold {
                    continue;
                }
                let mut next = self.0;
                next[j] = (next[j] << 8) | (next[i] & 0xFF);
                next[i] >>= 8;
                results.push(Self(next));
            }
        }
        results
    }
}

impl<const LEN: usize> Debug for State<LEN> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let dump = |stack: &Vec<u8>| {
            format!(
                "[{}]",
                stack
                    .iter()
                    .map(|u| format!("{:02x}", u))
                    .collect::<Vec<_>>()
                    .join(", ")
            )
        };
        write!(
            f,
            "[{}]",
            self.stacks()
                .iter()
                .map(dump)
                .collect::<Vec<_>>()
                .join(", ")
        )
    }
}

pub struct Field<const LEN: usize> {
    max_len: usize,
}

impl<const LEN: usize> Field<LEN> {
    pub fn new(max_len: usize) -> Self {
        Field { max_len }
    }
    pub fn make_graph(&self, balls: &[NonZeroU8]) -> Graph<LEN> {
        let target_sum = balls.len() as u32;
        let permutations =
            enumerations::unique_permutations(balls.iter().map(|u| u.get()).collect());
        log::debug!("permutations: {}", permutations.len());
        let all_stacks = enumerations::bounded_partitions(LEN, self.max_len as u32, target_sum)
            .iter()
            .flat_map(|partition| permutations.iter().map(|p| State::new(p, partition)))
            .collect();
        Graph::new(all_stacks, self.max_len)
    }
}
