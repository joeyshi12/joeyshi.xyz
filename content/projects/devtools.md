---
title: Devtools
description: Custom tools made for software development purposes
date: 2023-07-07T19:19:43-07:00
tags: ["Software", "Web"]
repoName: devtools
language: HTML
---

A collection of custom made tools for programming tasks or challenges I've encountered.

- [Website](https://devtools.joeyshi.xyz)
- [Source code](https://github.com/joeyshi12/devtools)

## Webhook tester

The webhook tester page allows users to capture requests sent to `/webhook/<webhook_id>/capture` and displays the contents.
This feature was inspired by a cross-site scripting CTF challenge I attempted.
This tool is useful for inspecting request contents from webhook service providers, such as Discord or Github.

## JSON Schema Transcompiler

This service is a wrapper for a Python library I wrote: [jdtt](https://pypi.org/project/jdtt/).
This feature was made to aid in tasks involving serializing the JSON payload from
API requests to standard container classes for different programming languages.

## CSV Visualizer

The CSV visualizer allows users to generate 2D data visualizations from a given CSV and query
written in a custom DSL I made: [PQL](https://github.com/joeyshi12/pql-parser/blob/main/README.md).
