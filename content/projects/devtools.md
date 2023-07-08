---
title: Devtools
description: Custom tools made for software development purposes
date: 2023-07-07T19:19:43-07:00
tags: ["Web"]
repoName: devtools
language: HTML
---

A collection of custom made tools for programming tasks or challenges I've encountered.

- [Website](https://devtools.joeyshi.xyz)
- [Source code](https://github.com/joeyshi12/devtools)

## Webhook debugger

The webhook debugger page lists the contents of requests captured from the `/webhook/capture` endpoint.
This feature was inspired by a cross-site scripting CTF challenge I attempted.
This tool is also useful for inspecting request contents from webhook service providers, such as Discord or Github.

## JSON Schema Transcompiler

This service is a wrapper for a Python library I wrote: [jdtt](https://pypi.org/project/jdtt/).
This feature was made to aid in tasks involving serializing the JSON payload from
API requests to standard container classes for different programming languages.
