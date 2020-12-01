const path = require('path')
const webpack = require('webpack')
// 在内存生生成html的插件（即打包html需要的插件）
// 只要是插件，都要放在plugin节点中
const htmlWebapckPlugin = require('html-webpack-plugin')
// Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 这个配置文件通过node中的模块操作向外报录一个配置对象
module.exports = {
    mode: 'development',   // development为开发者环境，production为生产环境变量 ，还有一个为none
    // 入口出口配置
    entry: path.join(__dirname, './src/main.js'),
    output: {
        // 指定打包好文件的输出目录
        path: path.join(__dirname, './dist'),
        // 指定输出文件的名称
        filename: 'bundle.js'

    },

    // devServer: {
    //     // 这是配置dev-server明林参数的第二种形式，相对繁琐
    //     open: true,// 自动打开浏览器
    //     port: 3000,// 设置启动时的运行端口
    //     contentBase: 'src',// 指定托管的根目录
    //     hot: true // webpack3启用热更新 的 第一步,webpack4已经可以了
    // },
    plugins: [
        // 配置插件的节点
        // new webpack.HotModuleReplacementPlugin()  //webpack3启用热更新需要使用的配置
        // 创建一个在内存中生成html页面的插件
        // 1，自动在内存中根据指定页面生成一个内存中的页面
        // 2.自动把打包好的bundle.js在html中引用
        new htmlWebapckPlugin({
            // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html' // 指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    // 配置所有第三方模块加载器
    module: {
        rules: [
            // 所有匹配规则
            {
                // 配置处理.css文件的第三方loader
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 图片打包插件
                test: /\.jpg|png|gif|bmp|jpeg$/,
                // limit值小于图片byte大小值时候，不再使用base64格式地址，反之转化为base64格式
                // name=[name].[ext] 即不适用hash值显示图片名，使用原来的图片名和后缀
                // 从32位hash中截取8位作为随机数命名前缀
                use: 'url-loader?limit=38602&name=[hash:8]-[name].[ext]'
            },
            {
                // 处理字体文件
                test: /\.ttf|eot|svg|wpff|woff2$/,
                use: 'url-loader'
            },
            // webpack 默认只能处理一小部分es6语法，更高级的es7无法处理，需要借用第三方的loader来帮助处理成低级语法交给webpack打包
            // 通过babel可将高级语法处理为低级语法
            // 安装babel的两套包
            // 1：npm i babel-core babel-loader babel-plugin-transform-runtime -D
            // 2: npm i babel-preset-env babel-preset-stage-0 -D
            // 新建rule规则
            // {test:'/\.js$/',use:'babel-loader',exclude:/node-modules/}
            // exclude nodemodules原因是因为babel会默认吧nodle-module中的第三方js都打包编译，这样会非常消耗cpu,打包速度也会非常慢
            // 而且即便打包了所有文件，也会导致项目无法运行
            // 在项目根目录创建.babelrc的json配置文件,内容如下
            // {
            //     "presets": ["env","stage-0"],
            //     "plugins": ["transform-runtime"]
            // }
            //npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties
            {
                test: /\.js$/, use: "babel-loader", exclude: /node_modules/
            },
            {
                // 处理vue文件的loader
                test: /\.vue$/, use: 'vue-loader'
            }
        ]
    }
    ,
    resolve: {
        alias: {
            // 修改vue被导入时包的路径
            "vue$": 'vue/dist/vue.js',
            'scss-loader': 'sass-loader'
        }
    }
}
// 执行webpack指令时，执行了以下操作
// 1.webpack指令发现后面没有入口出口
// 2.去项目根目录寻找配置文件webpack.config.js文件
// 3.解析该文件获取到了文件中配置的对象
// 4.根据对象获取到了入口和出口配置路径进行打包

// 使用webpack-dev-server这个工具来实现自动打包翻译的功能
// 1.运行 npm i webpack-dev-server -D把这个工具安装到项目的本地开发依赖
// 2.安装完毕后，这个工具用法和webpack一样
// 3.由于我们是在项目本地安装的webpack-dev-server，所以不能作为脚本命令直接使用
// 4.注意:webpack-dev-server这个工具如果要正常运行，要求在本地项目安装webpack
// 5.安装npm install webpack-cli
// 6.package.json配置dev指令
// 7.运行npm run dev
// 8.webpak-dev-server帮我们打包生成的bundle.js文件并没有存放到实际的物理磁盘，
// 而是直接托管到了电脑的内存中，所以在项目根目录中找不到这个自动打包好的bundle.js
// 9.webpack-dev-server把打包好的文件以一种虚拟的形式，托管到了咱们项目的根目录中，
// 虽然看不到,但是实际上和dist src node-moudle平级，一个看不见的bundle.js文件

// package.json配置解析
// "dev": "webpack-dev-server --open"
// --open自动打开浏览器
// --port 3000 默认端口是从8080变为3000
// --contentBase src默认打开文件路径 设置项目打包后的托管目录从根目录变为src目录
// --hot 只更新修改过的部分，类似补丁效果，实现网页不刷新更新项目