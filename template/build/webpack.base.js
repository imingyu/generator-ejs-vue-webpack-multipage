var path = require("path"),
    webpack = require("webpack"),
    IgnorePlugin = webpack.IgnorePlugin,
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HappyPack = require("happypack");

module.exports = function () {
    return {
        context: path.resolve(__dirname, '../'),
        entry: {},
        output: {},
        module: {
            loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: "babel"
            }, {
                test: /\.html$/,
                loader: "html"
            }]
        },
        plugins: [
            new IgnorePlugin(/srcipts\/plugins\/*.js$/),//排除部分不需要编译的文件
            new HappyPack({
                threads: 4,
                loaders: ['babel', 'css']//优化编译速度
            })
        ],
        resolve: {
            alias: {
                "src": path.resolve(__dirname, '../src'),
                "root": path.resolve(__dirname, '../')
            }
        },
        externals: {
            "$": "window.jQuery",
            "jQuery": "window.jQuery",
            "jquery": "window.jQuery",
            "lodash": "window._",
            "_": "window._",
            "Vue": "window.Vue",
            "vue": "window.Vue"
        }
    };
};