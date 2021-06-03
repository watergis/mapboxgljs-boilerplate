const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new Dotenv()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            ],
        },
        ],
    },
    devServer: {
        contentBase: __dirname + '/dist',
        publicPath: '/',
        watchContentBase: true,
        open: true
    },
    externals: {
        'mapbox-gl': 'mapboxgl'
    }
};