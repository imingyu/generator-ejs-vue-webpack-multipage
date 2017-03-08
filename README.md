# generator-ejs-vue-webpack-multipage
ejs-vue-webpack多页面脚手架

## 简介
vue多页面应用开发脚手架
技术栈：`webpack@1.x` `vue@2.x` `ejs@1.0` `ejs-mate@fork`

## 使用
此脚手架需要使用`vue-cli`进行安装/初始化；
```bash
$ npm install -g vue-cli
$ vue init imingyu/generator-ejs-vue-webpack-multipage my-project
$ cd my-project
$ npm install
$ npm run dev
```

## 命令简介
- `npm run dev`：开启一个以`5112`为端口的开发服务器；
    - 使用`browser-sync`做到代码修改后，自动刷新页面（非热替换）；
    - 使用`webpack`进行模块化打包，vue组件编译；
    - 关于端口：你可以在`my-project/build/dev-server.js#43`行处修改此端口；
    - source map功能；

- `npm run build`：build项目到`my-project/dist`目录
    - 静态资源添加`hash`戳；
    - 压缩js/css，使用`webpack.optimize.UglifyJsPlugin`；

## 脚手架规约
- 所有html页面需要放置在`views`目录下，可按照模块划分子目录；
- 所有html页面均使用`ejs`开发，脚手架内提供了模板（`my-project/src/views/shared`）；
- 默认提供了`index.ejs`页面，可自行修改；
- 【重要】
    - 每个页面可以对应一个js文件，这个js文件做为webpack的入口文件；
    - 放置目录有要求：放置在`my-project/src/js/pages`中；
    - 命名有要求：`页面模块名.页面名.js`，如：`views/user/index.ejs`对应的js文件是：`user.index.js`
- 可将组件放置在`my-project/src/components`中；
- 架手架中的webpack配置会默认提取公用js文件到`common.js`中；
- vue已做全局引入，不需要在每个js文件中import;