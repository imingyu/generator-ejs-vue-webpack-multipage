var path = require("path"),
    ejsMate = require('./fork-ejs-mate.js'),
    rehype = require('rehype'),
    rehypeFormat = require('rehype-format'),
    rehypeRender = rehype().use(rehypeFormat);

module.exports = function (ejsContent, callback) {
    var ejsConfig = {
        _layoutFile: null,
        root: path.resolve(__dirname, '../src'),
        cache: false,
        settings: {
            'view engine': "ejs",
            "views": path.resolve(__dirname, '../src')
        },
        locals:{
            _:require('lodash')
        }
    };
    ejsMate(ejsContent, ejsConfig, function (err, html) {
        if (err) {
            callback(err);
        } else {
            rehypeRender.process(html, function (err2, content) {
                if (err2) {
                    callback(err2);
                } else {
                    callback(null, content.contents);
                }
            });
        }
    });
};