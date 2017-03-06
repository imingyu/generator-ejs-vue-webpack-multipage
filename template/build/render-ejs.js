var path = require("path"),
    ejsMate = require('ejs-mate'),
    beautify = require('js-beautify').html,
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
            var formatterHtml = beautify(html, {
                indent_size: 4
            });
            callback(null, formatterHtml);
        }
    });
}