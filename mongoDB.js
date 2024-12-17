const mongoose=require('mongoose');
const db_url="mongodb://127.0.0.1:27017/students";
mongoose.connect(db_url);


//Table Structure
const myvalues=new mongoose.Schema({
    name:String,
    age:Number,
    mobile:String,
    createdAt:Date
});

//Table name
const details=mongoose.model('detail',myvalues);


const express=require('express');
const app=express();
app.get('/',async(req,res)=>{
    let myValues=await details.find();
    console.log(myValues);
    res.send(myValues);
})
console.log('http://localhost:8080/');
app.listen(8080)
    