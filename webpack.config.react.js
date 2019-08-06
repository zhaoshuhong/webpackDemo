/**
 * Created by 24596 on 2019/8/6.    第三方包,  不需要打包的
 */
let path = require('path');
let webpack = require('webpack');
module.exports={
    mode:'development',
    entry:{
        react:['react','react-dom'],
    },
    output: {
        filename: "_dll_[name].js",
        path: path.resolve(__dirname,'build'),
        library:'_dll_[name]',
        //libraryTarget:'var'
    },
    plugins: [
        new webpack.DllPlugin({
            name:'_dll_[name]',
            path:path.resolve(__dirname,'build','manifest.json')
        })
    ]


}