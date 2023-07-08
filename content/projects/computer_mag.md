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

This is a fullstack web application made with Java, MySQL, and
vanilla HTML/CSS/JavaScript.
The web server was implemented using [Javalin](https://javalin.io).
We originally used an Oracle JDBC to make database queries
with servers on UBC's undergraduate Linux machines.
However, I have migrated to MariaDB instead since Oracle
is not compatible with Raspberry Pi, which is what I use to host this app.

## API Reference

{{< details "POST /review" >}}
First creates new reviewer with passed reviewerID and reviewerName if reviewer does not exist in the database.

- Headers
    - reviewerID: number
- Body
    - computerModelNumber: string
    - reviewText: string
    - reviewScore: number
    - reviewerName: string

```sh
curl 'https://computer-mag.joeyshi.xyz/review'
     -H 'Content-Type: application/json'\
     -H 'reviewerID: -885519634'\
     -d '{ "computerModelNumber": "A2438", "reviewText": "SUPER NICE YEAH", "reviewScore": 10, "reviewerName": "Anon512" }'
{
    "reviewerName": "Anon512",
    "reviewScore": 10,
    "reviewDate": "2022-11-21",
    "computerModelNumber": "A2438",
    "reviewID": 8855,
    "reviewText": "SUPER NICE YEAH"
}
```
{{< /details >}}

{{< details "DELETE /review/{id}" >}}
Deletes existing review.

- Params
    - id
- Headers
    - reviewerID: number
{{< /details >}}

{{< details "PATCH /review/{id}">}}
Updates existing review.

- Params
    - id
- Headers
    - reviewerID: number
- Body
    - (optional) reviewText: string
    - (optional) reviewScore: number
{{< /details >}}

{{< details "GET /reviews/{computerModelNumber}" >}}
Get reviews of specified computer model.

- Params
    - computerModelNumber

```sh
curl 'https://computer-mag.joeyshi.xyz/reviews/A2179'
[
    {
        "reviewID": 128405987,
        "reviewScore": 10,
        "reviewText": "Superb",
        "reviewDate": -61539667200000,
        "reviewerName": "Mary Banks",
        "yearsOfExperience": 3,
        "reviewerID": 3
    },
    {
        "reviewID": -885519634,
        "reviewScore": 10,
        "reviewText": "SUPER NICE YEAH",
        "reviewDate": -61476508800000,
        "reviewerName": "Mary Banks",
        "yearsOfExperience": 3,
        "reviewerID": 3
    }
]
```
{{< /details >}}

{{< details "GET /components">}}
Searches components of `componentType` with a `componentModelNumber` containing the string `search`.
Returns specified `attributes` of matching components.

- Params
    - contentType
    - attributes
    - search

```sh
curl 'https://computer-mag.joeyshi.xyz/components?componentType=ram&attributes=componentModelNumber&attributes=memory&search=16'
[
    {
        "memory": 16,
        "componentModelNumber": "CMK16GX4M2B3200C16"
    },
    {
        "memory": 32,
        "componentModelNumber": "CMK32GX4M2B3200C16"
    },
    {
        "memory": 64,
        "componentModelNumber": "CMK64GX4M2D3000C16"
    },
    {
        "memory": 16,
        "componentModelNumber": "KSM24RS46MEI"
    }
]
```
{{< /details >}}

{{< details "GET /models" >}}
Returns only the models reviewed by all verified reviewers if `onlyReviewedByAllVerified` is set to True.
Otherwise, returns `attributes` of models with a 'brandName' containing the string `search`.

If `onlyReviwedByAllVerified` is set to True, `attributes` and `search` must not be specified.

If `onlyReviwedByAllVerified` is not specified or set to False, `attributes` is required and `search` is optional.

- Params
    - attributes xor onlyReviwedByAllVerified=True
    - (optional) search (only allowed if onlyReviwedByAllVerified != True)

```sh
curl 'https://computer-mag.joeyshi.xyz/models?attributes=brandName&attributes=listPrice&search=Surface'
[
    {
        "brandName": "Surface Pro 8",
        "listPrice": 1099
    },
    {
        "brandName": "Microsoft Surface Studio",
        "listPrice": 3949
    }
]

curl 'https://computer-mag.joeyshi.xyz/models?onlyReviewedByAllVerified=True'
[
    {
        "computerModelNumber": "A2179",
        "brandName": "MacBook Air",
        "listPrice": 1299.0
    }
]
```
{{< /details >}}

{{< details "GET /models/avg-scores" >}}
Returns average review scores of models.

Models must have at least `count` number of reviews, if defined.

- Body
    - onlyAboveAvg: boolean
    - (optional) count: number

```sh
curl https://computer-mag.joeyshi.xyz/models/avg-scores
[
    {
        "name": "AWAUR13-7143WHT-PUS",
        "price": 1499.99,
        "score": 93,
        "scoreType": "AVG"
    },
    {
        "name": "A2179",
        "price": 1299.0,
        "score": 72,
        "scoreType": "AVG"
    },
    {
        "name": "A2438",
        "price": 1599.99,
        "score": 17,
        "scoreType": "AVG"
    }
]
```
{{< /details >}}

{{< details "GET /models/min-scores" >}}
Returns minimum review scores of models.

```sh
curl https://computer-mag.joeyshi.xyz/models/min-scores
[
    {
        "name": "AWAUR13-7143WHT-PUS",
        "price": 1499.99,
        "score": 93,
        "scoreType": "MIN"
    },
    {
        "name": "A2179",
        "price": 1299.0,
        "score": 58,
        "scoreType": "MIN"
    },
    {
        "name": "A2338",
        "price": 1699.0,
        "score": 80,
        "scoreType": "MIN"
    }
]
```
{{< /details >}}
