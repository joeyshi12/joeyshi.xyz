---
title: Panning and zooming
description: Guide to implementing panning and zooming in graphical applications.
date: 2024-07-22T23:30:29-07:00
tags:
  - math
mathjax: true
scripts:
  - /js/panning_and_zooming.js
toc: true
---

This post goes over some of the mathematics involved in panning and zooming in graphical applications.

Points can be described in world space or view space.
The world space is a linear [basis](https://en.wikipedia.org/wiki/Basis_(linear_algebra))
that describes where objects positioned relative to the world while the view space is a basis
that is used to describe points relative to the view that the user sees.

When panning or zooming in the view, a different translation and scale is being applied
to view coordinates to determine what slice of the world should be drawn in the view.
Let $A_1 = T_{1}S_{1}$ be the change-of-basis matrix from the initial view space to world space,
where $T_{1}, S_{1}$ is a translation matrix and scale matrix respectively.

$$
\begin{align}
T_{1} &= \\begin{bmatrix}
0 & 0 & x_{t_{1}} \\\\
0 & 0 & y_{t_{1}} \\\\
0 & 0 & 1
\\end{bmatrix}, &
S_{1} &= \\begin{bmatrix}
s_{1} & 0 & 0 \\\\
0 & s_{1} & 0 \\\\
0 & 0 & 1
\\end{bmatrix}
\end{align}
$$

## Panning

In click-drag panning, clicking and dragging the mouse on the view should translate the view
in such a way that the mouse in world coordinates does not change.
Let the mouse's displacement from the initial mouse down position in world space be $\\pmatrix{\Delta x, \Delta y, 0}^T$.
Then, the change-of-basis matrix from the new view space to world space is
$A_2 = (T_{1} + \\text{diag}(\\Delta x, \\Delta y, 0))S_{1}$.

## Zooming

In scroll zooming, when a user scrolls in the view, scale transformation is applied
relative to the mouse position $m$ by some scaling factor $\\Delta s$.
Let $A_{2} = T_{2}S_{2}$ be the change-of-basis matrix from the new view space to the world space.
Clearly, we have

$$
S_{2} = \\begin{bmatrix}
\\Delta s \\cdot s_{1} & 0 & 0 \\\\
0 & \\Delta s \\cdot s_{1} & 0 \\\\
0 & 0 & 1
\\end{bmatrix}.
$$

Since the scroll scale transformation is centered at $m = \\pmatrix{x_{m}, y_{m}, 1}^T$ (world space),
the old view space coordinates of the mouse position is equal to the new view space coordinates
of the mouse position. That is,

$$
\begin{align}
    A_{1}^{-1}m &= A_{2}^{-1}m \\\\
    (T_{1}S_{1})^{-1}m &= (T_{2}S_{2})^{-1}m \\\\
    S_{1}^{-1}T_{1}^{-1}m &= S_{2}^{-1}T_{2}^{-1}m \\\\
    \\Rightarrow \\frac{x_{m} - x_{t_{1}}}{s_{1}} &= \\frac{x_{m} - x_{t_{2}}}{\\Delta s \\cdot s_{1}} \\\\
    x_{t_2} &= x_{t_1} - (x_{m} - x_{t_1})(\\Delta s - 1)
\end{align}
$$

Similarly, we can show $y_{t_2} = y_{t_1} - (y_{m} - y_{t_1})(\\Delta s - 1)$. Thus,

$$
T_{2} = \\begin{bmatrix}
0 & 0 & x_{t_1} - (x_{m} - x_{t_1})(\\Delta s - 1) \\\\
0 & 0 & y_{t_1} - (y_{m} - y_{t_1})(\\Delta s - 1) \\\\
0 & 0 & 1
\\end{bmatrix}.
$$

## Demo

Below is an SVG with click-drag panning and scroll zooming interactions I implemented in JavaScript.
The view to world matrix is set through the [`transform`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform)
attribute inside an inner group element in the SVG and this attribute is updated by
mouse event listener callback functions.

- [Source code](https://github.com/joeyshi12/joeyshi.xyz/blob/main/static/js/panning_and_zooming.js)

{{< template >}}
<svg width="100%" height="500" style="background: white">
    <defs>
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" stroke-width="1"/>
        </pattern>
        <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#smallGrid)"/>
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="black" stroke-width="2"/>
        </pattern>
    </defs>
    <g>
        <rect width="401" height="401" fill="url(#grid)" />
    </g>
</svg>
{{</ template >}}

