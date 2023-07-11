---
title: Installing Linux on Old Laptops
description: My troubleshooting steps for installing Linux on old laptops.
date: 2023-07-10T23:14:41-07:00
tags: ["Linux"]
---

I spent the past few days attempting to convert
an old Aspire One mini laptop and Lenovo laptop into usable Linux servers.
This post documents the troubleshooting steps I faced during the process.

## Aspire One

The important things to note about this system is that it has a 32 bit architecture
and has a i686 processor. I needed a Linux distro that was compatible with these
specs. Some distros I considered were Arch Linux, Debian, and Linux Mint.

During the installation process during Arch Linux and Debian, I noticed
that my network interface was not detected, which made it impossible
to discover available networks to connect to.
This was because there were legacy firmware that did not come
with most Linux installers.

Luckily, Linux Mint does manage to be able to discover available networks
during the live-USB installation process.
However, after the installation, I noticed that my network connection was unstable:
the connection would die after a few minutes of usage and my available networks
would no longer be discoverable.
The fix for this was to install the necessary firmware for broadcom after the installation finishes.

**Useful Links**

- [Mint Forums: WiFi Fails Following Restart](https://forums.linuxmint.com/viewtopic.php?t=339223).
- [How to solve internet connection problems ](https://easylinuxtipsproject.blogspot.com/p/internet.html#ID1.2)


## Lenovo

This computer is much newer compared to the Aspire One I had.
I first tried to install Ubuntu version 22.04 on the computer,
but came across an `grub-install failed` error during installation.

This turns out to be a well-known bug.
The solution I came across was to

1. Boot into the live-USB installer after the first install
2. Connect to internet
3. Install the `boot-repair` package and execute `boot-repair`

```sh
sudo add-apt-repository ppa:yannubuntu/boot-repair && sudo apt update
sudo apt install -y boot-repair && boot-repair
```
