var renderEjs = require('./render-ejs');
//定义一个html-plugin，获取HtmlWebpackPlugin中配置项templateFile，进行ejs编译
function HtmlPluginForRenderEjs(options) { }
HtmlPluginForRenderEjs.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            if (htmlPluginData.plugin.options.templateFile) {
                renderEjs(htmlPluginData.plugin.options.templateFile, function (err, html) {
                    if (err) {
                        callback(err, htmlPluginData);
                    } else {
                        htmlPluginData.html = html;
                        callback(null, htmlPluginData);
                    }
                });
            } else {
                callback(null, htmlPluginData);
            }
        });
    });
};

module.exports = HtmlPluginForRenderEjs;