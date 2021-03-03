const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

const resolve = dir => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
    entry: {
        server: resolve('../src/entry/server.js'),
    },
    target: 'node',
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: resolve('../public/index.ssr.html'),
            excludeChunks: ['server'],
            minify: {
                // 魔法注释不能被删除
                removeComments: false
            }
        })
    ]
})