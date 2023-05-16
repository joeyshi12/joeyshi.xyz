---
title: "Analytic continuation of the Fibonacci sequence"
date: 2023-01-07T22:58:20-08:00
tags: ["Desmos", "Calculus"]
---

The Fibonacci sequence is often presented as $0, 1, 1, 2, 3,\dots$,
where the next term is defined by the sum of the 2 previous terms.
This property can be written as $f(n+2) = f(n+1) + f(n)$, where
the $n$-th term of the sequence is given by $f(n)$.
Note that we also must define some initial condition $f(0) = 0$ and $f(1) = 1$.

To reach a closed-form solution for this function, we may observe that
$f(n+2) - f(n+1) - f(n) = 0$ is a linear equation.
Then, like in the case of differential equations, we can
guess that the form of the solutions is $r^x$ for some $r$
and take the linear combination of all such solutions.
After working it out and plugging in the initial conditions,
you can find that the closed-form solution must be $f(n) = \frac{1}{\sqrt{5}}(\phi^x - (-1/\phi)^x)$
