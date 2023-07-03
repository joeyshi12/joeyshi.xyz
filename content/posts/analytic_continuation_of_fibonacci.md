---
title: Analytic continuation of the Fibonacci sequence
description: A look into how the Fibonacci sequence can be extended to the real domain.
date: 2023-01-07T22:58:20-08:00
tags: ["Math", "Desmos"]
---

The Fibonacci sequence can be written out as $0, 1, 1, 2, 3,\dots$,
where the following terms is defined by the sum of the 2 previous terms.
Letting $f(n)$ denote the $n$-th term of the sequence,
we can write this as $f(n+2) = f(n+1) + f(n)$ with initial values
$f(0) = 0$ and $f(1) = 1$.

## Finding a closed formula

To find a closed formula for this sequence,
we can use the classic [Characteristic Root Technique](https://discrete.openmathbooks.org/dmoi3/sec_recurrence.html#Hke) from discrete mathematics.

$$
f(n) = \frac{\phi^n + (-\frac{1}{\phi})^n}{\sqrt{5}}
$$

## Extending the closed formula to $\mathbb{R}$
