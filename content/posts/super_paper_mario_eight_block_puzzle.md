---
title: "Super Paper Mario Eight Block Puzzle"
description: A fun coding challenge inspired by Super Paper Mario Wii.
date: 2026-05-10T00:47:58-07:00
---

I recently started playing through Super Paper Mario Wii.
After finishing chapter 4 in Super Paper Mario, you're tasked to find the next heart pillar.
During the search, there is a room with 8 blocks that are either lit up or dim.

![Block puzzle](/img/block_puzzle.webp)

Hitting a block will flip the states of other blocks. Numbering the blocks from left to right,
we have the following state transitions for each block from all blocks being initially dim:

```txt
block_transitions[0] = 0b10101101
block_transitions[1] = 0b11010110
block_transitions[2] = 0b10111010
block_transitions[3] = 0b01111001
block_transitions[4] = 0b11101010
block_transitions[5] = 0b00011111
block_transitions[6] = 0b01100111
block_transitions[7] = 0b11010101
```

At this point I thought: this would be a good Leetcode question.

## Problem

Given a `block_transitions` list like the one above, what is the shortest hit sequence
that would transform a given state `start` to an end state `end`?
A hit sequence is a list of indices for `block_transitions` that determines the order
in which we hit the blocks.

## Approach

This is a graph traversal problem, where each transition in `block_transitions`
is used to obtain the next possible states from a given state.
Starting from `start`, we can apply a BFS to determine the first instance that we land on `end`.
During the traversal, we keep track of the parent of each state so we can
reconstruct the path after we reach `end` in the BFS traversal.

## Implementation

```python
from collections import deque
from typing import Optional


def shortest_hit_sequence(
    block_transitions: list[int],
    start: int = 0,
    end: int = 0xFF
) -> Optional[list[int]]:
    if start == end:
        return []

    parent: dict[int, Optional[int]] = {start: None}
    queue = deque([start])
    while queue:
        state = queue.popleft()
        for transition in block_transitions:
            next_state = state ^ transition
            if next_state in parent:
                continue
            parent[next_state] = state
            if next_state == end:
                return _reconstruct_hit_sequence(parent, end, block_transitions)
            queue.append(next_state)

    return None


def _reconstruct_hit_sequence(
    parent: dict[int, Optional[int]],
    end: int,
    block_transitions: list[int]
) -> list[int]:
    path = [end]
    curr = end
    while curr is not None:
        parent_node = parent[curr]
        if parent_node is not None:
            path.append(parent_node)
        curr = parent_node
    path.reverse()
    transition_index = {transition: i for i, transition in enumerate(block_transitions)}
    return [transition_index[path[i] ^ path[i - 1]] for i in range(1, len(path))]


def main():
    block_transitions = []
    with open("data.txt") as f:
        for line in f:
            block_transitions.append(int(line, 2))
    print(shortest_hit_sequence(block_transitions))


if __name__ == "__main__":
    main()
```

The `block_transitions` data is stored in a separate file `data.txt`:

```txt
10101101
11010110
10111010
01111001
11101010
00011111
01100111
11010101
```

## Final answer

The answer is `[1, 2, 3, 4]`!
This is 0-indexed, so I solved the puzzle by hitting the second, third, fourth, and fifth block in that order.
