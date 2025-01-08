const mongoose=require('mongoose');
const PostTable= mongoose.model('Post',{
    name:{
        type:String,
        unique:true,
    },
    age:{
        type:String,
        required:true,
    },
    gender:String,
    quantity:String,
    img:String,
})

module.exports=PostTable;