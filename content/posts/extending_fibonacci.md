---
title: Extending the Fibonacci sequence to the Real Domain
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

The characteristic polynomial for the Fibonacci sequence is given by
$r^2 - r - 1 = 0$, so the roots of this quadratic are

$$
r_1, r_2 = \frac{1 \pm \sqrt{5}}{2} = \phi, -\frac{1}{\phi}.
$$

The characteristic root technique tells us that the closed formula is of the form
$f(n) = c_1 \phi^n + c_2 (-1/\phi)^n$.
Plugging in the initial values, we get $0 = f(0) = c_1 + c_2$
and $1 = f(1) = c_1\phi - c_2/\phi$.

Solving this system gives us

$$
c_1 = \frac{1}{\sqrt{5}},\quad c_2 = -\frac{1}{\sqrt{5}}
$$

$$
f(n) = \frac{\phi^n - (-\frac{1}{\phi})^n}{\sqrt{5}}
$$

## Extending the closed formula to $\mathbb{R}$

TODO
