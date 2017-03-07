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
                test: require.resolve("vue"), loader: "expose-loader?Vue" 
            },
            {
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
        resolve: {
            alias: {
                "src": path.resolve(__dirname, '../src'),
                "root": path.resolve(__dirname, '../'),
                'vue':'vue/dist/vue.common.js'
            },
            extensions: ['', '.js', '.vue', '.css']
        },
        plugins: [
            new IgnorePlugin(/node_modules$/),//排除部分不需要编译的文件
            new HappyPack({
                threads: 4,
                loaders: ['babel', 'css', 'vue']//优化编译速度
            }),
            new webpack.ProvidePlugin({
                Vue: 'vue'
            })
        ]
    };
};