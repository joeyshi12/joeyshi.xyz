---
title: PC Builder
description: Website for browsing and putting together PC builds.
date: 2024-11-13T10:49:38-07:00
tags: ["Web"]
repoName: pc-builder
language: Java
featured: true
---

Website for browsing and putting together PC builds.

- [Website](https://pc-builder.joeyshi.xyz/)

This is a fullstack web application that was made using a
[Javalin](https://javalin.io) webserver, [MariaDB](https://mariadb.org/) database, and [Angular](https://angular.io/) frontend.
The website is served by my Raspberry Pi at home.
The Pi runs [Nginx](https://nginx.org/) as a reverse proxy to forward requests to a docker container running the PC Builder webserver.

