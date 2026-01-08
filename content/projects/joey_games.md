---
title: Joey's games
description: A collection of web games made using the HTML5 canvas API.
date: 2023-07-02T10:49:38-07:00
tags:
  - gamedev
  - web
language: TypeScript
---

A collection of web games I made and host.

- [Game Website](https://play.joeyshi.xyz/)
- [Source code](https://github.com/joeyshi12/joeys-games)

These games were made primarily using the HTML5 canvas API,
which offers useful image processing functions that I use for drawing.

## Platform Party

A multiplayer browser platformer that I implemented using
the previously mentioned canvas API and [socket.io](https://socket.io).
I preprocess the spritesheet image by converting each sprite square in
the image into an [`ImageBitmap`](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap)
by calling [`createImageBitmap`](https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap).
Then, I'm able to draw sprites by calling [`CanvasRenderingContext2D#drawImage`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
on the rendering context of the canvas element.

Additionally, I implemented a map maker in the game that leverages
the same mathematical concepts mentioned in
[my post about panning and zooming](/posts/panning_and_zooming/).

## Snake

This is the classic arcade snake game implemented for the web.
I added a leaderboard to make the game more fun and competitive.
Both the web server and database is self-hosted.
Check out [my post about self-hosting](/posts/guide_to_self_hosting/).
