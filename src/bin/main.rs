use std::cmp::Ordering;

use hima_dango::{Field, Graph};

fn main() {
    let field = Field::new(3, 3);
    let nodes = field.all_stacks(vec![0, 0, 1, 1, 2, 2]);
    let graph = Graph::new(nodes, field.max_len);
    println!(
        "{} nodes, {} edges",
        graph.len(),
        graph.values().map(Vec::len).sum::<usize>()
    );
    let (mut max, mut paths) = (0, Vec::new());
    for ((src, dst), d) in graph.distances() {
        if src.iter().any(|s| s.len() == 1) || dst.iter().any(|s| s.len() == 1) {
            continue;
        }
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
    println!("max distance: {max} ({} paths)", paths.len());
    for (src, dst) in paths {
        println!("{:?} -> {:?}", *src, *dst);
    }
}
