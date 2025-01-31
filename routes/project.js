const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');
const upload_img=require('../multer/multer');
const PostTable=require('../models/FormData');
let errMg=0;
let viewData=0;
router.get('/',(req,res)=>{
    res.send('Bye');
})
router.get('/data',async(req,res)=>{
    viewData=0;
    let db_data=await PostTable.find({});
    res.render('data',{db_data,errMg,viewData})
})
router.post('/data',upload_img.single('img'),(req,res)=>{
    const newDbData=new PostTable({
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        quantity:req.body.quantity
    })
    if(req.file){
        newDbData.img=req.file.filename;
    }
    newDbData.save()
    .then(()=>{
        errMg=0;
        res.redirect('data');
    })
    .catch((err)=>{
        if(err.code===11000){
            errMg='Duplicate Name Not Allowed'
            res.redirect('/data');
        }
        else{
            errMg="Invalid Details";
            res.redirect('/data');
        }
    })
})

router.get('/view/:id',async(req,res)=>{
    let {id}=req.params;
    const viewData=await PostTable.findById({_id:id});
    res.json(viewData)
})


router.get('/edit/:id',async(req,res)=>{
    let {id}=req.params;
    const editData=await PostTable.findById({_id:id});
    res.json(editData)
})
router.post('/edit_data',upload_img.single('img'),async(req,res)=>{
    let {id,name,age,gender,quantity}=req.body;
    if(req.file){
        let img=req.file.filename;
        let findImg=await PostTable.findById(id);
        if(fs.existsSync('uploads/'+findImg.img)){
            fs.unlinkSync('uploads/'+findImg.img)
        }
        const myData=await PostTable.findByIdAndUpdate({_id:id},{name:name,age:age,gender:gender,img:img,quantity:quantity})
    }
    else{
        const myData=await PostTable.findByIdAndUpdate({_id:id},{name:name,age:age,gender:gender,quantity:quantity})
    }
    
    res.redirect('/data')
  
})




router.get('/delete/:id',async(req,res)=>{
    let {id}=req.params;
    let findImg=await PostTable.findById(id);
    if(fs.existsSync('uploads/'+findImg.img)){
        fs.unlinkSync('uploads/'+findImg.img)
    }

    const deleteData=await PostTable.findByIdAndDelete({_id:id});
    
    if(deleteData){
        res.redirect('/data')
    }
})



module.exports=router;