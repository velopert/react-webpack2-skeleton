# React-webpack2-skeleton

React-webpack2-skeleton is a lightweight React boilerplate that uses Webpack2. url-loader and sass-loader have been configured to this project by default.

## Requirement

- Node `^6.0.0`
- yarn `^0.20.0` or npm `^3.0.0` 

## Getting started

First, clone the project:

```bash
$ git clone https://github.com/velopert/react-webpack2-skeleton.git <project-name>
cd <project-name>
```

Then, install the dependencies. It is recommended to use Yarn, (because it is blazing fast). You can still use npm as well.

```bash
$ yarn install # or npm install
```

## Script usage

You can execute the scripts below by `yarn run <script>` or `npm run <script>`.

| Command | Description                                                   |
|---------|---------------------------------------------------------------|
| start   | Starts webpack development server; served at `localhost:3000` |
| build   | Bundles the source in `~/build` directory                     |
| clean   | Removes `~/build` directory                                   |

## Directory structure

```
- config               # webpack configuration files
- public               # directory for index.html
- src                  # application source code 
----- components       # directory for presentational components
----- containers       # directory for container components
----- styles           # directory for appliaction styles (in scss format)
--------- base         # global styles
--------- components   # styles for each components
```