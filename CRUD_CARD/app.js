const port = 8080;
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage : storage});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://diwa:dv813@cluster0.ej81v.mongodb.net/card');


const schema = mongoose.Schema({
    Image : String,
    Name : String, 
    Work : String,
    Description : String,
    id:Number,
})

const table = mongoose.model('records',schema);

app.get('/',async(req,res)=>{
    const list = await table.find().lean();
    const rev_list = list.reverse();
    if(rev_list.length>0){
        res.render(path.join(__dirname, 'ejs', 'list'),{rev_list})
    }
    else{
        res.sendFile(path.join(__dirname, '/no_card.html'));
    }
})

app.get('/form',(req,res)=>{
    res.sendFile(__dirname + '/form.html');
})

app.get('/view/:id',async(req,res)=>{
    const id = req.params.id;
    const view = await table.findById(id).lean();
    res.json(view);
})

app.get('/edit/:id', async(req,res)=>{
    const id = req.params.id;
    const edit = await table.findById(id);
    res.json(edit);
})

app.post('/edit/:id', upload.single('Image'), async(req,res)=>{
    const id = req.params.id;
    
    const data =({
        Name : req.body.Name,
        Work : req.body.Work,
        Description : req.body.Description,
    })

    if(req.file){
        const img_obj = await table.findById(id);
        const img_name = img_obj.Image;
        const img_path = __dirname + '/uploads/' + img_name;
        if(fs.existsSync(img_path))
        {
            fs.unlinkSync(img_path);
        }
        data.Image=req.file.filename;
    }
    const update = await table.findByIdAndUpdate(id, data);
    if(update){
        res.redirect('/');
    }
})

app.get('/delete/:id', async(req,res)=>{
    const id = req.params.id;
    const img_obj = await table.findById(id);
    const img_name = img_obj.Image;
    const img_path = __dirname + '/uploads/' + img_name;

    if(fs.existsSync(img_path))
    {
        fs.unlinkSync(img_path);
    }

    const del = await table.findByIdAndDelete(id);
    if(del)
    {
        res.redirect('/');
    }
})

app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


app.post('/submit', upload.single('Image'), async(req,res)=>{
    const table_length=await table.countDocuments();
    const data = new table({
        id:table_length+1,
        Name : req.body.Name,
        Work : req.body.Work,
        Description : req.body.Description,
    })
    if(req.file){
        data.Image=req.file.filename;
    }
    await data.save();
    res.redirect('/');
})

app.listen(port,()=>{
    console.log('Running Successfully');
})