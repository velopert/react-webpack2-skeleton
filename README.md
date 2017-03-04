# React-webpack2-skeleton

React-webpack2-skeleton is a Universal React boilerplate that uses Webpack2. 

## Features 
 - Webpack2 with url-loader, sass-loader, css-loader, babel-loader
 - react-hot-loader@3.0.0
 - react-router@4.0.0 
   - Code splitting
   - Server rendering with express
 - redux
   - [Duck structure](https://github.com/erikras/ducks-modular-redux) is used in this project
   - Async actions are handled by redux-promise-middleware
   - ImmutableJS is used in the reducers
   - `transit-immutable-js` is used to serialize / deserialize the Immutables 
   - [Redux DevTool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko) is enabled

Demo: https://react-skeleton-wkygtzffmg.now.sh/ (There's nothing special with the demo page. It is just to check code splitting & server-side rendering is working, by using developer tool.


> **NOTE**
> Babel configuration is same as create-react-app  
> Code splitting only works in production mode
> 

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
| hmr    | React-hot-loader                                |
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
| start:dev      | Starts webpack development server; served at `localhost:3000` |
| start          | Starts production server; served at `localhost:8080`          |
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
----- helpers          # directory for various needed for async stuff
----- styles           # directory for application styles (in scss format)
--------- base         # global styles
--------- components   # styles for each components
```

## How To
### Create a Promise Action
In this boilerplate, async actions are handled by `redux-promise-middleware`. And there are some useful helpers that are provided in `helpers` directory that makes handling async actions much more easier.

First, if you have never used `redux-promise-middleware`, you might want to check their [documentation](https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md) to see how this middleware works.

What this basically does is it automatically dispatches actions for `PENDING`, `FULFILLED`, `REJECTED` when a promise is dispatched.

For example, when following action gets dispatched: 
```javascript
{
  type: 'FOO',
  payload: {
    promise: new Promise()
 }
```

The middleware will process the promise, and it will dispatch a pending action.
```javascript
{
	type: 'FOO_PENDING'
}
```

When it is successfully done, it will dispatch a fulfilled action
```javascript
{
	type: 'FOO_FULFILLED',
	payload: { 
		// ... resolved value
	}
}
```

Or, if there is an error, it will dispatch a rejected action
```javascript
{
	type: 'FOO_REJECTED',
	error: true
	payload: { 
		// ... rejected value
	}
}
```

Let's suppose you have a `getPage(n)` function that retrieves the **n** th page:
```
function getPage(n) {
	return axios.get('/page/' + n);
}
```

Then, the ordinary way to create a async action creator is:
```javascript
const getPage = (n) => ({
  type: 'PAGE_GET',
  payload: api.getPage(n)
});
```
I wanted to make the code simpler, so I created a `createPromiseAction` module. The code below is identical with the code above.
```javascript
export const getPage = createPromiseAction({
    type: 'PAGE_GET',
    promiseCreator: api.getPage
});
```
If there is more than one parameter, just make it into an object, like:
```javascript
function getPage({username, n}) {
	return axios.get(`/page/${username}/${n}`);
}
```

### Understand the DUCK structure for redux
Rather than separating actionTypes, actionCreators, reducers in separated file, duck structure aims to put them in a single file.  `redux/modules/sample.js` is the sample of redux duck structure.

When you create them, just remember 
 - actions are prefixed, as `sample/SOMETHING_DO`, by doing this, you can use a duplicated action names in different reducers.
 - when you name the action, put the nouns at the front and verbs at the back. For example: `MEMO_ADD`, `MEMO_REMOVE`, or `MODAL_OPEN`. It makes you easier to group the actions with same prefixes.
 - when you create the actionCreators, put the verbs at the front and nouns at the back. For example: `addMemo`, `removeMemo`, `openModal`. It just makes more sense. Also, remember to `export` the action creators so that it can be imported from other modules, or components by `import * as sample from './sample';`

`handleActions` is used to handle the actions rather than using `switch ... case...` This function is provided from `redux-actions`. I recommend you to read through their [documentation](https://github.com/acdlite/redux-actions) before you use this. It makes your code more readable, and also fixes the scope issue. For example, you can use `const` or `let` for different actions in a same reducer.)

> You don't have to follow these  rules above, it is just to make the life easier. If you find this is complicated, you can do it on your own way.

### Using Immutable for reducer
The combination of ImmuableJS and Redux is blazingly awesome. Check how it simple it is when it comes to handling the actions.
```
    [SOMETHING_DO]: (state, action) => {
        return state.set('something', 'done');
    },
```
This code above is similar as:
```
	[SOMETHING_DO]: (state, action) => {
		return {
			...state,
			something: 'done'
		};
	},
```
When the data inside the store gets more complex, Immutable reveals it's true value. Here's another example
```
	[EXAMPLE]: (state, action) => {
		return state.set(['something', 'inside'], true);
	}
```
is similar to:
```
	[EXAMPLE]: (state, action) => {
		return {
			...state,
			something: {
				...something,
				inside: true
			}
		}
	}
```

### Handling Async Actions
Here's the fun part, when `redux-promise-middleware` is used, following code is an ordinary way to handle the async actions:
```
	[DATA_FETCH + "_PENDING"]: (state, action) => { ... },
	[DATA_FETCH + "_FULFILLED"]: (state, action) => { ... },
	[DATA_FETCH + "_REJECTED"]: (state, action) => { ... },
```
I found the way above is annoying, because you have to create 3 action handlers every time you handle an async action.
So I created a helper module called `pender`, which makes this process much easier.

First, you have to create a `pending` Map in the initialState of the reducer, and put a boolean value that has the same name as the action creator.
```
const initialState = Map({
    pending: Map({
        fetchData: false
    }),
    ...
});
```

Now, we are gonna use the `pender`. What this does is it creates an array of three action handlers automatically when you pass the object. When it is pending, it will set the `pending.fetchData` to `true`, and when it is done, it will set to `false`. It also allows you to do other stuffs after changing the pending value. When action handlers array is created, you can spread the array inside the parameter object for the `handleActions`.  This makes the code more readable.


```javascript
export default handleActions({
    ...pender({
        type: DATA_FETCH,
        name: 'fetchData',
        onFulfill: (state, action) => {
            return state.set('result', action.payload.result);
        }
        ,// onReject: (state, action) => { ... }
    })

}, initialState);
```
`onFullfill` and `onReject` can be omitted. In that situation, it will change the pending value only.

### Connecting the component to redux
Check out the `src/containers/routes/Home` Component. To universally fetch the data, you have to dispatch an async action from `componentWillMount` By doing so, the `promiseWaiter` middleware will stack the promise into the `promise` reducer. Then, the server will wait for those promises to finish before it responds to the browser.

### Asynchronously Load the routes
If you asynchronously load the routes, you can do the **code splitting**! Code splitting is only enabled in production mode. Every time you create a new route, you have to edit the `containers/routes/Routes` file first. You just need to re-export the routes. This is used only for the development mode. (I disabled the code splitting in the development mode because not only it is not needed, but also collides with the react-hot-loader.

Then, edit the `container/routes/RouteAsync`. This is the magic happens.  You can asynchronously load the routes by following code:
```javascript
export const Home = asyncRoute(() => System.import('./Home'));
```
Webpack is configured to use this file only in the production mode. 
(Check out webpack.NormalModuleReplacementPlugin  config of the `config/webpack.config.js` file)

## References

- https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.an4fk0m9d
- http://moduscreate.com/code-splitting-for-react-router-with-es6-imports/
- https://www.codementor.io/reactjs/tutorial/redux-server-rendering-react-router-universal-web-app

## Questions?
If you have any issues, feel free to post the issues. Pull Requests are welcomed. 