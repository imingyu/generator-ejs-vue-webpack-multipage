var _ = require('lodash'),
    path = require('path'),
    fs = require("fs"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    webpack = require("webpack"),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function () {
    var baseConfig = require('./webpack.base')(),
        HtmlPluginForRenderEjs = require('./html-plugin-render-ejs');

    baseConfig.output = {
        publicPath: "/",
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[id].[hash:8].js"
    };

    //按照页面导出css
    var pagesCssExtract = new ExtractTextPlugin('pages', 'css/[name].[hash:8].css');
    baseConfig.plugins.push(pagesCssExtract);

    //vue组件编译相关
    baseConfig.module.vue = {
        loaders: {
            css: {
                test: /\.css$/,
                loader: pagesCssExtract.extract('vue-style-loader', 'css')
            },
            less: {
                test: /\.less$/,
                loader: pagesCssExtract.extract('vue-style-loader', 'css!less')
            }
        },
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    };


    baseConfig.module.loaders.push({
        test: /\.css$/,
        loader: pagesCssExtract.extract("style", "css")
    });
    baseConfig.module.loaders.push({
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=css/fonts/[name].[hash:8].[ext]"
    });
    baseConfig.module.loaders.push({
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=css/fonts/[name].[hash:8].[ext]"
    });
    baseConfig.module.loaders.push({
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: "file?name=css/fonts/[name].[hash:8].[ext]"
    });
    baseConfig.module.loaders.push({
        test: /\.(swf|jpg|png|gif)$/,
        loader: "file?name=img/[name].[hash:8].[ext]"
    });
    baseConfig.module.loaders.push({
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: "file?name=css/fonts/[name].[hash:8].[ext]"
    });
    baseConfig.devtool = "#source-map";

    //env
    baseConfig.plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));

    //清空上次生成的文件
    baseConfig.plugins.push(new CleanWebpackPlugin(baseConfig.output.path));


    //提取入口文件&编译ejs为html文件
    require('./entrys')(baseConfig);
    baseConfig.plugins.push(new HtmlPluginForRenderEjs());

    //提取公用模块
    baseConfig.plugins.push(new CommonsChunkPlugin({
        name: "common",
        filename: "js/[name].js",
        minChunks: 3,
        chunks: Object.keys(baseConfig.entry)
    }));


    //压缩
    baseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            dead_code: false,
            warnings: false,
            properties: false
        },
        mangle: {
            except: ['$super', '$', 'exports', 'require']
        },
        output: {
            screw_ie8: false
        },
        screwIE8: false
    }));

    return baseConfig;
}