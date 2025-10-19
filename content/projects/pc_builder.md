---
title: PC Builder
description: Website for browsing and putting together PC builds.
date: 2024-11-13T10:49:38-07:00
tags: [Web]
repoName: pc-builder
language: Java
featured: true
---

Website for browsing and putting together PC builds.

- [Website](https://pc-builder.joeyshi.xyz/)
    - Test user credentials:
        - User: pcbuilder
        - Password: pcbuilder
- [Source code](https://github.com/joeyshi12/pc-builder)

This is a fullstack web application that was made using a
[Javalin](https://javalin.io) webserver, [MariaDB](https://mariadb.org/) database, and [Angular](https://angular.io/) frontend.
The website is served by my Raspberry Pi at home.
The Pi runs [Nginx](https://nginx.org/) as a reverse proxy to forward requests to a docker container running the PC Builder webserver.

## API Reference

{{< details "PUT /users" >}}
Updates the current logged in user.
- Request body
    - username: string
    - displayName: string
- Request cookie
    - JSESSIONID: string

**cURL example**

```sh
curl 'https://pc-builder.joeyshi.xyz/users' \
    --compressed \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H 'Cookie: JSESSIONID=<SESSION_ID>' \
    --data-raw '{"username":"pcbuilder","displayName":"New name"}'
```

**Response**

```json
{
  "username": "pcbuilder",
  "displayName": "New name"
}
```
{{< /details >}}

{{< details "POST /users/authenticate" >}}
Validates user credentials and assigns user to the current session if successful.
- Request body
    - username: string
    - password: string

**cURL example**

```sh
curl 'https://pc-builder.joeyshi.xyz/users/authenticate' \
    --compressed \
    -X POST \
    -H 'Content-Type: application/json' \
    --data-raw '{"username":"pcbuilder","password":"pcbuilder"}'
```

**Response**

```json
{
  "username": "pcbuilder",
  "displayName": "PC Builder"
}
```
{{< /details >}}

{{< details "POST /builds" >}}
Creates a new PC build under the current logged in user.
- Request body
    - displayName: string
    - description: string
    - cpuIds: string[]
    - motherboardIds: string[]
    - storageIds: string[]
    - memoryIds: string[]
    - videoCardIds: string[]
    - powerSupplyIds: string[]
- Request cookie
    - JSESSIONID: string

**cURL example**

```sh
curl 'https://pc-builder.joeyshi.xyz/builds' \
    --compressed \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'Cookie: JSESSIONID=<SESSION_ID>' \
    --data-raw '{"displayName":"PC Build","description":"New build","cpuIds":["ff1aca8a-2e6e-4218-ae6f-2e9f271c0623","fff83c80-f690-4c74-a619-e5ec20601538"],"motherboardIds":["ffb3ab8c-a261-4b01-9fd4-37f36c6c41e9"],"storageIds":["ff6c2c23-8ebb-42c1-9dca-b6090d443782","ff89df5f-56cd-4fd0-9a83-214049cb23f3","ffaff969-dfa5-4dc8-9be1-83a93107433e","ffc8ba11-ca96-40b0-8e8d-b992a19af4b7"],"memoryIds":["ffe26bdd-1926-47b4-a47f-999c0e83c50b","fff2e580-3ea8-436e-8bf6-af4441c34c90","fff357a1-b9a7-4739-85bb-a40bd7dcae6a","fff50b39-694e-49e5-a89c-192cb8f8688a"]}'
```

**Response**

```json
{
  "uuid": "fec477c1-d01a-4950-9e3c-a6220098d513",
  "displayName": "PC Build",
  "description": "New build",
  "username": "pcbuilder",
  "cpuIds": ["ff1aca8a-2e6e-4218-ae6f-2e9f271c0623", "fff83c80-f690-4c74-a619-e5ec20601538"],
  "motherboardIds": ["ffb3ab8c-a261-4b01-9fd4-37f36c6c41e9"],
  "storageIds": ["ff6c2c23-8ebb-42c1-9dca-b6090d443782", "ff89df5f-56cd-4fd0-9a83-214049cb23f3", "ffaff969-dfa5-4dc8-9be1-83a93107433e", "ffc8ba11-ca96-40b0-8e8d-b992a19af4b7"],
  "memoryIds": ["ffe26bdd-1926-47b4-a47f-999c0e83c50b", "fff2e580-3ea8-436e-8bf6-af4441c34c90", "fff357a1-b9a7-4739-85bb-a40bd7dcae6a", "fff50b39-694e-49e5-a89c-192cb8f8688a"],
  "creationDate": "1731569876000",
  "lastUpdateDate": "1733214757904"
}
```
{{< /details >}}

{{< details "GET /builds" >}}
Returns PC builds.
- Query parameters
    - ids: string[]

**cURL example**

```sh
 curl 'https://pc-builder.joeyshi.xyz/builds?ids=1ff52801-2080-4cea-965a-d08e0b7d4e63'
```

**Response**

```json
[{
  "uuid": "1ff52801-2080-4cea-965a-d08e0b7d4e63",
  "displayName": "mycoolbuilder",
  "description": "WOW",
  "username": "pcbuilder",
  "cpuIds": ["fdec0915-fe6f-4704-b477-163ef6c1da82", "ff00d7ae-1256-416a-8ce4-056342193011", "ff15ddbd-98d4-4c35-8543-50d7f40f357d", "ff1aca8a-2e6e-4218-ae6f-2e9f271c0623", "ffef56b9-f39c-4359-ba18-9ba721964135"],
  "motherboardIds": ["ffdc90ea-2284-443a-bb21-5445dc76cdea"],
  "memoryIds": ["ffde298a-486e-4d73-98ad-07a3b440f21f", "ffdfc2b0-eb5d-4d50-9b62-b0de3c796e30", "fff357a1-b9a7-4739-85bb-a40bd7dcae6a"],
  "creationDate": "1731624694000",
  "lastUpdateDate": "1731624694000"
}]
```
{{< /details >}}

{{< details "PUT /builds" >}}
Updates PC build under the current logged in user.
- Request body
    - uuid: string
    - displayName: string
    - description: string
    - cpuIds: string[]
    - motherboardIds: string[]
    - storageIds: string[]
    - memoryIds: string[]
    - videoCardIds: string[]
    - powerSupplyIds: string[]
- Request cookie
    - JSESSIONID: string

**cURL example**

```sh
curl 'https://pc-builder.joeyshi.xyz/builds' \
    --compressed \
    -X POST \
    -H 'Content-Type: application/json' \
    -H 'Cookie: JSESSIONID=<SESSION_ID>' \
    --data-raw '{"uuid":"fec477c1-d01a-4950-9e3c-a6220098d513","displayName":"PC Build","description":"New build","username":"pcbuilder","cpuIds":["ff1aca8a-2e6e-4218-ae6f-2e9f271c0623"],"creationDate":"1731569876000","lastUpdateDate":"1733297237000"}'
```

**Response**

```json
{
  "uuid": "fec477c1-d01a-4950-9e3c-a6220098d513",
  "displayName": "PC Build",
  "description": "New build",
  "username": "pcbuilder",
  "cpuIds": ["ff1aca8a-2e6e-4218-ae6f-2e9f271c0623"],
  "creationDate": "1731569876000",
  "lastUpdateDate": "1733297247830"
}
```
{{< /details >}}

{{< details "DELETE /builds/:id" >}}
Deletes the PC build with provided id parameter.
- Request cookie
    - JSESSIONID: string
{{< /details >}}

{{< details "GET /components/cpu" >}}
Returns CPU components.
- Query parameters
    - ids: string[]

**cURL example**

```sh
 curl 'https://pc-builder.joeyshi.xyz/components/cpu?ids=fff83c80-f690-4c74-a619-e5ec20601538'
```

**Response**

```json
[{
  "uuid": "fff83c80-f690-4c74-a619-e5ec20601538",
  "displayName": "Intel Celeron G465",
  "coreCount": 2,
  "coreClock": 1,
  "tdp": 35,
  "integratedGraphics": "Intel HD Graphics"
}]
```
{{< /details >}}

{{< details "GET /components/motherboards" >}}
Returns motherboard components.
- Query parameters
    - ids: string[]

**cURL example**

```sh
 curl 'https://pc-builder.joeyshi.xyz/components/motherboards?ids=fff57d4b-6111-4b52-b2f0-cbf244bc029c'
```

**Response**

```json
[{
  "uuid": "fff57d4b-6111-4b52-b2f0-cbf244bc029c",
  "displayName": "MSI MEG X570 ACE",
  "cpuSocket": "AM4",
  "formFactor": "ATX",
  "maxMemoryGigabytes": 128,
  "numMemorySlots": 4,
  "colour": "Black / Silver"
}]
```
{{< /details >}}

{{< details "GET /components/memory" >}}
Returns memory components.
- Query parameters
    - ids: string[]

**cURL example**

```sh
 curl 'https://pc-builder.joeyshi.xyz/components/memory?ids=fffd0b6c-11fd-4de4-9279-0454acb6ce95'
```

**Response**

```json
[{
  "uuid": "fffd0b6c-11fd-4de4-9279-0454acb6ce95",
  "displayName": "Mushkin Redline 6 GB",
  "ddrVersion": 3,
  "ddrClock": 1600,
  "numModules": 2,
  "moduleSizeGigabytes": 2,
  "colour": "Red / Silver",
  "firstWordLatency": 8,
  "casLatency": 7
}]
```
{{< /details >}}

{{< details "GET /components/storage" >}}
Returns storage components.
- Query parameters
    - ids: string[]

**cURL example**

```sh
 curl 'https://pc-builder.joeyshi.xyz/components/storage?ids=ffc8ba11-ca96-40b0-8e8d-b992a19af4b7'
```

**Response**

```json
[{
  "uuid": "ffc8ba11-ca96-40b0-8e8d-b992a19af4b7",
  "displayName": "Samsung 970 Evo",
  "capacityGigabytes": 1000,
  "type": "SSD",
  "cacheSizeMegabytes": 1024,
  "formFactor": "M.2-2280",
  "interface": "M.2 PCIe 3.0 X4",
  "price": 85
}]
```
{{< /details >}}

{{< details "GET /components/video-cards" >}}
Returns video card components.
- Query parameters
    - ids: string[]

**cURL example**

```sh
 curl 'https://pc-builder.joeyshi.xyz/components/video-cards?ids=ffcde59a-db0a-4225-8032-84f97b257a94'
```

**Response**

```json
[{
  "uuid": "ffcde59a-db0a-4225-8032-84f97b257a94",
  "displayName": "Inno3D iChill X4",
  "chipset": "GeForce GTX 1070",
  "memoryGigabytes": 8,
  "coreClock": 1620,
  "boostClock": 1822,
  "colour": "Silver / Black",
  "lengthMillimeters": 300
}]
```
{{< /details >}}

{{< details "GET /components/power-supplies" >}}
Returns power supply components.
- Query parameters
    - ids: string[]

**cURL example**

```sh
 curl 'https://pc-builder.joeyshi.xyz/components/power-supplies?ids=ffceb618-3ffe-4234-be69-7d7113604a14'
```

**Response**

```json
[{
  "uuid": "ffceb618-3ffe-4234-be69-7d7113604a14",
  "displayName": "SeaSonic PRIME Platinum",
  "type": "ATX",
  "efficiency": "platinum",
  "wattage": 850,
  "modular": "Full"
}]
```
{{< /details >}}
