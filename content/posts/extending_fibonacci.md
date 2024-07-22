---
title: Extending the Fibonacci sequence to the real domain
description: A look into how the Fibonacci sequence can be extended to the real domain.
date: 2023-01-07T22:58:20-08:00
tags: ["Math"]
mathjax: true
desmos: true
scripts: ["/js/extending_fibonacci.js"]
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

\begin{align}
c_1 &= -c_2 = \frac{1}{\sqrt{5}} \\\\
f(n) &= \frac{\phi^n - (-\frac{1}{\phi})^n}{\sqrt{5}}
\end{align}

## Extending the closed formula to $\mathbb{R}$

From previous, we found 2 linearly independent solutions to the recursive equation $f(n+2) = f(n+1) + f(n)$:

$$
f_1(n) = \phi^{n},\quad f_2(n) = (-1/\phi)^{n}.
$$

To extend the Fibonacci sequence to the real numbers,
we will find solutions to the following system:

\begin{cases}
    f(x + 2) = f(x + 1) + f(x),\quad x\in\mathbb{R} \\\\
    f(0) = 0,\quad f(1) = 1
\end{cases}

Let $x\in\mathbb{R}$. We proceed to express $f_2(x)$ in polar form.

\begin{align}
    f_2(x) &= (-1/\phi)^{x} \\\\
    &= (e^{-\log(\phi) + (\pi + 2\pi n)i})^{x},\quad n\in\mathbb{Z} \\\\
    &= \phi^{-x}e^{i(1 + 2n)\pi x}
\end{align}

This implies $g_n(x) = \phi^{-x}e^{i(1 + 2n)\pi x}$ are all linearly independent solutions.
Thus, the general solution is of the form

$$
f(x) = c_1\phi^n + \phi^{-x}\sum_{n=0}^{\infty} a_n\cos((1 + 2n)\pi x) + b_n\sin((1 + 2n)\pi x)
$$

Plugging in the initial conditions, we get

$$
c_1 = -\sum_{n=0}^{\infty} a_n = \frac{1}{\sqrt{5}}.
$$

Thus, the solution is

$$
f(x) = \frac{\phi^n}{\sqrt{5}} - \frac{\phi^{-x}}{\sqrt{5}}\sum_{n=0}^{\infty} a_n\cos((1 + 2n)\pi x) + b_n\sin((1 + 2n)\pi x),
$$

where $\sum_{n=0}^{\infty} a_n = 1$ and $\\{b_n\\}$ is arbitrary.
Although this approach seemed novel initially,
one could have also simply observed that any function of the form
$h_1(x)\phi^{x} - h_2(x)\phi^{-x}$ with $h_1(n) = 1$ and $h_2(n) = (-1)^n$ for any integer $n$ also works.
However, we arrived at a nice function that generates nice curves
which also depicts the Fibonacci numbers and that's all that matters 🙂.

## Example

The plot below depicts the case of $a_n = \frac{1}{2^{n + 1}}$ and $b_n = 0$.

{{< template >}}
<div id="calculator"></div>
{{</ template >}}
