var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            './index.js'
            ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        library: 'ReactBootstrapFormform',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        underscore: {
            root: '_',
            commonjs2: 'underscore',
            commonjs: 'underscore',
            amd: 'underscore'
        },
        'react-bootstrap': {
            root: 'ReactBootstrap',
            commonjs2: 'react-bootstrap',
            commonjs: 'react-bootstrap',
            amd: 'react-bootstrap'
        }
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            exclude: /(node_modules)/,
             loader: 'awesome-typescript-loader'
        }, {
            test: /\.less$/,
             loader: 'style!css!less'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    }
};