const express=require('express')
const path=require('path')
const ejs=require('ejs')
const hbs=require('hbs');
const app=express();
hbs.registerPartials(path.join(__dirname,'hbs','common'))
// app.set('view engine','ejs')
app.set('view engine','hbs')

app.get(['/','/home'],(req,res)=>{
    let a=[
        {
            name:'Hari',age:22,mark:90
        },
        {
            name:'Vijay',age:32,mark:70
        },
    ];
    res.render(__dirname+'/hbs/home',{a})
})
app.get('/about',(req,res)=>{
    res.render(__dirname+'/hbs/about')
})
app.get('/contact',(req,res)=>{
    res.render(__dirname+'/hbs/contact')
})
app.listen(8080)