let str = require('./a.js');
require('./index.css');
require('./index.less');
console.log(str);
let fn = ()=>{
    console.log('es6-es5')
}
fn();
class A{
    a = 1
}

import $ from 'jquery';