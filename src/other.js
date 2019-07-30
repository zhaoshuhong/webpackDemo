// let str = require('./a.js');
require('./index.css');
// require('./index.less');
// console.log(str);
// let fn = ()=>{
//     console.log('es6-es5')
// }
// fn();
// class A{
//     a = 1
// }

// import $ from 'expose-loader?$!jquery';
// import $ from 'jquery';

// expose-loader 暴露全局的loader
console.log(window.$);

//webpacck 打包图片
// 1)在js中 创建图片来引入
// 2)css 中可以直接引入
import logo from './1.png';
console.log(logo);
let image = new Image();
image.src = logo;
document.body.appendChild(image);