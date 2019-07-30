//experss
let experss = require('express');
let app = experss();


//启用服务的端口
let webpack = require('webpack');
let middle = require('webpack-dev-middleware');
let config = require('./webpack.config');
let compiler = webpack(compiler);
app.use(middle(compiler));

//-----



app.get('/api/user',(req,res)=>{
    res.json({name:'ceshi'})
})
console.log('kaiqi')
app.listen(3000);

