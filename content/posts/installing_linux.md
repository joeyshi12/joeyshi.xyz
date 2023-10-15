---
title: Installing Linux on old laptops
description: My troubleshooting steps for installing Linux on old laptops.
date: 2023-07-10T23:14:41-07:00
tags: ["Software"]
---

I spent the past few days attempting to convert
an old Aspire One mini laptop and Lenovo laptop into usable Linux servers.
This post documents the troubleshooting steps I took for each system.

## Aspire One

The important things to note about this system is that it has a 32-bit architecture and an i686 processor.
Some of the compatible distros I considered installing were Arch Linux, Debian, and Linux Mint.

During the installation process for Arch Linux and Debian,
my network interface was not detected, which made it annoying
to discover available networks to connect to.
This was because there were legacy firmware that did not come with these Linux installers.

Luckily, Linux Mint does manage to be able to discover available networks
during the live-USB installation process.
Discovering Wi-Fi networks after installing mint showed no results,
so it was necessary to use a wired connection temporarily and
install the necessary drivers for my network card.
The following guide was useful in this process:
[how to solve internet connection problems](https://easylinuxtipsproject.blogspot.com/p/internet.html#ID1.2).

## Lenovo

This computer is much newer compared to the Aspire One I had.
I first tried to install Ubuntu version 22.04 on the computer,
but came across a `grub-install failed` error during installation.

This turns out to be a well-known bug.
The solution I came across was to

1. Boot into the live-USB installer after the first install
2. Connect to internet
3. Install the `boot-repair` package and execute `boot-repair`

```sh
sudo add-apt-repository ppa:yannubuntu/boot-repair && sudo apt update
sudo apt install -y boot-repair && boot-repair
```
