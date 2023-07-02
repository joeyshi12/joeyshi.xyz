---
title: Differential Equation Solver
description: A desktop application that uses the finite difference method to solve differential equations.
date: 2023-07-02T10:49:38-07:00
tags: ["Python", "Math"]
scripts: ["https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js"]
repoName: diff-eq-solver
language: Python
---

While learning about methods of solving PDEs (partial differential equations),
my professor at the time showed the class a novel way of using Excel
to compute the solution of 1D time-dependent PDE systems and animating them
with a slider feature.

## Computing PDE solutions numerically

We start with defining the PDE problem.
Typically, this will include the PDE itself,
a boundary condition, and the initial condition.
I'll use the 1D heat equation to serve as an example:

\begin{cases}
\textbf{PDE}: &u_{t} = \alpha^2 u_{xx},\quad 0 < x < L, t > 0 \\\
\textbf{BC}: &u(0, t) = u(L, t) = 0 \\\
\textbf{IC}: &u(x, 0) = f(x)
\end{cases}

## Excel magic

...

## Automating the process

So I thought interesting project to
