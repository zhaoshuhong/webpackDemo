let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');  //html模板插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css 压缩简化插件
let OptimizeCss = require('optimize-css-assets-webpack-plugin');   //css 分离插件
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');    //分离后js 压缩插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');   //清除build的文件重新build 
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');
module.exports = {
    devServer: {   // 开发服务器配置
        port: 3000,   //端口号
        progress: true,  //进度条
        contentBase: './build',   //静态服务的基础目录
        compress: true,      //zip压缩
        proxy:{ //请求代理
            'api':{
                target:'http://localhost:3000',
                pathRewrite:{'/api':''}
            }
        },
        before(app){
            app.get('/api/user',(req,res)=>{
                res.json({name:'ceshi'})
            })
        }

    },
    optimization: {    //优化项
        minimizer: [
            new OptimizeCss(),
            new UglifyJsPlugin({
                cache: true,   //缓存
                parallel: true,   //并发打包
                sourceMap: true
            })
        ]
    },
    devtool: 'source-map',
    // watch:true,
    // watchOptions:{
    //     poll:1000,   //每秒监控次数
    //     aggregateTimeout:500,     //防抖
    //     ignored:/node_modules/       //不需要监控的文件
    // },
    mode: 'development',  //默认  development   production
    // entry: './src/index.js',  //入口
    entry: {
        home: './src/index.js', //入口1
        //    other:'./src/other.js'  //入口2
    },

    output: {
        filename: '[name].[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'build'), // 路径必须是绝对路径
        // publicPath:'localhost:3000'
    },
    plugins: [  //数组  放所有插件 没有先后顺序
        new HtmlWebpackPlugin({
            template: './src/index.html',    //要打包的模板
            filename: 'index.html',   //打包后名字
            hash: true,    //html 引用的文件后添加hash戳 防止缓存
            minify: {
                removeAttributeQuotes: true,  //去除双引号
                collapseWhitespace: true   //压缩成一行
            },
            chunks: ['home']
        }),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html',    //要打包的模板
        //     filename: 'other.html',   //打包后名字
        //     hash: true,    //html 引用的文件后添加hash戳 防止缓存
        //     minify: {
        //         removeAttributeQuotes: true,  //去除双引号
        //         collapseWhitespace: true   //压缩成一行
        //     },
        //     chunks:['other']
        // }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin('make 2019/7/28 by zsh'),   //版权声明插件
        new CopyWebpackPlugin(
            [{ from: 'static', to: './' }]  //拷贝插件
        ),
    new webpack.DefinePlugin({   //定义环境变量
        DEV:"'dev'",
        ST:JSON.stringify('production'),
        FLAG:'true',
        EXPORESSION:'1+1'
    }),
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),    //忽略 插件
        // new webpack.ProvidePlugin({  //在每个模块内注入jquery
        //     $:'jquery'
        // })      
    ],

    externals: {
        jquery: '$'    //外部引入 不打包  cdn
    },
    resolve:{   //解析第三方包
        modules:[path.resolve('node_modules')],
        // alias:{
        //     bootstrapcss:'bootstrap/dist/css/bootstrap.css'
        // },
        // mainFields:['style','main'],
        // mainFiles:[],  //入口文件的名字  默认index.js
        extensions:['.js','.css','.json','.vue']


    },
    module: {  //模块
        noParse:'/jquery/',   //不去解析jq中的依赖
        rules: [

            {
                test: /\.(png|jpg|gif)$/,
                // use: 'file-loader'  //默认会在内部生成一张图片 到build目录中
                //会把成成的图片的名字返回回来  
                //小于多少k时候 用base64 来转化   否则用file-loader产生真是的图片
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: '/img/',
                        publicPath: 'localhost:3000'
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },       //暴露到window上

            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options:{
            //             enforce:'pre'   //之前执行  post 之后
            //         }
            //     },

            // },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {       //用babel-loader  需要把es6-es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                            ['@babel/plugin-proposal-class-properties', { 'loose': true }],
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            // 规则css-loader   @import
            //style-loder   把css 插入到head标签中
            // 从右到左
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',

                ]
            }
        ]
    }
}