require('dotenv').config();
const port=process.env.PORT;
const express=require('express');
const app=express();
const ejs=require('ejs');
app.set('view engine','ejs')
const mongoose=require('mongoose')
const projectRoute=require('./routes/project')
app.use(express.json())
app.use(express.urlencoded({extended:true}));
mongoose.connect(process.env.MONGODB_URL)
app.use('ejsdata',express.static('ejs2'))

app.use(projectRoute);
app.listen(port)