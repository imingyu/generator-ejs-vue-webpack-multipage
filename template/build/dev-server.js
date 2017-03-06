process.env.NODE_ENV = 'development';

var path=require('path'),
    gutil = require("gutil"),
    colors = require("colors"),
    webpack = require('webpack'),
    webpackConfig = require("./webpack.dev"),
    compiler = webpack(webpackConfig),
    moment = require("moment"),
    watch = require("watch");

//开启browser-sync 监听
var bs = require("browser-sync").create();
bs.init({
    server: path.resolve(__dirname,'../dist'),
    port: "5112"
}, function () {
    var time = moment().format("YYYY-MM-DD HH:mm:SS");
    gutil.log(`\r\n[browser-sync:start]\r\n${time}\r\n`.green);
});

//开启webpack监听
compiler.watch({
    aggregateTimeout: 200,
    poll: true
}, function (err, stats) {
    var time = moment().format("YYYY-MM-DD HH:mm:SS"),
        title = '\r\n\r\n[webpack:build]\r\n',
        str = err ? (title + time).red : (title + time).green;
    gutil.log(str, stats.toString({
        timings: true,
        colors: true,
        chunks: false,
        modules: false,
        assets: false,
        children: false,
        errorDetails: true
    }) + '\r\n' + (err ? err.message.red + '\r\n' : '') + '\r\n-------------------------'.yellow);

    bs.reload();//刷新browser-sync
});

//监听某些ejs（vies/shared,components目录下的）文件变化，这些文件变化不会被webpack监听到，需要重启webpack编译
watch.watchTree(path.resolve(__dirname,'../src'), function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
    } else {
        if (f.substr(-4).toLowerCase() === ".ejs") {
            if (f.indexOf("components") != -1 || (f.indexOf("views") != -1 && f.indexOf("shared") != -1)) {
                gutil.log(`\r\n[webpack:run]\r\n${moment().format("YYYY-MM-DD HH:mm:SS")}\r\n`.yellow);
                compiler.run(function (err, stats) {
                    var time = moment().format("YYYY-MM-DD HH:mm:SS"),
                        title = '\r\n\r\n[webpack:build]\r\n',
                        str = err ? (title + time).red : (title + time).green;
                    gutil.log(str, stats.toString({
                        timings: true,
                        colors: true,
                        chunks: false,
                        modules: false,
                        assets: false,
                        children: false,
                        errorDetails: true
                    }) + '\r\n' + (err ? err.message.red + '\r\n' : '') + '\r\n-------------------------'.yellow);

                    bs.reload();//刷新browser-sync
                });
            }
        }
    }
})
