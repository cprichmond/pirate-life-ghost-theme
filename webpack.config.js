var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        path.join(__dirname, '/assets/js/webpack.entry.js')
    ],
    output: {
        path: path.join(__dirname, '/assets/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(ttf|eot|woff)(\?.*)?$/,
                loaders: ['url']
            },
            {
                test: /\.(svg)(\?.*)?$/,
                loaders: ['url', 'svgo']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css', 'postcss']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: [/\.js$/, /\.es6$/],
                exclude: 'node_modules',
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules|jquery*/,
                loaders: ['eslint']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['url-loader?limit=8192']
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    eslint: {
        parser: 'babel-eslint'
    },
    postcss: function() {
        return [autoprefixer];
    }
};
