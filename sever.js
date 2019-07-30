//experss
let experss = require('express');

let app = experss();

app.get('/api/user',(req,res)=>{
    res.json({name:'ceshi'})
})
console.log('kaiqi')
app.listen(3000)