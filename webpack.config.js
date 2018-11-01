const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: './src/main.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        setup: function(app, server) {
            app.get('^/api/*$', function(req, res) {
                const fpath = path.resolve(__dirname, `stub/${req.path}.json`)
                fs.readFile(fpath, (err, data) => {
                    if (err) {
                        return res.status(404).send({
                            error: `No readable file at ${fpath}`
                        })
                    }
                    res.type('json').send(data)
                })
            })
        },
        port: 8080,
    },
    devtool: NODE_ENV === 'development' ? 'eval' : void 0,
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};
