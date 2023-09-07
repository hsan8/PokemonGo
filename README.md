# PokemonGo

### Node version

18.16.0

### Production Packages

| Name               | version         | Description                                                                                                                                        |
| :----------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| body-parser        | ^1.20.2         | process data sent through an HTTP request body                                                                                                     |
| cors               | ^2.8.5          | providing a Connect/Express middleware that can be used to enable CORS with various options                                                        |
| dotenv             | ^16.3.1         | load configuration from a '. env' file, that is in the current working directory, into environment variables                                       |
| eslint-plugin-node | ^11.1.0         | follows semantic versioning and ESLint's Semantic Versioning Policy.                                                                               |
| exceljs            | ^4.3.0          | read, manipulate and write spreadsheet data and styles to XLSX and JSON.                                                                           |
| express            | ^4.18.2         | fast, minimalist web framework for Node.js.                                                                                                        |
| express-validator  | ^7.0.1          | an express middleware that validates a request and returns a response with errors; if any of the configured validation rules fail.                 |
| fs                 | ^0.0.1-security | to work around the files and directories to carry out different tasks, such as a store, access, read, write, rename, and others                    |
| helmet             | ^7.0.0          | it acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards. |
| http               | ^0.0.1-security | collects several modules for working with the HyperText Transfer Protocol: http                                                                    |
| mongoose           | ^7.5.0          | Object Data Modeling (ODM) library for MongoDB distributed as an npm package                                                                       |
| multer             | ^1.4.5-lts.1    | middleware designed to handle multipart/form-data in forms. It is similar to the popular Node.js body-parser                                       |
| winston            | ^3.10.0         | is designed to be a simple and universal logging library with support for multiple transports                                                      |

### Development Packages

| Name                      | version | Description                                                                                                                                                                                                                                            |
| :------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nodemon                   | ^3.0.1  | automatically restarting the node application when file changes in the directory are detected                                                                                                                                                          |
| eslint                    | ^8.2.0  | a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways                                                                                                                                                     |
| eslint-config-airbnb      | ^19.0.4 | package provides Airbnb's .eslintrc as an extensible shared config.                                                                                                                                                                                    |
| eslint-config-airbnb-base | ^15.0.0 | package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.                                                                                                                                                    |
| eslint-config-prettier    | ^9.0.0  | turns off all rules that are unnecessary or might conflict with Prettier.                                                                                                                                                                              |
| eslint-plugin-import      | ^2.25.2 | This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names. All the goodness that the ES2015+ static module syntax intends to provide, marked up in the editor. |
| eslint-plugin-prettier    | ^5.0.0  | a tool that integrates ESLint and Prettier, two popular tools used in JavaScript development.                                                                                                                                                          |

### Project Tree

```
📦 POKEMON_GO
├─ src/
│  └─ 1 helpers
│     ├─ 1.1 errorsHandler
│     ├─ 1.2 constant
│     ├─ 1.3 middleware
│     └─ 1.4 utility
├─ app.js
├─ .eslintrc.js
├─ .gitignore
├─ package-lock.json
└─ package.json
```

### Setting up the development environment

```
1- Install docker
please refer to this link:
https://docs.docker.com/engine/install/ubuntu/

2- Install docker compose:
please refer to this link:
https://docs.docker.com/compose/install/linux/
```

### My system configuration:

```
RAM: 16.0 GiB
CPU: 11th Gen Intel® Core™ i7-1165G7 @ 2.80GHz × 8
OS Name: Ubuntu 22.04.1 LTS
OS Type: 64-bit
GNOME VERSION: 42.2
```
