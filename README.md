![](/assets/boost-banner.png) 
<!-- <p align="center">
 <img src="./kafka_sprout_logo_v3.svg" width="400" height="320">
</p> -->

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com"/>
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues"/>
  <img src="https://travis-ci.org/boennemann/badges.svg?branch=master" /> 
</p>

<h2 align="center">Microsoft Excel for Developers</h2>

## About Us
Boost is a Microsoft Excel Add-in to help developers import large excel workbooks into their database using SQL queries. Microsoft Excel has more than 30 million users and is the most popular spreadsheet application on the market. It is one of Microsoft’s core products since Excel’s release in 1985 and it has a new user every five minutes.

## Features

📝 **Reading and writing from multiple sheets to query table**

💪 **Ability to write and use custom functions directly in Excel with TypeScript**

***
<br>

## Getting Started

### Installation

**Prerequisite**: Install Microsoft Excel Desktop version 16 and up.

1. Fork and clone this repository.
2. ```npm install```
3. ```npm start```

### Technologies
[Excel](https://www.microsoft.com/en-us/microsoft-365/excel) | [Excel JS API](https://docs.microsoft.com/en-us/office/dev/add-ins/reference/overview/excel-add-ins-reference-overview) | [React](https://reactjs.org/) | [React Hooks](https://reactjs.org/docs/hooks-intro.html) |  [Typescript](https://www.typescriptlang.org/) | [SQL](https://www.postgresql.org/) | [CodeMirror](https://codemirror.net/) | [Jest](https://jestjs.io/)

***
<br>

 ## How it works

### How to open
1. Go to the ribbon **INSERT**, **Add-Ins**. Click on Boost and head back to **HOME** to open. 
<img src="/assets/boost-demo-1_1.5x.gif" width="800px" />

### Querying
2. Click on the **Query** tab in the add-in to utilize the querying feature. Query across multiple worksheets in your Excel application.
<img src="/assets/boost-demo-2_1.5x.gif" width="800" />

### Custom Function Creations
3. Click on the **IDE** tab to create and save customized TypeScript functions. 
<img src="/assets/boost-demo-3_1.5x.gif" width="800" />

***
<br>

## The Boost Team
<hr>

> Charles Ren [@codeWithRen](https://github.com/codeWithRen) <br />
> Chloe Courtois [@chloecourt](https://github.com/chloecourt) <br />
> Janson Xavier  [@JansonXavier](https://github.com/JansonXavier) <br />
> Sophia Sam  [@sophiasam96](https://github.com/sophiasam96) <br />

<hr>

***

## If You Want To Contribute!

If you found this interesting or helpful at all, feel free to drop a :star: [![GitHub stars](https://img.shields.io/github/stars/oslabs-beta/Boost?style=social&label=Star&)](https://github.com/oslabs-beta/Boost/stargazers) :star: on this project to show your support!

All bugs, tasks or enhancements are tracked as <a href="https://github.com/oslabs-beta/Boost/issues">GitHub issues</a>. 

The following is a list of features + improvements for future open-source developers that the Boost team has either started or would like to see implemented. If you have additional new ideas, feel free to implement those as well! Much appreciated. 

Query:
- Implementing **JOIN** clause for Querying 
- Handling invalid/duplicate names in Query input
- Row management in the Query table

Custom Functions
- Reading and writing from the text editor to functions.ts file
- Creating custom functions in Typescript

Other: 
- React Hooks testing
- Containerization with Docker

## License
This project is available under the MIT License.
