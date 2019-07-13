let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');  //html模板插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin'); //css 压缩简化插件
let OptimizeCss = require('optimize-css-assets-webpack-plugin');   //css 分离插件
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');    //分离后js 压缩插件
let webpack = require('webpack');
module.exports = {
    devServer: {   // 开发服务器配置
        port: 3000,   //端口号
        progress: true,  //进度条
        contentBase: './build',   //静态服务的基础目录
        compress: true      //zip压缩
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
    mode: 'development',  //默认  development   production
    entry: './src/index.js',  //入口
    output: {
        filename: 'bundle.[hash:8].js', //打包后的文件名
        path: path.resolve(__dirname, 'build'), // 路径必须是绝对路径
    },
    plugins: [  //数组  放所有插件 没有先后顺序
        new HtmlWebpackPlugin({
            template: './src/index.html',    //要打包的模板
            filename: 'index.html',   //打包后名字
            hash: true,    //html 引用的文件后添加hash戳 防止缓存
            minify: {
                removeAttributeQuotes: true,  //去除双引号
                collapseWhitespace: true   //压缩成一行
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        // new webpack.ProvidePlugin({  //在每个模块内注入jquery
        //     $:'jquery'
        // })      
    ],

    externals: {
        jquery: '$'    //外部引入 不打包  cdn
    },
    module: {  //模块
        rules: [
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