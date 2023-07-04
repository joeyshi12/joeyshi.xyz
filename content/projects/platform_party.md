---
title: Platform Party
description: Real-time multiplayer browser platformer made with p5.
date: 2023-07-02T10:49:38-07:00
tags: ["Web"]
repoName: platform-party
language: TypeScript
featured: true
---

Real-time multiplayer browser platformer made with p5.

- [Website](https://platform-party.joeyshi.xyz)
- [Source code](https://github.com/joeyshi12/platform-party)

This was primarily made using TypeScript and various browser APIs.

## Image processing

The first API I leveraged was the canvas scripting API, which offered useful image processing functions.
To start using this feature, I added a canvas element in my main HTML template file

```html
 <canvas id="game"></canvas>
```

Then, I get the [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
interface from this element in a separate script.

```javascript
 const ctx = document.getElementById("game").getContext("2d")
```

This interface contains useful methods, such as

```javascript
 drawImage(bitmap, x, y, width, height)
```

which I use to draw sprites on the screen.
This method requires the image in the form of a image bitmap
and to do that, we can use [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap),
which returns a `Promise<ImageBitmap>`.

```javascript
createImageBitmap(image)
createImageBitmap(image, options)
createImageBitmap(image, sx, sy, sw, sh)
createImageBitmap(image, sx, sy, sw, sh, options)
```
