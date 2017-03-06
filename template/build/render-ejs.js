var path = require("path"),
    ejsMate = require('ejs-mate'),
    rehype = require('rehype'),
    rehypeFormat = require('rehype-format'),
    rehypeRender = rehype().use(rehypeFormat),
    locals = require("./ejs-locals"),
    ejsConfig = {
        _layoutFile: null,
        root: path.resolve(__dirname, '../'),
        cache: false,
        settings: {
            'view engine': "ejs",
            "views": path.resolve(__dirname, '../src')
        },
        locals: locals
    };

module.exports = function (fileName, callback) {
    ejsMate(fileName, ejsConfig, function (err, html) {
        if (err) {
            callback(err);
        } else {
            rehypeRender.process(html, function(err2, content) {
                if(err2){
                    callback(err2);
                }else{
                    callback(null, content.contents);
                }
            });
        }
    });
}