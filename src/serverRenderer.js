import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from 'containers/App';

import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import transit from 'transit-immutable-js';

const renderApp = (context, store, location) => ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
);

const renderPage = (html, preloadedState) => {
  return `
    <!DOCTYPE html>

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>React App</title>
        <link href="static/css/main.css" rel="stylesheet">
    </head>

    <body>
        <div id="root">
          ${html}
        </div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="static/js/vendor.js"></script>
        <script type="text/javascript" src="static/js/main.bundle.js"></script>
    </body>

    </html>
  `
}

const renderer = (req, res, next) => {

  // skips static directory
  if(req.path === '/favicon.ico' || req.path.split('/')[1] === 'static') return next();

  // This context object contains the results of the render
  const context = {}

  const store = configureStore();
  const location = req.url;

  renderApp(context, store, location);

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
  } else {    
    Promise.all(store.getState().promise).then(
      () => {
        // serialize the store, except the promise reducer (transit cannot handle it)
        store.getState().promise = [];
        var serialized = transit.toJSON(store.getState());
        res.write(renderPage(renderApp(context, store, location), serialized));
        res.end();
      }
    ).catch(
      (error) => {
        console.log(error);
        res.status(400);
        res.end();
      }
    )

  }
}

module.exports = renderer;