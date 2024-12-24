const express=require('express');
const router=express.Router();
const path=require('path');
const PostTable=require('../models/FormData');
let errMg=0;
let myUrlArray=__dirname.split('\\');

    myUrlArray.pop()
    myUrlArray.push("ejs2")
    myUrlArray.push("data")
    myUrlArray=myUrlArray.join('\\');
router.get('/',(req,res)=>{
    res.send('Bye');
})
router.get('/data',async(req,res)=>{
    let db_data=await PostTable.find({});
    res.render(myUrlArray,{db_data,errMg})
})
router.post('/data',(req,res)=>{
    const newDbData=new PostTable({
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
    })
    newDbData.save()
    .then((data)=>{
        errMg=0;
        res.redirect('/data');
    })
    .catch((err)=>{
        errMg=err.message;
        res.redirect('/data');
    })
})

router.get('/delete/:id',async(req,res)=>{
    let {id}=req.params;
    const viewData=await PostTable.findByIdAndDelete({_id:id});
    if(viewData){
        res.redirect('/data')
    }
})

module.exports=router;