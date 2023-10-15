---
title: Guide to self-hosting
description: "Steps for how I configure and host servers at home."
date: 2023-10-02T23:29:29-07:00
tags: ["Software", "Web"]
---

Self-hosting is a convenient skill to have for anyone.
You can set up personal VPNs, personal cloud services, and more once you have
some of the basics down for running your own servers.
As a developer myself, I find they are useful for cheaply serving my web app projects to the internet.

## Picking a Host Machine

We first choose a computer that we want to use as our server.
In [this post](/posts/installing_linux),
I go into some detail about my experience installing different Linux distros onto old hardware,
but in most cases, I recommend installing [Ubuntu server](https://ubuntu.com/download/server)
as it is already configured to optimize idle power consumption.

Another easy solution for appropriate server hardware is to buy
a [Raspberry Pi](https://www.raspberrypi.com/products/), which
is a single-board basic personal computer that can be used to experiment with.

## Running the Web Application in Docker

Docker is a tool that provides OS-level virtualization in containers.
We will use this to create lightweight containers to run a web server in
a safe, isolated environment.

1. Install Docker and Docker compose with `sudo apt install docker.io docker-compose`
2. Run `systemctl status docker` to ensure Docker is running; otherwise run `sudo systemctl enable --now docker`
3. Create a `docker-compose.yml` in the project folder that runs the app.

The following `docker-compose.yml` example is used to run a Flask app project.

```yaml
version: '3.3'
services:
  devtools:
    image: python:3.10
    command: sh -c "pip3 install -r requirements.txt && waitress-serve --port=8080 --call app:create_app"
    working_dir: /dist
    volumes:
      - ./:/dist
    ports:
      - "80:8080"
```

This configuration pulls a Python3 Docker image from [dockerhub](https://hub.docker.com/_/python) and
exposes port 80 as the entry-point to the app which exposes port 8080 in the container.
When executing `docker-compose up -d` in project folder, a docker container will be created
and the command to install the Python dependencies listed in `requirements.txt` and serve the Flask app will be run.

Once the app is running in a container, test if you're able to make requests to the app.
In the above case, port 80 is exposed, so we can try to fetch the `index.html` page with `curl http://localhost` from the host machine.
If this outputs a successful response, then the app is running properly.
Otherwise, we can check the status of running containers with `docker ps`
and check any logs that were printed with `docker logs [CONTAINER_ID]`.
More information about the docker CLI can be found in [this cheat sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf).

## Serving to the Internet 

At this stage, it is possible to forward port 80 on the router and start accessing
the webpage through WAN address like `http://245.29.147.0` (random IP address).
But, this URL isn't very human-readable, so we will go through the steps of setting up a domain name.

When a client/browser makes HTTP requests with a domain, such as `https://devtools.joeyshi.xyz`,
it first must do a lookup to find the IP address associated with that domain name.
DNS (Domain name system) is a distributed database implemented as a hierarchy of many name servers.
The hierarchy can be thought as a search tree, where each node holds resource records.

![DNS hierachy](https://res.cloudinary.com/practicaldev/image/fetch/s--b9G6DenD--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.imgur.com/xOdVIPZ.png)

For our purposes, we will only care about 2 kinds of resource records:

1. A record - IPv4 address
2. NS record - Name server reference

To have a domain name point to our host machine's IP address,
we first need to purchase a domain name from a DNS registrar.
I personally use [Namecheap](https://www.namecheap.com/).

In the DNS settings of your chosen registrar,
we can simply add an A record whose value is the IP address of the host machine.
**Be sure to use the correct WAN address, not your private IP address using this [service](https://whatismyipaddress.com/)**.
Namecheap has a more detailed guide [here](https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain/).
It normally takes a few minutes before new records take effect.
We can check if they're up by doing a DNS lookup from the command-line with `dig [YOUR_DOMAIN]`.

Once you're able to look up your IP address using `dig`, then we can move onto
port forwarding port 80 on your router to your host machine.
Find your gateway router IP by running `netstat -nr`.

```sh
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.1.254   0.0.0.0         UG        0 0          0 wlp4s0
192.168.1.0     0.0.0.0         255.255.255.0   U         0 0          0 wlp4s0
```

In this case, my gateway router's IP is `192.168.1.254`,
so the router's webpage should be accessible by entering its IP into the browser.
Once you log in to your router, you should look for wherever the port forwarding
table is located and add an entry with the source HTTP port 80
targeting the IP of your host machine with the port specified to the one your web server is running on.

If all previous steps were done correctly,
requests to your domain will be able to hit your web server now.
You can test this in a browser or run `curl http://[YOUR_DOMAIN]` to check.

## Hiding your IP Address with Cloudflare

Before you start advertising your website, note that people
will be able to look up your IP address by doing a DNS look up with your domain name.
To resolve this issue, we will be using Cloudflare's DNS proxy feature to hide our IP.

A proxied record in Cloudflare is a record for which the requests with the associated domain name
will go through Cloudflare first before reaching your host machine.
From the outside, doing a DNS look up on a proxied record will return one of Cloudflare's IP,
so your IP will be hidden from people visiting your website.

[Here is a detailed guide for registering your DNS records under Cloudflare](https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-cloudflare-account/).

## Conclusion

Although this article omits some other details,
like configuring your host machine's firewall
and using Nginx as a reverse-proxy to serve multiple apps,
there is enough detail here to get started with self-hosting your projects.
I hope this encourages more people to get more involved with network technologies
and learn more about the internet.
