var path = require("path"),
    fs = require("fs"),
    _ = require('lodash'),
    getFiles = require('./get-files'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    getHtmlOptions = require('./html-plugin-options');
module.exports = function (webpackConfig) {
    //将ejs渲染为html文件
    var entrys = {},
        dirSrc = path.resolve(__dirname, '../src'),
        dirView = path.resolve(__dirname, '../src/views'),
        dirJs = path.resolve(__dirname, '../src/js'),
        viewFiles = ['/index.ejs'].concat(getFiles(dirView, '/views'));

    console.log(viewFiles);

    viewFiles.forEach((item, index) => {
        var viewFileName = path.join(dirSrc, item),
            distHtmlName = item.startsWith('/') ? item.substr(1) : item,
            jsFileName, jsEntryName;

        console.log(`viewFileName=${viewFileName}`);

        distHtmlName = distHtmlName.substr(0, distHtmlName.lastIndexOf("."));

        item = item.startsWith('/') ? item.substr(1) : item;
        item = item.replace('views/', '');

        //排除shared文件夹下的ejs页面，这个文件夹存放模板
        if (!item.startsWith('shared/')) {
            item = item.substr(0, item.lastIndexOf("."));
            item = item.replace(/\//g, ".");
            jsFileName = path.join(dirJs, '/pages/', item + '.js');
            jsEntryName = 'pages/' + item;
            if (fs.existsSync(jsFileName)) {
                entrys[jsEntryName] = jsFileName;
                webpackConfig.plugins.push(new HtmlWebpackPlugin(getHtmlOptions(distHtmlName, viewFileName, jsEntryName)));
            } else {
                webpackConfig.plugins.push(new HtmlWebpackPlugin(getHtmlOptions(distHtmlName, viewFileName, null)));
            }
        }
    });

    //将入口文件与配置合并
    _.extend(webpackConfig.entry, entrys);
}