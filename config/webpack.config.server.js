const paths = require('./paths');
const webpack = require('webpack');

process.env.NODE_ENV = 'development';

module.exports = {
    context: paths.context,
    entry: [paths.serverRendererJs],
    target: 'node',
    output: {
        path: paths.server,
        filename: 'renderer.js',
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                exclude: [
                    /\.(js|jsx)$/,
                    /\.json$/
                ],
                loader: 'ignore',
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['react-app'] }
                }],
            },
        ],
    },
    resolve: {
        modules: [
            paths.context,
            'node_modules'
        ]
    }
};
