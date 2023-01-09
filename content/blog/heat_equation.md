---
title: "The Heat Equation"
date: 2023-01-07T22:58:20-08:00
tags: ["diff-eq", "calculus"]
---

The heat equation is given by $$u_{t} = \alpha^2 \nabla^2 u$$.

Let's first understand how exactly this equation models heat.
Consider the one dimensional case of the heat equation
$$u_{t} = \alpha^2 u_{xx}$$.

The function $$u(t, x)$$ models the heat of an object
at time $$t$$, at length $$x$$.
In practical applications this object would represent a beam.

Let's visualize how the beam's temperature changes over time
according to the heat equation
by plotting a few samples of $$u(t_i, x)$$ for different points
in time $$t_i$$.

Suppose we have the following initial values for $$u(0, x)$$.

// Insert diagram
