---
title: Differential Equation Solver
description: A desktop application that uses the finite difference method to solve differential equations.
date: 2023-07-02T10:49:38-07:00
tags: [Software, Math]
repoName: diff-eq-solver
language: Python
featured: true
mathjax: true
---

A desktop application that uses the finite difference method
to solve differential equations.

- [PyPI Page](https://pypi.org/project/diffeq-solver-tk/)
- [Source code](https://github.com/joeyshi12/diff-eq-solver)

This application uses techniques from these
[lecture notes](https://personal.math.ubc.ca/~peirce/M257_316_2012_Lecture_8.pdf)
to compute the solution of PDEs numerically.

## Numerical algorithm for solving the heat equation

We let $u(t, x)$ be the solution function for the differential equation defined by

$$
\begin{align}
\text{PDE}:\quad &u_{t}(t, x) = \alpha u_{xx}(t, x) + S(t, x), 0 < x \leq L, 0 < t \leq T \\\\
\text{BC}:\quad &u(t, 0) = \Phi_1(t),\quad u_{t}(t, L) = \Phi_2(t) \\\\
\text{IC}:\quad &u(0, x) = f(x)
\end{align}
$$

Let $u[i][j] = u(i \Delta t, j \Delta x)$ for $i = 0$ to $i = K - 1$
and $j = 0$ to $j = N - 1$ for $\Delta t = T / (K - 1)$
and $\Delta x = L / (N - 1)$.
For $\Delta t$ small enough, we can approximate $u_{t}(t, x)$ with
the forward difference:

$$
u_{t}(t, x) = (u(t + \Delta t, x) - u(t, x)) / \Delta t
$$

For $\Delta x$ small enough, we can approximate $u_{xx}(t, x)$ with the second order central difference:

$$
u_{xx}(t, x) = \frac{u(t, x + \Delta x) - 2 u(t, x) + u(t, x - \Delta x)}{(\Delta x)^2}
$$

So after substituting and rearranging $u_{xx}$, $u_{t}$ in
$u_{t}(t, x) = \alpha u_{xx}(t, x) + S(t, x)$, we get

$$
u(t + \Delta t, x) = u(t, x) + \frac{\alpha \Delta t}{(\Delta x)^2} (u(t, x + \Delta x) - 2 u(t, x) + u(t, x - \Delta x)) + S(t, x) \Delta t
$$

Thus, we can compute all values of $u[i][j]$ with the following:

$$
u[i][j] = \begin{cases}
u[i - 1, j] + \frac{\alpha \Delta t}{(\Delta x)^2} (u[i - 1, j + 1] - 2 u[i - 1, j] + u[i - 1, j - 1]) + S(i \Delta t, j \Delta x) \Delta t, &\text{if } 0 < i \leq K - 1, 0 < j < N - 1 \\\\
\Phi_1(i \Delta t), &\text{if } j = N - 1 \\\\
u[i, N - 2] + \Phi_2(i \Delta t) \Delta t, &\text{if } j = 0 \\\\
f(j \Delta x), &\text{if } i = 0
\end{cases}
$$

- [Implementation](https://github.com/joeyshi12/diff-eq-solver/blob/main/src/diffeq_solver_tk/finite_difference.py)
