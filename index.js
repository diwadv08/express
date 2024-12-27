require('dotenv').config();
const port=process.env.PORT;
const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'ejsss','crud'))

app.use('/myImg',express.static('uploads'))

const mongoose=require('mongoose')
const projectRoute=require('./routes/project')
app.use(express.json())
app.use(express.urlencoded({extended:true}));
mongoose.connect(process.env.MONGODB_URL)
app.use('ejsdata',express.static('ejs2'))

app.use(projectRoute);
app.listen(port)