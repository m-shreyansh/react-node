const mongoose=require("mongoose")
const Schema=require("mongoose").Schema

const blogsSchema=new Schema({
    author:{required:true,type:String},
    title:{required:true,type:String},
    content:{required:true,type:String},
    date:{required:true,type:String},
    views:0,
    likes:0

    

})

const Blogs=mongoose.model('blogs',blogsSchema);
module.exports =Blogs;