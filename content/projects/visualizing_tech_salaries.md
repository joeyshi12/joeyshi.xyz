---
title: Visualizing Tech Salaries
description: Visualization for tech salaries in America made with d3
date: 2023-07-02T10:49:38-07:00
tags: ["Web", "School"]
repoName: tech-salaries-vis
language: TypeScript
featured: true
---

A visualization for understanding the distribution of salaries of workers in the tech industry.
This project was something I worked on with a group while taking CPSC 447 at UBC.

- [Visualization](https://joeyshi.xyz/tech-salaries-vis/)
- [Write-up](https://raw.githubusercontent.com/joeyshi12/tech-salaries-vis/main/documentation/M3_Final_Project_Submission.pdf)
- [Source code](https://github.com/joeyshi12/tech-salaries-vis)

## Data Dictionary

The following data was processed from [Salaries for Jobs in Data Science and Tech](https://www.kaggle.com/datasets/jackogozaly/data-science-and-stem-salaries) (removed):

| Attribute         | Type         | Cardinality/Range |
|-------------------|--------------|-------------------|
| company           | Categorical  | 1631              |
| title             | Categorical  | 15                |
| basesalary        | Quantitative | [0, 1659870]      |
| yearsofexperience | Quantitative | [0, 69]           |
| yearsatcompany    | Quantitative | [0, 69]           |
| location          | Categorical  | 1050              |

This dataset consists of tech salary information from North America
recorded in the time between January 1st, 2019 and September 9th, 2020.

## Views

**Geographic distribution of workers**

![Geographic distribution of workers](https://raw.githubusercontent.com/joeyshi12/tech-salaries-vis/main/img/count_map.png)

**Geographic distribution of worker salaries**

![Geographic distribution of worker salaries](https://raw.githubusercontent.com/joeyshi12/tech-salaries-vis/main/img/salary_map.png)

**Histograms of worker salary, years of experience, and tenure**

![Histogram 1](https://raw.githubusercontent.com/joeyshi12/tech-salaries-vis/main/img/histogram_1.png)

![Histogram 2](https://raw.githubusercontent.com/joeyshi12/tech-salaries-vis/main/img/histogram_2.png)

![Histogram 3](https://raw.githubusercontent.com/joeyshi12/tech-salaries-vis/main/img/histogram_3.png)

**Bar chart of the companies with the most amount of salary records**

![Bar chart](https://raw.githubusercontent.com/joeyshi12/tech-salaries-vis/main/img/barchart.png)
