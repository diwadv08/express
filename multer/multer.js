const multer=require('multer');
const path=require('path');
let storage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,cb)=>{
        cb(null,"Img_"+Date.now()+path.extname(file.originalname))
    }
})
const uploads=multer({storage:storage})
module.exports=uploads;