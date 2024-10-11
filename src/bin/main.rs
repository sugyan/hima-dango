use env_logger::Env;
use hima_dango::{Field, Graph};
use std::{cmp::Ordering, time::Instant};

fn main() {
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();

    let field = Field::new(3, 3);
    let nodes = field.all_stacks(vec![0, 0, 1, 1, 2, 2]);
    let graph = Graph::new(nodes, field.max_len);
    log::debug!(
        "{} nodes, {} edges",
        graph.nodes.len(),
        graph.edges.iter().map(Vec::len).sum::<usize>()
    );
    let all_distances = {
        let now = Instant::now();
        let ret = (0..graph.nodes.len())
            .map(|i| graph.distances(i))
            .collect::<Vec<_>>();
        log::debug!(
            "elapsed time for calculating distances: {:?}",
            now.elapsed()
        );
        ret
    };

    let (mut max, mut paths) = (0, Vec::new());
    for (i, distances) in all_distances.iter().enumerate() {
        let src = &graph.nodes[i];
        for (j, &distance) in distances.iter().enumerate() {
            let dst = &graph.nodes[j];
            // if src.iter().any(|s| s.len() == 1) || dst.iter().any(|s| s.len() == 1) {
            //     continue;
            // }
            if let Some(d) = distance {
                match d.cmp(&max) {
                    Ordering::Greater => {
                        max = d;
                        paths = vec![(src.clone(), dst.clone())];
                    }
                    Ordering::Equal => {
                        paths.push((src.clone(), dst.clone()));
                    }
                    _ => {}
                }
            }
        }
    }
    log::info!("max distance: {max} ({} paths)", paths.len());
    for (src, dst) in paths {
        log::info!(
            "{:26} -> {:26}",
            format!("{:?}", *src),
            format!("{:?}", *dst)
        );
    }
}
