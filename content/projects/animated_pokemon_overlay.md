---
title: Animated Pokemon overlay
description: A web page overlay with animated Pokemon sprites roaming around.
date: 2025-05-08T23:25:07-07:00
tags:
  - web
weight: 1
scripts:
  - /js/pmd.js
language: JavaScript
---

I had some time off this week and decided the best way to spend that
time was to start another random project.
So, I implemented an animation system for Pokemon Mystery Dungeon sprites in vanilla JavaScript.

- [Website](https://pmd.joeyshi.xyz)
- [Source code](https://github.com/joeyshi12/joeyshi.xyz/blob/main/static/js/pmd.js)
- [PMD collab sprites](https://sprites.pmdcollab.org/#/)

I would normally use TypeScript for client-side projects,
but I wanted to try using [JSDoc](https://jsdoc.app/about-getting-started) for static typing.
It also felt good not needing to setup another build system with npm.

This was inspired by a friend's suggestion to make the mii maker plaza,
where you can view all your mii creations and drag them around the screen.

![Mii parade](/img/mii_parade.webp)

I ended up going with 2D Pokemon sprite animations since my group and I found it more aesthetic.
I let some Pokemon loose on this page, but I've disabled interactions since their interactions conflict with other elements.
But, you can try out the drag-and-drop interaction at https://pmd.joeyshi.xyz.

