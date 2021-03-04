const HtmlWebpackPlugin = require('html-webpack-plugin')
// 存在版本兼容问题
// webpack5 版本issue： https://github.com/vuejs/vue/issues/11718
// "html-webpack-plugin": "^4.5.0"
// "webpack": "^4.44.2",
// "webpack-dev-server": "^3.11.2",
const ClientRenderPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

const resolve = dir => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
    entry: {
        client: resolve('../src/entry/client.js')
    },
    // entry: resolve('../src/entry/client.js'),
    plugins: [
        new ClientRenderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('../public/index.html')
        }),
    ]
})