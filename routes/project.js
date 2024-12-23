const express=require('express');
const router=express.Router();
const PostTable=require('../models/FormData');
router.get('/',(req,res)=>{
    res.send('Bye');
})
router.get('/data',async(req,res)=>{
    console.log(await PostTable.find({}));
    res.send('Ok')
})
router.post('/data',(req,res)=>{
    const newDbData=new PostTable({
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
    })
    newDbData.save()
    .then((data)=>{
        res.send('Success');
    })
    .catch((err)=>{
        res.send(err);
    })
})
module.exports=router;