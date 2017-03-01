const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: paths.context,
    entry: [
            'react-hot-loader/patch', 
            'webpack-dev-server/client?http://0.0.0.0:3000', 
            'webpack/hot/only-dev-server', 
            paths.appIndexJs,
            paths.appStyle,
    ],
    output: {
        path: paths.appBuild,
        filename: 'static/js/[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.(css|scss)$/,
                    /\.json$/
                ],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // same configuration with react-app preset,
                            // except the babel-plugin-syntax-dynamic-import, which collides with react-hot-loader
                            // (it is not necessary in webpack2)
                            presets: [
                                ["latest", {
                                    "es2015": {
                                        "modules": false
                                    }
                                }],
                                "react"
                            ],
                            plugins: [
                                // class { handleClick = () => { } }
                                'transform-class-properties',
                                // { ...todo, completed: true }
                                ['transform-object-rest-spread', { useBuiltIns: true }],
                                // Polyfills the runtime needed for async/await and generatorss
                                ['transform-runtime', {
                                    helpers: false,
                                    polyfill: false,
                                    regenerator: true,
                                    moduleName: path.dirname(require.resolve('babel-runtime/package'))
                                }],
                                ['transform-regenerator', {
                                    // Async functions are converted to generators by babel-preset-latest
                                    async: false
                                }],
                                // react-hot-loader (remember, always put this at the last)
                                "react-hot-loader/babel"
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml
        })
    ],
    resolve: {
        modules: [
            paths.context,
            'node_modules'
        ]
    },
    devServer: {
        contentBase: paths.context,
        port: 3000,
        hot: true,
        inline: false,
        historyApiFallback: true
    },
};