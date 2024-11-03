use env_logger::{Builder, Env};
use hima_dango::Field;
use std::collections::BTreeMap;
use std::num::NonZeroU8;
use std::time::Instant;

fn main() {
    Builder::from_env(Env::default().default_filter_or("info")).init();

    let graph = Field::<3>::new(3).make_graph(
        // &[1, 2, 3, 4, 5, 6]
        &[1, 1, 2, 2, 3, 3]
            .iter()
            .map(|&u| NonZeroU8::new(u).expect("non-zero"))
            .collect::<Vec<_>>(),
    );
    log::debug!("{} nodes, {} edges", graph.nodes_len(), graph.edges_len());
    let all_paths = {
        let now = Instant::now();
        let ret = (0..graph.nodes_len())
            .map(|i| graph.paths(i))
            .collect::<Vec<_>>();
        let elapsed = now.elapsed();
        log::debug!("elapsed time for calculating all distances: {elapsed:?}");
        ret
    };

    let mut counts = BTreeMap::new();
    for paths in &all_paths {
        for &path_info in paths {
            if let Some(d) = path_info.dist {
                *counts.entry(d).or_insert(0) += 1;
            }
        }
    }
    for (distance, count) in counts {
        println!("distance {distance:2}: {count:7}");
    }
}
