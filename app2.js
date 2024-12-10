const express=require('express');
const path=require('path');
const multer=require('multer');
const fs=require('fs')
const app=express();
app.set('view engine','ejs');

app.use('/jj',express.static('uploads'))
const MyMulter=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        cb('',`Img-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const file_upload=multer({storage:MyMulter});

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})
app.post('/submit',file_upload.single('img'),(req,res)=>{
    const {Name,Age,Mobile}=req.body;
    const {filename}=req.file;
    if(fs.existsSync(path.join(__dirname,'uploads','Img-1733836980690.jpg'))){
        fs.unlinkSync(path.join(__dirname,'uploads','Img-1733836980690.jpg'));
        console.log('Deleted');
    }
    else{
        console.log('File not Found');
    }
    res.redirect('/')
})


app.listen(8080)


