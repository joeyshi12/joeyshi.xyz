---
title: Guide to self-hosting
description: How to configure and host servers at home.
date: 2023-10-02T23:29:29-07:00
tags:
  - homelab
---

Self-hosting is a convenient skill for anyone:
it allows you set up personal VPNs, cloud services, and more.
As a developer, I find it convenient to host my web app projects from the comfort of my home.
So, I'll be sharing my workflow for serving web applications to
demonstrate how to self-host a service.

## Setting up the host machine

We first choose our host machine: the computer that we want to use as our server.
One option is to start off with is a [Raspberry Pi](https://www.raspberrypi.com/products/),
which is a single-board basic personal computer.
Any old unused hardware, such as laptops or desktops are also perfectly suitable
to be used as a server. This is a great way to repurpose old technology.

Install a Linux distro on the host machine, such as [Arch Linux](https://archlinux.org/download/).
Your distro of choice should ideally be minimal with few packages needing to be installed.

## Running services through Docker

Docker is a tool that provides OS-level virtualization in containers.
In this section, I'll demonstrate how to host your own Wordpress site locally.

Install Docker and Docker compose packages and enable with `systemctl enable --now docker`.
Create the following `docker-compose.yml` for running your own Wordpress site locally:

```yaml
services:

  wordpress:
    image: wordpress
    restart: always
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: exampleuser
      WORDPRESS_DB_PASSWORD: examplepass
      WORDPRESS_DB_NAME: exampledb
    volumes:
      - wordpress:/var/www/html

  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_DATABASE: exampledb
      MYSQL_USER: exampleuser
      MYSQL_PASSWORD: examplepass
      MYSQL_RANDOM_ROOT_PASSWORD: '1'
    volumes:
      - db:/var/lib/mysql

volumes:
  wordpress:
  db:
```

> Compose file from https://hub.docker.com/_/wordpress

Executing `docker-compose up -d` will create a container for the Wordpress site and
a container for a MySQL database that will store data for Wordpress.
Verify these containers are running with `docker ps`
(See [Docker cheat sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf) for other commands).
The Wordpress container is exposed on port 8080, so you'll be able to access the site on `http://localhost:8080`.

## Serving over the Internet 

Other computers in your network should also be able to access the web app.
Check the IPv4 address of your server with `ipconfig`.
Then, from another machine, you should be able to access the site on `http://<IPv4>:8080`.

To make this website accessible from outside your network,
port forward port 80 on your router to port 8080 on the server from your router's settings page.
If you do not remember the URL of your gateway router, you can check the IP of your gateway with
the following command:

```sh
$ netstat -nr

Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.1.254   0.0.0.0         UG        0 0          0 wlp4s0
192.168.1.0     0.0.0.0         255.255.255.0   U         0 0          0 wlp4s0
```

In my case, it was `http://192.168.1.254`.
Once you log in to your router, you should look for wherever the port forwarding
table is located and add an entry with source HTTP port 80, destination port 80,
and the IP of your host machine.

If all previous steps were done correctly, the website should be accessible publicly
from `http://<WAN_IPv4>`, where `WAN_IPv4` is your [WAN address](https://en.wikipedia.org/wiki/Wide_area_network).

## Setting up a domain name

Normally websites are discovered by their domain name rather than a IP address,
so this section will focus on how to get your own domain name and have it point to your website.

### DNS background

DNS (Domain Name System) is a distributed database implemented as a hierarchy of many name servers.
This can be thought as a search tree where each node holds records of
IP addresses (A records) or references to other name servers (NS records).
To make sure requests to your domain resolves to your WAN address and reach your website,
you need to create an A record that points to the IP address.
For more information about DNS resource record types, read [the DNS RFC](https://datatracker.ietf.org/doc/html/rfc1035).

![DNS hierachy](https://www.hostnoc.com/wp-content/uploads/2024/01/DNS2.jpg)

### Creating DNS records

To setup a domain name, you need to first purchase a domain from a registrar like [Cloudflare](https://www.cloudflare.com/).
Once purchased, you'll want to find the DNS records table.
Create an A record that points to your WAN IP. 
It may take a few hours before changes to the DNS records table takes effect.
You can verify that your record has been created by running `nslookup <domain_name`;
if the command resolves to the expected IP, then you're set.
You should now be able to access the website from `http://<domain_name>`!

## Remarks

If you made it this far, you have successfully self-hosted an app at home.
Improvements can be made from this point, such as setting up HTTPS, a firewall, and reverse-proxy.
If you're interested about other services you can host at home, take a look at Luke Smith's [landchad.net](https://landchad.net/).
Feel free to explore and adapt these steps to your specific needs. Happy hosting!
