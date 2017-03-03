import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from 'containers/App';

const renderer = (req, res) => {

  // This context object contains the results of the render
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  )

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
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
        <script type="text/javascript" src="static/js/vendor.js"></script>
        <script type="text/javascript" src="static/js/main.bundle.js"></script>
    </body>

    </html>
    `)
    res.end()
  }
}

module.exports = renderer;