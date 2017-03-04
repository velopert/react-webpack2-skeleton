# React-webpack2-skeleton

React-webpack2-skeleton is a lightweight React boilerplate that uses Webpack2. 

## Features 
 - Webpack2 with url-loader, sass-loader, css-loader, babel-loader
 - react-hot-loader@3.0.0
 - react-router@4.0.0 
   - Code splitting
   - Server rendering with express

> Code Splitting only works in production mode

## Requirement

- Node `^6.0.0`
- yarn `^0.20.0` or npm `^3.0.0` 

## Getting started

First, clone the project:

```bash
$ git clone https://github.com/velopert/react-webpack2-skeleton.git <project-name>
$ cd <project-name>
```

### Branches

Just in case you do not need some features, different branches are provided in this project.

| Branch | Description                                     |
|--------|-------------------------------------------------|
| light  | Pure react project environment with SCSS loader |
| hmr    | React-hot-loader applied                        |
| router | React-router, server render, code-splitting     |

```bash
$ git checkout <branch>
```

Then, install the dependencies. It is recommended to use Yarn, (because it is blazing fast). You can still use npm as well.

```bash
$ yarn install # or npm install
```

## Script usage

You can execute the scripts below by `yarn run <script>` or `npm run <script>`.

| Command        | Description                                                   |
|----------------|---------------------------------------------------------------|
| start          | Starts webpack development server; served at `localhost:3000` |
| start:prod     | Starts production server; served at `localhost:8080`          |
| build          | Bundles the source in `~/build` directory                     |
| build:server   | Bundles the source to server renderer in `~/server` directory |

## Directory structure

```
- config               # webpack configuration files
- public               # directory for index.html
- server               # server render
- src                  # application source code 
----- components       # directory for presentational components
----- containers       # directory for container components
----- styles           # directory for appliaction styles (in scss format)
--------- base         # global styles
--------- components   # styles for each components
```