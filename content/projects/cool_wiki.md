---
title: Cool Wiki
description: A collection of notes I've made publicly available while attending courses at UBC.
date: 2023-07-02T10:49:38-07:00
tags: ["Web", "School"]
repoName: cool-wiki
language: HTML
---

In my final year at UBC, I decided to typeset notes for some of my courses.

- [Website](https://wiki.joeyshi.xyz)
- [Source code](https://github.com/joeyshi12/cool-wiki)

To make some of these notes publicly available,
I used the following workflow to convert a collection of markdown
notes into HTML pages using [Pandoc](https://pandoc.org/index.html).

## Organization

```sh
.
├── Makefile
├── content
│   ├── cpsc406
│   │   ├── convexity.md
│   │   ├── duality.md
│   │   ├── gradient_descent.md
│   │   ├── linear_contraints.md
│   │   ├── linear_programming.md
│   │   ├── projected_grad_descent.md
│   │   └── zero_sum_game.md
│   ├── exam
│   │   ├── index.md
│   │   ├── math303_2015WT2.md
│   │   ├── math303_2016WT2.md
│   │   └── math303_2022WT2.md
│   ├── math303
│   │   ├── bd_process.md
│   │   ├── branching_process.md
│   │   ├── ctmc.md
│   │   ├── distributions.md
│   │   ├── markov_chain.md
│   │   ├── poisson_process.md
│   │   └── stationary_distribution.md
│   └── math316
│       ├── heat_equation.md
│       └── series_solutions.md
└── templates
    └── basic.md
```

I first organize all my markdown files within the `/content` folder.
I further group my files by different courses I am taking.

I use Pandoc to transcompile each markdown file as a separate HTML page
whose relative path in the target folder is the same as the markdown file in the content folder.

## Makefile

```makefile
MD_FILES=$(shell find ./content -name \*.md)
HTML_FILES=$(MD_FILES:.md=.html)
BUILD_HTML_FILES=$(HTML_FILES:%=docs/%)

all: $(BUILD_HTML_FILES)

docs/%.html: %.md
	@mkdir -p $$(dirname $@)
	pandoc -s --mathjax -o $@ $<

new:
	$(if $(path),\
		@mkdir -p content/$$(dirname $(path));\
		cp -i templates/basic.md content/$(path),\
		$(error syntax: make new path=<content-path>)\
	)

clean:
	-rm -rf docs/content
```
