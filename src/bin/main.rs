use env_logger::{Builder, Env};
use hima_dango::Field;
use std::collections::BTreeMap;
use std::time::Instant;

fn main() {
    Builder::from_env(Env::default().default_filter_or("info")).init();

    let graph = Field::new(3, 3).make_graph(vec![0, 0, 1, 1, 2, 2]);
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
        println!("distance {distance:2}: {count:6}");
    }
}
