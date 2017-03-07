process.env.NODE_ENV = 'production';

var gutil = require('gutil'),
    webpack = require('webpack'),
    webpackConfig = require("./webpack.pro")(),
    compiler = webpack(webpackConfig);

compiler.run(function (err, stats) {
    gutil.log('[webpack:build]', stats.toString({
        colors: true
    }));
});