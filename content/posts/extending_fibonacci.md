---
title: Extending the Fibonacci sequence to the Complex Domain
description: A look into how the Fibonacci sequence can be extended to the complex domain.
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
r_1, r_2 = \frac{1 \pm \sqrt{5}}{2} = \phi, -\frac{1}{\phi},\quad \phi = \frac{1 + \sqrt{5}}{2}.
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

## Extending the closed formula to $\mathbb{C}$

From previous, we found 2 linearly independent solutions to the recursive equation $f(n+2) = f(n+1) + f(n)$:

$$
f_1(n) = \phi^{n},\quad f_2(n) = (-1/\phi)^{n}.
$$

Let $z = x + yi$ be complex-valued.
We proceed to express $f_1(z), f_2(z)$ in standard form.

\begin{align}
f_1(z) &= \phi^{x + yi} \\\\
&= \phi^x(\cos(\log(\phi)y) + i\sin(\log(\phi)y)) \\\\
f_2(z) &= (-1/\phi)^{x + yi} \\\\
&= (e^{-\log(\phi) + (\pi + 2\pi n)i})^{x + yi},\quad n\in\mathbb{N} \\\\
&= e^{-\log(\phi)x - (1 + 2n)\pi y + ((1 + 2n)\pi x - \log(\phi)y)i} \\\\
&= \phi^{-x}e^{-(1 + 2n)\pi y}(\cos((1 + 2n)\pi x - \log(\phi)y) + i\sin((1 + 2n)\pi x - \log(\phi)y))
\end{align}

Thus, the general form of $f(z)$ is a linear combination of the functions listed above.
Then, plugging in the initial values will yield the general solution of the system.

\[More added soon\]
