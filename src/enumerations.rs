use std::collections::HashMap;

pub fn unique_permutations(elems: Vec<u8>) -> Vec<Vec<u8>> {
    fn backtrack(
        n: usize,
        curr: &mut Vec<u8>,
        counts: &mut HashMap<u8, u32>,
        result: &mut Vec<Vec<u8>>,
    ) {
        if n == 0 {
            return result.push(curr.clone());
        }
        for key in counts.keys().copied().collect::<Vec<_>>() {
            if counts[&key] == 0 {
                continue;
            }
            counts.entry(key).and_modify(|e| *e -= 1);
            curr.push(key);
            backtrack(n - 1, curr, counts, result);
            curr.pop();
            counts.entry(key).and_modify(|e| *e += 1);
        }
    }

    let mut result = Vec::new();
    let mut counts = HashMap::with_capacity(256);
    for &elem in &elems {
        *counts.entry(elem).or_insert(0) += 1;
    }
    backtrack(
        elems.len(),
        &mut Vec::with_capacity(elems.len()),
        &mut counts,
        &mut result,
    );
    result
}

pub fn bounded_partitions(len: usize, upper_limit: u32, target_sum: u32) -> Vec<Vec<u32>> {
    fn recursive(
        i: usize,
        upper_limit: u32,
        remain: u32,
        curr: &mut Vec<u32>,
        results: &mut Vec<Vec<u32>>,
    ) {
        if i == 0 {
            if remain == 0 {
                results.push(curr.clone());
            }
            return;
        }
        for n in 0..=upper_limit.min(remain) {
            curr[i - 1] = n;
            recursive(i - 1, upper_limit, remain - n, curr, results);
        }
    }

    let mut results = Vec::new();
    recursive(
        len,
        upper_limit,
        target_sum,
        &mut vec![0; len],
        &mut results,
    );
    results
}
