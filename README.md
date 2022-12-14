# BondSports Assignment backend
### Documantation: https://documenter.getpostman.com/view/16374253/2s8YmUKeST

## Prerequisites  
 to run this server you will need to have on your computer: 
  - node.js 
  - mongoDB
  
## Setup

```
npm install
```
## Development

- copy the .env.example to .env file
```
cp .env.example .env
```
```
npm run dev
```
## Lint

```
npm run lint
```

## Test

```
npm run test
```
![image](https://user-images.githubusercontent.com/88501456/203079030-cd357e5f-d7a5-4a7a-9173-1d2ab26d3969.png)


Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [typescript](https://www.npmjs.com/package/typescript)
  * TypeScript is a language for application-scale JavaScript.
* [ts-node](https://www.npmjs.com/package/ts-node)
  * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [typescript-eslint](https://typescript-eslint.io/)
  * Tooling which enables ESLint to support TypeScript.
* [jest](https://www.npmjs.com/package/mocha)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

