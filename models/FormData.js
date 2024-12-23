const mongoose=require('mongoose');
const PostTable= mongoose.model('Post',{
    name:{
        type:String,
        unique:true,
    },
    age:String,
    gender:String,
})

module.exports=PostTable;