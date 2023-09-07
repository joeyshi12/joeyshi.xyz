---
title: ComputerMag
description: Wiki for laptops and desktops with technical details and reviews.
date: 2023-07-02T10:49:38-07:00
tags: ["Web", "School"]
repoName: computer-mag
language: Java
featured: true
---

Wiki for laptops and desktops with technical details and reviews.
This was a group project done for a UBC computer science course: CPSC 304.

- [Website](https://computer-mag.joeyshi.xyz/)
- [ER Diagram](/img/er_diagram.png)

This is a fullstack web application that was originally made with
Java, MySQL, and vanilla HTML/CSS/JavaScript.
The web server was implemented using [Javalin](https://javalin.io).

I later redesigned the frontend to use [Angular](https://angular.io/)
and setup my Raspberry Pi to be able to run this application in a Docker container.
The database system also needed to switch from Oracle to MariaDB
because no Docker image for Oracle DB was compatible with my Raspberry Pi (an armv7 system).

## API Reference

{{< details "POST /reviews" >}}
Creates a new review for a user with id `reviewerId` if review `uuid` is empty;
otherwise, updates the existing review with id `uuid`.

- Body
    - uuid: string
    - textContent: string
    - score: int
    - reviewerId: string
    - creationDate: int
    - computerModelNumber: string

```sh
curl 'https://computer-mag.joeyshi.xyz/reviews'\
    -H 'Content-Type: application/json'\
    -d '{"uuid":"","textContent":"wow","score":100,"reviewerId":"0c79e350-bb99-4bfe-9a7e-17dd5a1ed8fc","creationDate":0,"computerModelNumber":"A2338"}'
{
    "uuid": "9bacda64-4ebf-413b-a562-96cfcc6df4f3",
    "textContent": "wow",
    "score": 100,
    "reviewerId": "0c79e350-bb99-4bfe-9a7e-17dd5a1ed8fc",
    "creationDate": 1694064693078,
    "computerModelNumber": "A2338"
}
```
{{< /details >}}

{{< details "DELETE /reviews/{id}" >}}
Deletes existing review.

- Path params
    - reviewerId: string
{{< /details >}}

{{< details "GET /reviews/model/{computerModelNumber}" >}}
Get reviews of the computer model with the given `computerModelNumber`.

- Path params
    - computerModelNumber

```sh
curl 'https://computer-mag.joeyshi.xyz/review/model/A2338'
[
    {
        "uuid": "1a7c4b6f-40f0-47f7-98e1-40e2b4a06634",
        "score": 85,
        "textContent": "Awesome laptop!",
        "creationDate": 1633910400000,
        "reviewerName": "Victoria Higgins",
        "yearsOfExperience": 1,
        "reviewerId": "8e43a9f3-8dfb-4a96-9d91-5a6ea58f7440"
    },
    {
        "uuid": "b61f79ef-99ea-43f2-a37f-725a62a242f5",
        "score": 90,
        "textContent": "I love how fast Photoshop runs on this machine!",
        "creationDate": 1633651200000,
        "reviewerName": "Mary Banks",
        "yearsOfExperience": 3,
        "reviewerId": "a4b1d28b-86b3-4f90-92c5-6c94f0b86c9c"
    },
    {
        "uuid": "cf54b9c9-9407-4fe5-bc8c-845cfa4e7b24",
        "score": 90,
        "textContent": "This laptop is fast.",
        "creationDate": 1633737600000,
        "reviewerName": "Bob Dylan",
        "yearsOfExperience": 4,
        "reviewerId": "5721e880-35a5-4152-9075-ea01265f4d3b"
    }
]
```
{{< /details >}}

{{< details "GET /{componentType}">}}
Returns a list of components of the given `componentType`.

- Path params
    - componentType: (cpu|gpu|ram)

```sh
curl 'https://computer-mag.joeyshi.xyz/cpu'
[
    {
        "componentModelNumber": "BX8070811700K",
        "brandName": "Intel Core",
        "companyName": "Intel",
        "description": "Intel CPU",
        "clockSpeed": 3.6
    },
    {
        "componentModelNumber": "BX8071512100F",
        "brandName": "Intel Core",
        "companyName": "Intel",
        "description": "Intel CPU",
        "clockSpeed": 3.3
    },
    {
        "componentModelNumber": "BX8071512400",
        "brandName": "Intel Core",
        "companyName": "Intel",
        "description": "Intel CPU",
        "clockSpeed": 2.5
    },
    {
        "componentModelNumber": "M1",
        "brandName": "Apple Silicon",
        "companyName": "Apple",
        "description": "Apple CPU",
        "clockSpeed": 0.0
    },
    {
        "componentModelNumber": "M2",
        "brandName": "Apple Silicon",
        "companyName": "Apple",
        "description": "Apple CPU",
        "clockSpeed": 0.0
    }
]
```
{{< /details >}}

{{< details "GET /models" >}}
Returns a list of computer models.

- Query params
    - search: string - filters for models containing the search string in their name

```sh
curl 'https://computer-mag.joeyshi.xyz/models?search=Think'
[
    {
        "computerModelNumber": "21CB00D1US",
        "brandName": "ThinkPad",
        "listPrice": 4399.0
    }
]
```
{{< /details >}}

{{< details "GET /scores" >}}
Returns aggregated review scores of models.

- Query params
    - aggregationFunctionType: (AVG|MIN|MAX)
    - minimumNumberOfReviews: int
    - shouldOnlyIncludeAboveAverage: boolean

```sh
curl 'https://computer-mag.joeyshi.xyz/scores?aggregationFunctionType=AVG'
[
    {
        "name": "AWAUR13-7143WHT-PUS",
        "brand": "Aurora R13",
        "price": 1499.99,
        "score": 81
    },
    {
        "name": "A2179",
        "brand": "MacBook Air",
        "price": 1299.0,
        "score": 78
    },
    {
        "name": "AI2-00001",
        "brand": "Microsoft Surface Studio",
        "price": 3949.0,
        "score": 69
    }
]
```
{{< /details >}}
